import { expect } from "@playwright/test";
import { Given, Then } from "../support/fixtures";

Given("que acesso a aplicação", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("tab-income").waitFor({ state: "visible" });
});

Given("estou na aba de nota fiscal", async ({ page }) => {
  await page.getByTestId("tab-receipt").click();
  await expect(page.locator('input[type="file"]')).toBeVisible();
});

Then("vejo o título {string}", async ({ page }, text: string) => {
  await expect(page.locator("h2").filter({ hasText: text })).toBeVisible();
});

Then("vejo o texto {string}", async ({ page }, text: string) => {
  await expect(
    page.getByText(text, { exact: false }).first(),
  ).toBeVisible();
});

Then("vejo o botão {string}", async ({ page }, text: string) => {
  await expect(page.getByRole("button", { name: text })).toBeVisible();
});

Then("vejo o alerta {string}", async ({ page }, text: string) => {
  await expect(
    page.locator('[role="alert"]').filter({ hasText: text }),
  ).toBeVisible();
});
