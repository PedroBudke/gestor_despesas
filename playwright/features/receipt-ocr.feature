Feature: Upload e extração de nota fiscal via OCR

  Background:
    Given que acesso a aplicação
    And estou na aba de nota fiscal

  Scenario: Exibe o título do painel de nota fiscal
    Then vejo o título "Nota fiscal — PDF ou imagem"

  Scenario: Exibe os tipos de arquivo aceitos no painel
    Then vejo o texto "PDF, JPG, PNG ou WEBP"

  Scenario: Exibe o botão de analisar nota fiscal
    Then vejo o botão "Analisar nota"

  Scenario: Rejeita arquivo de tipo não suportado e exibe erro
    When seleciono um arquivo do tipo "text/plain" com nome "planilha.csv"
    Then vejo o alerta "Envie um arquivo em PDF, JPG, PNG ou WEBP."

  Scenario: Aceita PDF válido e exibe o nome do arquivo selecionado
    When seleciono um arquivo do tipo "application/pdf" com nome "nota-mercado.pdf"
    Then vejo o texto "Arquivo selecionado:"
    And vejo o texto "nota-mercado.pdf"

  Scenario: Exibe alerta ao tentar analisar sem selecionar arquivo
    When clico no botão "Analisar nota"
    Then vejo o alerta "Selecione uma nota fiscal em PDF ou imagem para continuar."

  Scenario: API retorna 503 quando a chave OCR não está configurada
    When envio um POST para "/api/receipt-extraction" com um PDF válido
    Then a resposta tem status 503
    And a resposta contém o campo "error"
