function visitLang(url, langs, fn) {
  cy.visitUA(url, 'ANDROID', window => {
    window.localStorage.setItem('token', 'yyyy')
    window.navigator.__defineGetter__('languages', function() {
      return langs
    })
    if (fn) fn(window)
  })
}

describe('i18n', () => {
  beforeEach(() => {
    cy.server()
    cy.route('POST', '/api/auth', 'fixture:auth')
    cy.route('GET', '/api/apps', 'fixture:apps')
    cy.route('GET', '/api/member', 'fixture:member').as('member')
  })

  it('should use lang from browser', () => {
    visitLang('/', ['es'])

    cy.contains('Mis apps')
  })

  it('should use default lang if not found', () => {
    visitLang('/', ['invalid'])

    cy.contains('My apps')
  })

  it('should use lang from url instead of browser', () => {
    visitLang('/?lang=es', ['en'])

    cy.contains('Mis apps')
  })

  it('should save selected lang in localStorage', () => {
    visitLang('/', ['en'])

    cy.contains('My apps')
    cy.get('.toolbar__side-icon').click()
    cy
      .window()
      .its('localStorage')
      .should('not.have.property', 'locale')
    cy.contains('Change language').click()
    cy
      .window()
      .its('localStorage')
      .should('have.property', 'locale', 'es')
  })

  it('should use lang from localStorage', () => {
    visitLang('/', ['en'], window => {
      window.localStorage.setItem('locale', 'es')
    })
    cy.contains('Mis apps')
  })

  it('should use lang from url instead of localStorage', () => {
    visitLang('/?lang=en', ['en'], window => {
      window.localStorage.setItem('locale', 'es')
    })
    cy.contains('My apps')
  })
})
