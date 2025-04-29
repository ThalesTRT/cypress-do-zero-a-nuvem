describe('teste 1 PJe - acesso base TST', () =>{

    beforeEach(() =>{
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
          })
        cy.visit('https://pjetst.trt4.jus.br/primeirograu')
        })
        
    

    it('Faz login por CPF e senha', () => {

        cy.get('input[id="username"')
            .type('02544602082')
            .should('have.value','02544602082')
        cy.get('input[id="password"')
            .type('tst_trt4')
            .should('have.value','tst_trt4')
        cy.get('button[id="btnEntrar"]')
            .click() 
    })

}) 