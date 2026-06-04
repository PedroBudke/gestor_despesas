import { When } from "@badeball/cypress-cucumber-preprocessor";

const abrirAbaSaida = () => {
  cy.get('[data-testid="tab-expense"]').click();
  cy.get("#title").should("be.visible");
};

When("clico na aba de saida manual", () => {
  abrirAbaSaida();
});

When("submeto o formulario de saida manual sem preencher nenhum campo", () => {
  abrirAbaSaida();
  cy.get("button[type='submit']").click();
});

When("preencho o campo titulo da despesa com {string}", (value: string) => {
  abrirAbaSaida();
  cy.get("#title").clear().type(value);
});

When("preencho o campo valor com {string}", (value: string) => {
  cy.get("#amount").clear().type(value);
});