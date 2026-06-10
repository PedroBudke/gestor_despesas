Feature: Criação de entrada financeira no Firestore

  Background:
    Given que acesso a pagina inicial

  Scenario: Salva uma entrada e atualiza o card de entradas
    When preencho o campo descricao da entrada com "Salario de abril"
    And preencho o campo valor da entrada com "5000"
    And seleciono a origem "Salario"
    And clico no botao "Salvar entrada"
    Then vejo o texto "Entrada cadastrada com sucesso."

  Scenario: Exibe confirmacao e reseta o formulario apos salvar
    When preencho o campo descricao da entrada com "Reembolso de viagem"
    And preencho o campo valor da entrada com "200"
    And clico no botao "Salvar entrada"
    Then vejo o texto "Entrada cadastrada com sucesso."
    And o campo descricao da entrada esta vazio
    And o campo valor da entrada esta vazio

  Scenario: Entradas persistidas aparecem apos recarregar a pagina
    When preencho o campo descricao da entrada com "Entrada persistida"
    And preencho o campo valor da entrada com "100"
    And clico no botao "Salvar entrada"
    Then vejo o texto "Entrada cadastrada com sucesso."
    When recarrego a pagina
    Then vejo o heading "Cadastro de entradas"
