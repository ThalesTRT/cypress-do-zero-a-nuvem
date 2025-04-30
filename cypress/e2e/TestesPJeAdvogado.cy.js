describe('teste 1 PJe - acesso base TST', () =>{

    beforeEach(() =>{
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
          })
        cy.visit('https://pjetst.trt4.jus.br/primeirograu')
        })

    
    it('Protocolar processo em Porto Alegre com órgão público  e verificar se cai na 18º VT',() => {
        cy.get('input[id="username"')
        .type('77965922053')
        .should('have.value','77965922053')
    cy.get('input[id="password"')
        .type('tst_trt4')
        .should('have.value','tst_trt4')
    cy.get('button[id="btnEntrar"]')
        .click()
    cy.wait(2000)
    cy.contains('span','Valdomiro Vieira Martins').should('be.visible')

    cy.get('button[name="Novo Processo"]').click()
    cy.wait(2000)
    cy.contains('h3','Autuação de processo').should('be.visible')
    cy.get('input[data-placeholder="Jurisdição"]').type('Porto Ale{downArrow}{enter}')
    cy.wait(500)

    cy.get('input[data-placeholder="Classe judicial"]').type('Ação Trabalhista - Rito Ordinár{downarrow}{enter}')
    cy.get('button[type="submit"]').click()
    })    
    
    })
