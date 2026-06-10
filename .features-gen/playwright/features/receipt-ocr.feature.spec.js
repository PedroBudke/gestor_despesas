// Generated from: playwright\features\receipt-ocr.feature
import { test } from "../../../playwright/support/fixtures.ts";

test.describe('Upload e extração de nota fiscal via OCR', () => {

  test.beforeEach('Background', async ({ Given, And, page }, testInfo) => { if (testInfo.error) return;
    await Given('que acesso a aplicação', null, { page }); 
    await And('estou na aba de nota fiscal', null, { page }); 
  });
  
  test('Exibe o título do painel de nota fiscal', async ({ Then, page }) => { 
    await Then('vejo o título "Nota fiscal — PDF ou imagem"', null, { page }); 
  });

  test('Exibe os tipos de arquivo aceitos no painel', async ({ Then, page }) => { 
    await Then('vejo o texto "PDF, JPG, PNG ou WEBP"', null, { page }); 
  });

  test('Exibe o botão de analisar nota fiscal', async ({ Then, page }) => { 
    await Then('vejo o botão "Analisar nota"', null, { page }); 
  });

  test('Rejeita arquivo de tipo não suportado e exibe erro', async ({ When, Then, page }) => { 
    await When('seleciono um arquivo do tipo "text/plain" com nome "planilha.csv"', null, { page }); 
    await Then('vejo o alerta "Envie um arquivo em PDF, JPG, PNG ou WEBP."', null, { page }); 
  });

  test('Aceita PDF válido e exibe o nome do arquivo selecionado', async ({ When, Then, And, page }) => { 
    await When('seleciono um arquivo do tipo "application/pdf" com nome "nota-mercado.pdf"', null, { page }); 
    await Then('vejo o texto "Arquivo selecionado:"', null, { page }); 
    await And('vejo o texto "nota-mercado.pdf"', null, { page }); 
  });

  test('Exibe alerta ao tentar analisar sem selecionar arquivo', async ({ When, Then, page }) => { 
    await When('clico no botão "Analisar nota"', null, { page }); 
    await Then('vejo o alerta "Selecione uma nota fiscal em PDF ou imagem para continuar."', null, { page }); 
  });

  test('API retorna 503 quando a chave OCR não está configurada', async ({ When, Then, And, apiState }) => { 
    await When('envio um POST para "/api/receipt-extraction" com um PDF válido', null, { apiState }); 
    await Then('a resposta tem status 503', null, { apiState }); 
    await And('a resposta contém o campo "error"', null, { apiState }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('playwright\\features\\receipt-ocr.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":11,"pickleLine":7,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given que acesso a aplicação","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"And estou na aba de nota fiscal","isBg":true,"stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then vejo o título \"Nota fiscal — PDF ou imagem\"","stepMatchArguments":[{"group":{"start":14,"value":"\"Nota fiscal — PDF ou imagem\"","children":[{"start":15,"value":"Nota fiscal — PDF ou imagem","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":15,"pickleLine":10,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given que acesso a aplicação","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"And estou na aba de nota fiscal","isBg":true,"stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":11,"keywordType":"Outcome","textWithKeyword":"Then vejo o texto \"PDF, JPG, PNG ou WEBP\"","stepMatchArguments":[{"group":{"start":13,"value":"\"PDF, JPG, PNG ou WEBP\"","children":[{"start":14,"value":"PDF, JPG, PNG ou WEBP","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":19,"pickleLine":13,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given que acesso a aplicação","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"And estou na aba de nota fiscal","isBg":true,"stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"Then vejo o botão \"Analisar nota\"","stepMatchArguments":[{"group":{"start":13,"value":"\"Analisar nota\"","children":[{"start":14,"value":"Analisar nota","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":23,"pickleLine":16,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given que acesso a aplicação","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"And estou na aba de nota fiscal","isBg":true,"stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":17,"keywordType":"Action","textWithKeyword":"When seleciono um arquivo do tipo \"text/plain\" com nome \"planilha.csv\"","stepMatchArguments":[{"group":{"start":29,"value":"\"text/plain\"","children":[{"start":30,"value":"text/plain","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":51,"value":"\"planilha.csv\"","children":[{"start":52,"value":"planilha.csv","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":25,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"Then vejo o alerta \"Envie um arquivo em PDF, JPG, PNG ou WEBP.\"","stepMatchArguments":[{"group":{"start":14,"value":"\"Envie um arquivo em PDF, JPG, PNG ou WEBP.\"","children":[{"start":15,"value":"Envie um arquivo em PDF, JPG, PNG ou WEBP.","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":28,"pickleLine":20,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given que acesso a aplicação","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"And estou na aba de nota fiscal","isBg":true,"stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":21,"keywordType":"Action","textWithKeyword":"When seleciono um arquivo do tipo \"application/pdf\" com nome \"nota-mercado.pdf\"","stepMatchArguments":[{"group":{"start":29,"value":"\"application/pdf\"","children":[{"start":30,"value":"application/pdf","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":56,"value":"\"nota-mercado.pdf\"","children":[{"start":57,"value":"nota-mercado.pdf","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":30,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"Then vejo o texto \"Arquivo selecionado:\"","stepMatchArguments":[{"group":{"start":13,"value":"\"Arquivo selecionado:\"","children":[{"start":14,"value":"Arquivo selecionado:","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":31,"gherkinStepLine":23,"keywordType":"Outcome","textWithKeyword":"And vejo o texto \"nota-mercado.pdf\"","stepMatchArguments":[{"group":{"start":13,"value":"\"nota-mercado.pdf\"","children":[{"start":14,"value":"nota-mercado.pdf","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":34,"pickleLine":25,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given que acesso a aplicação","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"And estou na aba de nota fiscal","isBg":true,"stepMatchArguments":[]},{"pwStepLine":35,"gherkinStepLine":26,"keywordType":"Action","textWithKeyword":"When clico no botão \"Analisar nota\"","stepMatchArguments":[{"group":{"start":15,"value":"\"Analisar nota\"","children":[{"start":16,"value":"Analisar nota","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":36,"gherkinStepLine":27,"keywordType":"Outcome","textWithKeyword":"Then vejo o alerta \"Selecione uma nota fiscal em PDF ou imagem para continuar.\"","stepMatchArguments":[{"group":{"start":14,"value":"\"Selecione uma nota fiscal em PDF ou imagem para continuar.\"","children":[{"start":15,"value":"Selecione uma nota fiscal em PDF ou imagem para continuar.","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":39,"pickleLine":29,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given que acesso a aplicação","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"And estou na aba de nota fiscal","isBg":true,"stepMatchArguments":[]},{"pwStepLine":40,"gherkinStepLine":30,"keywordType":"Action","textWithKeyword":"When envio um POST para \"/api/receipt-extraction\" com um PDF válido","stepMatchArguments":[{"group":{"start":19,"value":"\"/api/receipt-extraction\"","children":[{"start":20,"value":"/api/receipt-extraction","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":41,"gherkinStepLine":31,"keywordType":"Outcome","textWithKeyword":"Then a resposta tem status 503","stepMatchArguments":[{"group":{"start":22,"value":"503"},"parameterTypeName":"int"}]},{"pwStepLine":42,"gherkinStepLine":32,"keywordType":"Outcome","textWithKeyword":"And a resposta contém o campo \"error\"","stepMatchArguments":[{"group":{"start":26,"value":"\"error\"","children":[{"start":27,"value":"error","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end