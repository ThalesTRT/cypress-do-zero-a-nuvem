describe('Central de Atendimento ao Cliente TAT', () => {
  	
	beforeEach(() => {
		cy.visit('../../src/index.html')
			})

	it('verifica o título da aplicação', () => {
	
		cy.title().should('eq','Central de Atendimento ao Cliente TAT')
	
  	})

	it('preenche os campos obrigatórios e envia o formulário', () => {
	const textoLongo = Cypress._.repeat('Estou testando esta aplicação! ',10 )
	cy.get('input[name="firstName"]').type('Thales')
	cy.get('input[name="lastName"]').type('Soffiatti')
	cy.get('input[id="email"]').type('teste@teste.com')
	cy.get('input[id="phone"]').type('519998199')
	cy.get('textarea[id="open-text-area"]').type(textoLongo,{delay:0})
	

	cy.get('input[name="firstName"]')
	.should('have.value','Thales')
	cy.get('input[name="lastName"]')
	.should('have.value','Soffiatti')
	cy.get('input[id="email"]')
	.should('have.value','teste@teste.com')
	cy.get('input[id="phone"]')
	.should('have.value','519998199')
	cy.get('textarea[id="open-text-area"]')
	.should('have.value',textoLongo)

	cy.get('button[type="submit"]').click()

	cy.get('span[class="success"').should('be.visible')

	})

	it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
		const textoLongo = Cypress._.repeat('Estou testando esta aplicação! ',10 )
		cy.get('input[name="firstName"]').type('Thales')
		cy.get('input[name="lastName"]').type('Soffiatti')
		cy.get('input[id="email"]').type('testeteste.com')
		cy.get('input[id="phone"]').type('abx')
		cy.get('textarea[id="open-text-area"]').type(textoLongo,{delay:0})
		
	
		cy.get('input[name="firstName"]')
		.should('have.value','Thales')
		cy.get('input[name="lastName"]')
		.should('have.value','Soffiatti')
		cy.get('input[id="email"]')
		.should('have.value','testeteste.com')
		cy.get('input[id="phone"]')
		.should('have.value','')
		cy.get('textarea[id="open-text-area"]')
		.should('have.value',textoLongo)
	
		cy.get('button[type="submit"]').click()
	
		cy.get('span[class="error"').should('be.visible')
	
	})
	
	it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
		const textoLongo = Cypress._.repeat('Estou testando esta aplicação! ',2 )
		cy.get('input[name="firstName"]').type('Thales')
		cy.get('input[name="lastName"]').type('Soffiatti')
		cy.get('input[id="email"]').type('teste@teste.com')
		cy.get('input[id="phone"]').type('abx')
		cy.get('#phone-checkbox').check()
		cy.get('textarea[id="open-text-area"]').type(textoLongo,{delay:0})

		
	
		cy.get('input[name="firstName"]')
		.should('have.value','Thales')
		cy.get('input[name="lastName"]')
		.should('have.value','Soffiatti')
		cy.get('input[id="email"]')
		.should('have.value','teste@teste.com')
		cy.get('input[id="phone"]')
		.should('have.value','')
		cy.get('textarea[id="open-text-area"]')
		.should('have.value',textoLongo)
		cy.get('input[id=phone-checkbox]').should('be.checked')

		cy.get('button[type="submit"]').click()
	
		cy.get('span[class="error"').should('be.visible')

	})
	

	it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
		const textoLongo = Cypress._.repeat('Estou testando esta aplicação! ',2 )
		cy.get('input[name="firstName"]').type('Thales')
		cy.get('input[name="lastName"]').type('Soffiatti')
		cy.get('input[id="email"]').type('teste@teste.com')
		cy.get('input[id="phone"]').type('519999875')
		cy.get('#phone-checkbox').click()
		cy.get('textarea[id="open-text-area"]').type(textoLongo,{delay:0})
	
		//verifica se os campos foram devidamente preenchidos
		cy.get('input[name="firstName"]')
		.should('have.value','Thales')
		cy.get('input[name="lastName"]')
		.should('have.value','Soffiatti')
		cy.get('input[id="email"]')
		.should('have.value','teste@teste.com')
		cy.get('input[id="phone"]')
		.should('have.value','519999875')
		cy.get('textarea[id="open-text-area"]')
		.should('have.value',textoLongo)
		cy.get('input[id=phone-checkbox]').should('be.checked')

		//limpa os campos
		cy.get('input[name="firstName"]').clear()
		cy.get('input[name="lastName"]').clear()
		cy.get('input[id="email"]').clear()
		cy.get('input[id="phone"]').clear()

		//Verifica se os campos estão limpos
		cy.get('input[name="firstName"]')
		.should('have.value','')
		cy.get('input[name="lastName"]')
		.should('have.value','')
		cy.get('input[id="email"]')
		.should('have.value','')
		cy.get('input[id="phone"]')
		.should('have.value','')
	})

	it('utiliza comando para preencher os dados', () => {
		const textoLongo = Cypress._.repeat('Estou testando esta aplicação! ',2 )
		const dados = {
			nome: 'Thales',
			sobrenome: 'Soffiatti',
			email: 'teste@teste.com',
			phone: '519999875',
			feedback: 'Estou testando essa aplicação'

		}

		cy.fillMandatoryFieldsAndSubmit(dados)

		cy.get('.success').should('be.visible')
	
	})

	it('Usando cy.contains para clicar nos elementos', () => {
		const textoLongo = Cypress._.repeat('Estou testando esta aplicação! ',2 )
		cy.get('input[name="firstName"]').type('Thales')
		cy.get('input[name="lastName"]').type('Soffiatti')
		cy.get('input[id="email"]').type('teste@teste.com')
		cy.get('input[id="phone"]').type('519998199')
		cy.get('textarea[id="open-text-area"]').type(textoLongo,{delay:0})


		cy.contains('Elogio').find('input').click()
		cy.contains('Elogio').find('input').should('be.checked')

		cy.contains('button','Enviar').click()

		cy.get('.success').should('be.visible')



	})

	it('seleciona um produto (YouTube) por seu texto', () => {
		cy.get('#product').select('YouTube')
		
		cy.get('#product').should('have.value','youtube')

	})
	
	it('seleciona um produto (Mentoria) por seu valor (value)', () => {
		cy.get('#product').select('mentoria')
		
		cy.get('#product').should('have.value','mentoria')

	})

	it('seleciona um produto (Blog) por seu índice', () => {
		cy.get('#product').select(1)
		
		cy.get('#product').should('have.value','blog')

	})

	it('marca o tipo de atendimento "Feedback"', () => {
		cy.get('input[type=radio][value="feedback"]').check()
		
		cy.get('input[type=radio][value="feedback"]').should('be.checked')

	})

	it('marca cada tipo de atendimento', () =>{
		cy.get('input[type="radio"]')
		  .each(tipoDeServico =>{
			cy.wrap(tipoDeServico)
				.check()
				.should('be.checked')

		  })

	})

	it('marca ambos checkboxes, depois desmarca o último', () => {
		cy.get('input[type="checkbox"]')
				.check()
				.should('be.checked')

		
		cy.get('input[type="checkbox"]')
			.last()
			.uncheck()
			.should('not.be.checked')

	})

	it('seleciona um arquivo da pasta fixtures', () => {
		cy.get('input[type="file"]').selectFile('./cypress/fixtures/example.json')
			.should(input => {
				console.log(input)
				expect(input[0].files[0].name).to.equal('example.json')
			})
			
	})

	it('seleciona um arquivo simulando um drag-and-drop', () => {
		cy.get('input[type="file"]').selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
			.should(input => {
				console.log(input)
				expect(input[0].files[0].name).to.equal('example.json')
			})
			
	})
	
	it('seleciona um arquivo simulando que recebeu um alias', () => {
		cy.fixture('example.json').as('sampleFile')
		cy.get('input[type="file"]').selectFile('@sampleFile', {action: 'drag-drop'})
			.should(input => {
				console.log(input)
				expect(input[0].files[0].name).to.equal('example.json')
			})
			
	})


	it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
		cy.contains('a','Política de Privacidade')
			.should('have.attr','target','_blank')
			
	})

	it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
		cy.contains('a','Política de Privacidade')
			.invoke('removeAttr','target')
			.click()
		cy.get('div[class="privacy"]')
			.should('be.visible')
			
	})
})