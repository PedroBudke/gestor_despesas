import { expect } from "@playwright/test";
import { When, Then } from "../support/fixtures";

When(
  "seleciono um arquivo do tipo {string} com nome {string}",
  async ({ page }, mimeType: string, fileName: string) => {
    await page.locator('input[type="file"]').setInputFiles({
      name: fileName,
      mimeType,
      buffer: Buffer.from("dummy file content"),
    });
  },
);

When("clico no botão {string}", async ({ page }, buttonText: string) => {
  await page.getByRole("button", { name: buttonText }).click();
});

When(
  "envio um POST para {string} com um PDF válido",
  async ({ apiState }, path: string) => {
    const baseUrl = process.env.BASE_URL ?? "http://localhost:3000";
    const formData = new FormData();
    formData.append(
      "receipt",
      new Blob([Buffer.from("%PDF-1.4 dummy")], { type: "application/pdf" }),
      "nota.pdf",
    );
    const response = await fetch(`${baseUrl}${path}`, {
      method: "POST",
      body: formData,
    });
    apiState.response = {
      status: response.status,
      body: (await response.json()) as Record<string, unknown>,
    };
  },
);

Then("a resposta tem status {int}", ({ apiState }, expectedStatus: number) => {
  expect(apiState.response?.status).toBe(expectedStatus);
});

Then("a resposta contém o campo {string}", ({ apiState }, field: string) => {
  expect(apiState.response?.body).toHaveProperty(field);
});
