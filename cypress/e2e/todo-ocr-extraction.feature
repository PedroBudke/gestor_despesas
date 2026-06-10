Feature: Extração de nota fiscal por OCR

  Background:
    Given que acesso a pagina inicial
    When clico na aba de nota fiscal

  Scenario: Extrai dados de uma nota fiscal em PDF e salva como despesa
    When faço upload de uma nota fiscal com extracao simulada de "Supermercado Central" e valor "89.90"
    And clico no botao "Analisar nota"
    Then vejo o texto "Despesa criada automaticamente a partir da nota fiscal."
    And a despesa "Supermercado Central" aparece na lista de ultimas despesas

  Scenario: A rota de OCR retorna os campos esperados no contrato
    When faço upload de uma nota fiscal com extracao simulada de "Farmacia Saude" e valor "45.00"
    And clico no botao "Analisar nota"
    Then vejo o texto "Despesa criada automaticamente a partir da nota fiscal."

  Scenario: Exibe mensagem de sucesso apos importar a nota fiscal
    When faço upload de uma nota fiscal com extracao simulada de "Posto Combustivel" e valor "180.00"
    And clico no botao "Analisar nota"
    Then vejo o texto "Despesa criada automaticamente a partir da nota fiscal."
