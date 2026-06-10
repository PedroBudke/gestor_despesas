import { Then, When } from "@badeball/cypress-cucumber-preprocessor";

// ── Expense form ──────────────────────────────────────────────────────────────

When("seleciono a categoria {string}", (category: string) => {
  cy.get("#category").select(category);
});

Then("a despesa {string} aparece na lista de ultimas despesas", (title: string) => {
  cy.contains("h3", title, { timeout: 10000 }).should("be.visible");
});

Then("o campo titulo da despesa esta vazio", () => {
  cy.get("#title").should("have.value", "");
});

Then("o campo valor da despesa esta vazio", () => {
  cy.get("#amount").should("have.value", "");
});

When("excluo a despesa {string}", (title: string) => {
  cy.get(`[aria-label="Excluir ${title}"]`).click();
});

Then("a despesa {string} nao aparece na lista de ultimas despesas", (title: string) => {
  cy.contains("h3", title).should("not.exist");
});

// ── Income entry form ─────────────────────────────────────────────────────────

When("seleciono a origem {string}", (source: string) => {
  cy.get("#income-source").select(source);
});

Then("o campo descricao da entrada esta vazio", () => {
  cy.get("#income-title").should("have.value", "");
});

Then("o campo valor da entrada esta vazio", () => {
  cy.get("#income-amount").should("have.value", "");
});

When("recarrego a pagina", () => {
  cy.intercept({ url: /firestore\.googleapis\.com/ }).as("firestoreReload");
  cy.reload();
  cy.wait("@firestoreReload", { timeout: 10000 });
});

// ── OCR ───────────────────────────────────────────────────────────────────────

When(
  "faço upload de uma nota fiscal com extracao simulada de {string} e valor {string}",
  (establishment: string, amount: string) => {
    cy.intercept("POST", "/api/receipt-extraction", {
      statusCode: 200,
      body: {
        establishment,
        amount: parseFloat(amount),
        date: null,
        category: "Alimentacao",
      },
    }).as("ocrRequest");

    cy.get('input[type="file"]').selectFile(
      {
        contents: Cypress.Buffer.from("%PDF-1.4 dummy"),
        fileName: "nota.pdf",
        mimeType: "application/pdf",
      },
      { force: true },
    );
  },
);
