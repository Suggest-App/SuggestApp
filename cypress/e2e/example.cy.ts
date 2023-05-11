// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('visits the app root url', () => {
    cy.setCookie('jwt', 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1NDc4NjllZi1kNTcxLTQ4ZWUtYjc0NC01YTIwZjQ2NjllOTciLCJuYW1lIjoicy5jbGFlcyIsImV4cCI6MTY4MzIxNzI3MywiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MTczIiwiaWF0IjoxNjgyOTU4MDczLCJuYmYiOjE2ODI5NTgwNzN9.rL-gRuQg699Q2p1dQb9sAZxouftZjvLaxeQYS_WEMqdGrh7XzyikpKvQUceuo1ITu_lWEitXTUot49ug2eUJzA')
    cy.visit('/')
  })
})
