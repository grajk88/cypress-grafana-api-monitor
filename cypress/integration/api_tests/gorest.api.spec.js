/// <reference types="cypress" />

describe("Go Rest API Tests - https://gorest.co.in/",()=>{

    it("Users Service",()=>{

        cy.request("https://gorest.co.in/public-api/users").as("users")
        cy.get('@users').its('status').should('equal', 200)

    })

    it("Posts Service",()=>{

        cy.request("https://gorest.co.in/public-api/posts").as("posts")
        cy.get('@posts').its('status').should('equal', 200)

    })

    it("Comments Service",()=>{

        cy.request("https://gorest.co.in/public-api/comments").as("comments")
        cy.get('@comments').its('status').should('equal', 200)

    })

    it("Albums Service",()=>{

        cy.request("https://gorest.co.in/public-api/albums").as("albums")
        cy.get('@albums').its('status').should('equal', 200)

    })
})