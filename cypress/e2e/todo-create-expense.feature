Feature: Criação de saída manual no Firestore

  Background:
    Given que acesso a pagina inicial

  Scenario: Salva uma saida manual com dados validos e exibe na lista
    When clico na aba de saida manual
    And preencho o campo titulo da despesa com "Mercado semanal"
    And preencho o campo valor com "150.00"
    And seleciono a categoria "Alimentacao"
    And clico no botao "Salvar despesa"
    Then vejo o texto "Despesa cadastrada com sucesso."
    And a despesa "Mercado semanal" aparece na lista de ultimas despesas

  Scenario: Exibe confirmacao e limpa o formulario apos salvar
    When clico na aba de saida manual
    And preencho o campo titulo da despesa com "Aluguel"
    And preencho o campo valor com "1200.00"
    And clico no botao "Salvar despesa"
    Then vejo o texto "Despesa cadastrada com sucesso."
    And o campo titulo da despesa esta vazio
    And o campo valor da despesa esta vazio

  Scenario: Permite excluir uma saida existente da lista
    When clico na aba de saida manual
    And preencho o campo titulo da despesa com "Despesa para excluir"
    And preencho o campo valor com "50.00"
    And clico no botao "Salvar despesa"
    Then a despesa "Despesa para excluir" aparece na lista de ultimas despesas
    When excluo a despesa "Despesa para excluir"
    Then a despesa "Despesa para excluir" nao aparece na lista de ultimas despesas
