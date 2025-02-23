// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//###### Area do comando customizado #######
//essa instrução que vai adicionar um comando customizado ao cypress
Cypress.Commands.add('setToken', function () {
    cy.api({
        method: 'POST',    //aqui é uma requisição(endpoint)
        url: '/sessions',
        body: {
            email: 'clei@qacademy.io',
            password: 'qa-cademy'
        },
        failOnStatusCode: false
    }).then(function (response) {
        expect(response.status).to.eql(200)
        Cypress.env('token', response.body.token)
    })
})

Cypress.Commands.add('back2ThePast', function (response) {
    cy.api({
        method: 'DELETE',
        url: '/back2thepast/629690cbb1421500162c0a7e',
        failOnStatusCode: false
    }).then(function (response) {
        expect(response.status).to.eql(200)
    })
})

//POST requisição que testa o cadastro de personagens
Cypress.Commands.add('postCharacter', function (payload) {
    cy.api({
        method: 'POST',   //aqui é uma requisição(endpoit)
        url: '/characters',
        body: payload,
        headers: {
            Authorization: Cypress.env('token')
        },
        failOnStatusCode: false
    }).then(function (response) {
        return response
    })
})