function visitWithHost(url, hostname, fn) {
  cy.visitUA(url, 'ANDROID', window => {
    window.__testHostname = hostname
  })
}

describe('enterprise customization', () => {
  beforeEach(() => {
    cy.server()
    cy.route('POST', '/api/auth', 'fixture:auth')
    cy.route('GET', '/api/apps', 'fixture:apps')
    cy.route('GET', '/api/member', 'fixture:member').as('member')
    cy.route('POST', '/api/enterprise', 'fixture:enterprise').as('enterprise')
  })

  it('should use customization from enterprise domain', () => {
    visitWithHost('/', 'custom-enterprise.applivery.com')
    cy
      .wait('@enterprise')
      .its('requestBody')
      .should('have.property', 'domain', 'custom-enterprise.applivery.com')
    cy.get('.toolbar').should('have.css', 'background-color', 'rgb(125, 8, 8)')
    cy
      .get('.toolbar-logo')
      .should(
        'have.css',
        'background-image',
        'url("https://dashboard.applivery.com/img/enterprise/54cb4e6df997a46c041b9983.jpg")'
      )
  })

  it('should not call for enterprise customization from generic domain', () => {
    visitWithHost('/', 'store.applivery.com')
    cy.get('.toolbar').should('have.css', 'background-color', 'rgb(29, 112, 183)')
    cy.get('.toolbar__title').should('contain', 'Applivery')
  })

  it('should not call for enterprise customization from localhost domain', () => {
    cy.visitUA('/', 'ANDROID')
    cy.get('.toolbar').should('have.css', 'background-color', 'rgb(29, 112, 183)')
    cy.get('.toolbar__title').should('contain', 'Applivery')
  })
})
