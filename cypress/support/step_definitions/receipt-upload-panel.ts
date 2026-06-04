import { When } from "@badeball/cypress-cucumber-preprocessor";

When("clico na aba de nota fiscal", () => {
  cy.get('[data-testid="tab-receipt"]').click();
  cy.get('input[type="file"]').should("exist");
});

When(
  "seleciono o arquivo {string} do tipo {string}",
  (filename: string, mimeType: string) => {
    cy.get('input[type="file"]').selectFile(
      {
        contents: Cypress.Buffer.from("dummy content"),
        fileName: filename,
        mimeType: mimeType,
      },
      { force: true },
    );
  },
);
