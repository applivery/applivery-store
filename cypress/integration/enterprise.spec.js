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

  it('should use lang from browser', () => {
    visitWithHost('/', 'store.applivery.com')
    cy
      .wait('@enterprise')
      .its('requestBody')
      .should('have.property', 'domain', 'store.applivery.com')
    // cy.pause()
  })
})
