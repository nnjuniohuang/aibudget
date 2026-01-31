import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";

const RequestSchema = z.object({
  imageBase64: z.string().min(1),
  mediaType: z
    .enum(["image/jpeg", "image/png", "image/gif", "image/webp"])
    .default("image/jpeg"),
});

const CategorySchema = z.enum([
  "飲食",
  "交通",
  "娛樂",
  "購物",
  "日用品",
  "醫療",
  "其他",
]);

const ResponseSchema = z.object({
  store: z.string().min(1),
  amount: z.coerce.number().nonnegative(),
  date: z.string().min(1),
  category: CategorySchema,
});

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing ANTHROPIC_API_KEY" },
      { status: 500 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = RequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", detail: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { imageBase64, mediaType } = parsed.data;

  // 關鍵邏輯：用 Claude Vision 將發票/收據圖片轉成結構化 JSON
  const client = new Anthropic({ apiKey });

  const prompt =
    "你是一個發票/收據辨識助手。請根據圖片內容輸出【只包含 JSON】且不得加入任何額外文字，不要用 markdown 包裹，直接輸出 raw JSON。\n" +
    "JSON 格式：{\"store\": string, \"amount\": number, \"date\": \"YYYY-MM-DD\", \"category\": \"飲食|交通|娛樂|購物|日用品|醫療|其他\"}\n" +
    "規則：\n" +
    "1) amount 只能是數字（不要加幣別符號）。\n" +
    "2) 若日期不清楚，請用今天日期（YYYY-MM-DD）。\n" +
    "3) category 請從指定集合選一個最接近的。\n" +
    "4) store 若看不清，請用 \"未知商店\" 代替。\n" +
    "【重要】輸出必須是有效的 JSON，不允許 markdown 代碼塊或任何其他文字。\n";

  try {
    const message = await client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 512,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            {
              type: "image",
              source: {
                type: "base64",
                media_type: mediaType,
                data: imageBase64,
              },
            },
          ],
        },
      ],
    });

    const text = message.content
      .filter((c) => c.type === "text")
      .map((c) => c.text)
      .join("\n")
      .trim();

    // 關鍵邏輯：只接受 JSON，避免模型輸出夾雜說明文字
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");
    if (jsonStart === -1 || jsonEnd === -1 || jsonEnd <= jsonStart) {
      return NextResponse.json(
        { error: "Model response is not JSON", raw: text },
        { status: 502 },
      );
    }

    const jsonText = text.slice(jsonStart, jsonEnd + 1);
    const parsedJson = JSON.parse(jsonText);

    const validated = ResponseSchema.safeParse(parsedJson);
    if (!validated.success) {
      return NextResponse.json(
        {
          error: "Invalid model JSON",
          detail: validated.error.flatten(),
          raw: parsedJson,
        },
        { status: 502 },
      );
    }

    return NextResponse.json(validated.data);
  } catch (err) {
    return NextResponse.json(
      { error: "Vision API failed" },
      { status: 502 },
    );
  }
}
