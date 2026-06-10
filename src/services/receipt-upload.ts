import {
  expenseCategories,
  getTodayDateString,
  type ExpenseInput,
} from "@/services/expense-types";

export interface ReceiptExtractionApiResult {
  establishment: string | null;
  amount: number | null;
  date?: string | null;
  category?: string | null;
  rawText?: string;
}

export const supportedReceiptMimeTypes = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export function getSupportedReceiptTypesLabel() {
  return "PDF, JPG, PNG ou WEBP";
}

export function isSupportedReceiptFile(file: Pick<File, "type">) {
  return supportedReceiptMimeTypes.includes(
    file.type as (typeof supportedReceiptMimeTypes)[number],
  );
}

export function getReceiptFileValidationMessage(
  file: Pick<File, "type"> | null,
) {
  if (!file) {
    return "Selecione uma nota fiscal em PDF ou imagem para continuar.";
  }

  if (!isSupportedReceiptFile(file)) {
    return `Envie um arquivo em ${getSupportedReceiptTypesLabel()}.`;
  }

  return null;
}

export function mapReceiptExtractionToExpense(
  extraction: ReceiptExtractionApiResult,
): ExpenseInput {
  const validCategory =
    extraction.category && expenseCategories.includes(extraction.category)
      ? extraction.category
      : "Outros";

  return {
    amount: Number(extraction.amount ?? 0),
    category: validCategory,
    date: extraction.date ?? getTodayDateString(),
    title: extraction.establishment?.trim() || "Despesa importada",
  };
}

export async function extractExpenseFromReceipt(
  file: File,
): Promise<ExpenseInput> {
  const validationMessage = getReceiptFileValidationMessage(file);

  if (validationMessage) {
    throw new Error(validationMessage);
  }

  const formData = new FormData();
  formData.set("receipt", file);

  const response = await fetch("/api/receipt-extraction", {
    body: formData,
    method: "POST",
  });

  const payload = (await response.json()) as Partial<ReceiptExtractionApiResult> & {
    error?: string;
  };

  if (!response.ok) {
    throw new Error(
      payload.error ?? "Não foi possível processar a nota fiscal enviada.",
    );
  }

  return mapReceiptExtractionToExpense(payload as ReceiptExtractionApiResult);
}
