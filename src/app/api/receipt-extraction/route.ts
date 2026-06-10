import { getReceiptFileValidationMessage } from "@/services/receipt-upload";

interface OcrExtraction {
  establishment?: string | null;
  amount?: number | null;
  date?: string | null;
  category?: string | null;
}

interface OpenAiResponse {
  choices: Array<{ message: { content: string } }>;
}

export async function POST(request: Request) {
  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return Response.json(
      { error: "Envie um arquivo no campo `receipt` para iniciar a extração." },
      { status: 400 },
    );
  }

  const receipt = formData.get("receipt");

  if (!(receipt instanceof File)) {
    return Response.json(
      { error: "Envie um arquivo no campo `receipt` para iniciar a extração." },
      { status: 400 },
    );
  }

  const validationMessage = getReceiptFileValidationMessage(receipt);
  if (validationMessage) {
    return Response.json({ error: validationMessage }, { status: 415 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return Response.json(
      {
        error:
          "Provedor de OCR não configurado. Defina OPENAI_API_KEY nas variáveis de ambiente do servidor.",
      },
      { status: 503 },
    );
  }

  const bytes = await receipt.arrayBuffer();
  const base64 = Buffer.from(bytes).toString("base64");
  const mediaType = receipt.type;

  let openaiResponse: Response;
  try {
    openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o",
        max_tokens: 256,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "image_url",
                image_url: { url: `data:${mediaType};base64,${base64}` },
              },
              {
                type: "text",
                text:
                  "Analise esta nota fiscal e responda SOMENTE com JSON válido, sem markdown ou texto extra: " +
                  '{"establishment":"nome do local ou null","amount":0.00,"date":"YYYY-MM-DD ou null","category":"categoria"}. ' +
                  "Para category use apenas: Alimentacao, Transporte, Moradia, Saude, Educacao ou Outros.",
              },
            ],
          },
        ],
      }),
    });
  } catch {
    return Response.json(
      { error: "Falha ao contatar a API de OCR. Verifique a conexão." },
      { status: 502 },
    );
  }

  if (!openaiResponse.ok) {
    const errorBody = (await openaiResponse
      .json()
      .catch(() => ({}))) as { error?: { message?: string } };

    return Response.json(
      {
        error: `API de OCR retornou erro: ${errorBody.error?.message ?? openaiResponse.statusText}`,
      },
      { status: 502 },
    );
  }

  const openaiData = (await openaiResponse.json()) as OpenAiResponse;
  const rawText = openaiData.choices[0]?.message?.content ?? "{}";
  const cleanText = rawText.replace(/^```json?\s*|\s*```$/g, "").trim();

  let extracted: OcrExtraction;
  try {
    extracted = JSON.parse(cleanText) as OcrExtraction;
  } catch {
    return Response.json(
      { error: "A API de OCR retornou um formato inesperado." },
      { status: 502 },
    );
  }

  return Response.json({
    establishment: extracted.establishment ?? null,
    amount: typeof extracted.amount === "number" ? extracted.amount : null,
    date: extracted.date ?? null,
    category: extracted.category ?? null,
  });
}
