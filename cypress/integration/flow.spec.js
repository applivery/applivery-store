describe('normal flow', () => {
  beforeEach(() => {
    cy.server()
    cy.route('POST', '/api/auth', 'fixture:auth')
    cy.route('GET', '/api/member', 'fixture:member')
    cy.route('GET', '/api/apps', 'fixture:apps')
    cy.route('GET', '/api/apps/*', 'fixture:appDetail')
    cy.route('GET', '/api/builds/*', 'fixture:buildDetail')
    cy.route('GET', '/api/builds/app/*', 'fixture:appBuild')
    cy.route('GET', '/api/builds/*/token', 'fixture:buildToken')
  })

  it('should login', () => {
    cy.visitUA('/', 'ANDROID')
    cy.get('input[type="email"]').type('test@applivery.com')
    cy.get('input[type="password"]').type('123456')
    cy.contains('LOG IN').click()
  })

  it('should list only android apps', () => {
    cy
      .get('.layout.row.wrap')
      .children()
      .should('have.length', 4)
  })

  it('should filter', () => {
    cy.get('input').type('android')
    cy
      .get('.layout.row.wrap')
      .children()
      .should('have.length', 2)
  })

  it('should navigate to app detail', () => {
    cy.contains('Android Testing App').click()
    cy.contains('Lorem ipsum')
    cy.contains('version notes')
  })

  it('should navigate to app history', () => {
    cy.contains('a', 'History').click()
    cy.url().should('contain', 'history')
    cy
      .get('#history > .container')
      .find('.flex')
      .should('have.length', 3)
  })

  it('should navigate back to app detail', () => {
    cy.contains('a', 'Detail').click()
    cy.url().should('not.contain', 'history')
  })

  it('should show install button', () => {
    cy.contains('INSTALL')
  })

  // it('should download apk', () => {
  //   cy.contains('INSTALL').click()
  //   cy.url().should('contain', 'dashboard')
  // })

  // it('should go back to list', () => {
  //   cy.visitUA('/', 'ANDROID')
  // })
})
