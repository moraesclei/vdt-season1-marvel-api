import { functionsIn } from "cypress/types/lodash"

//describe -> é um agrupador de testes do cypress
describe('POST /characters', function(){

    before(function(){
        cy.back2ThePast()
        cy.setToken()  
    })

    it('deve cadastrar um personagem',function(){
        
        const character = {
            name: 'Wanda Maximoff',
            alias: 'Feiticeira Escarlate',
            team:['Vingadores'],
            active: true
        }

        cy.api({
            method: 'POST',   //aqui é uma requisição(endpoit)
            url: '/characters',
            body: character,
            headers:{
                Authorization: Cypress.env('token')
            }
        }).then(function(response){
            expect(response.status).to.eql(201)
            cy.log(response.body.character_id)
            expect(response.body.character_id.length).to.eql(24)
        })
    })

    context.only('quando o personagem já existe', function(){

        const character = {
            name: 'Pietro Maximoff',
            alias: 'Mercurio',
            team: [
                'vingadores da costa oeste',
                'irmandade da mutantes'
            ],
            active: true
        }

        before(function(){
            cy.api({
                method: 'POST',   
                url: '/characters',
                body: character,
                headers:{
                    Authorization: Cypress.env('token')
                }
            }).then(function(response){
                expect(response.status).to.eql(201)
                
            })
        })

        it('não deve cadastrar duplicado', function(){
            cy.api({
                method: 'POST',   //aqui é uma requisição(endpoit)
                url: '/characters',
                body: character,
                headers:{
                    Authorization: Cypress.env('token')
                }
            }).then(function(response){
                expect(response.status).to.eql(400)
                expect(response.body.error).to.eql('Duplicate character')
        })
    })
})





//Adicionei um biblioteca que vai gerar nomes dinâmicos, para permitir que o teste não retorne erro "Bad Request" referente "Duplicate character"