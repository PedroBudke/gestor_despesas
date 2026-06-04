import "./commands";

// Desabilita animações CSS para evitar falhas de timing no modo headless.
// O animate-enter inicia com opacity:0, que causa timeout em should("be.visible").
Cypress.on("window:before:load", (win) => {
  const sheet = new win.CSSStyleSheet();
  sheet.replaceSync(
    "*, *::before, *::after { animation-duration: 0ms !important; animation-delay: 0ms !important; transition-duration: 0ms !important; }",
  );
  win.document.adoptedStyleSheets = [
    ...(win.document.adoptedStyleSheets ?? []),
    sheet,
  ];
});
