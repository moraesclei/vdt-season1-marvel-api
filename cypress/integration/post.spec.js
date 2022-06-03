//describe -> é um agrupador de testes do cypress
describe('POST /characters', function () {

    before(function () {
        cy.back2ThePast()
        cy.setToken()

    })

    it('deve cadastrar um personagem', function () {

        const character = {
            name: 'Wanda Maximoff',
            alias: 'Feiticeira Escarlate',
            team: ['Vingadores'],
            active: true
        }

        cy.postCharacter(character)
            .then(function (response) {
                expect(response.status).to.eql(201)
                cy.log(response.body.character_id)
                expect(response.body.character_id.length).to.eql(24)
            })
    })

    context('quando o personagem já existe', function () {

        const character = {
            name: 'Pietro Maximoff',
            alias: 'Mercurio',
            team: [
                'vingadores da costa oeste',
                'irmandade da mutantes'
            ],
            active: true
        }


        before(function () {
            cy.postCharacter(character).then(function (response) {
                expect(response.status).to.eql(201)
            })
        })


        it('não deve cadastrar duplicado', function () {
            cy.postCharacter(character).then(function (response) {
                expect(response.status).to.eql(400)
                expect(response.body.error).to.eql('Duplicate character')
            })
        })

        it('preencher os campos obrigatórios', function () {
            cy.expect('name')
            //.should('be.visible')
            //.type('Pietro Maximoff')
            cy.expect('alias')
            //.should('be.visible')
            //.type('codinome')
            cy.expect('team')
            //.should('be.visible')
            //.type('vingadores da costa oeste',
            //'irmandade da mutantes')


    })

})

})








