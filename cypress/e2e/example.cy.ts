// https://docs.cypress.io/api/introduction/api.html

describe('Authorize user with Spotify', () => {
  it('visits the app root url', () => {
    cy.visit('/')
    cy.get('.spotify-oauth2-btn').click()
    cy.url().should('include', '/my-url')
  })
})
