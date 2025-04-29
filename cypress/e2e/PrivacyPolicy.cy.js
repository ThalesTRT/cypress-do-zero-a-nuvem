it('testa a página da política de privacidade de fora independente',() => {
    cy.visit('/src/privacy.html')

    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')

})