describe('auth', () => {
  beforeEach(() => {
    cy.server()
    cy.route('POST', '/api/auth', 'fixture:auth')
    cy.route('GET', '/api/apps', 'fixture:apps')
    cy.route('GET', '/api/member', 'fixture:member').as('member')
  })

  it('should login', () => {
    cy.visitUA('/', 'ANDROID')
    cy.get('input[type="email"]').type('test@applivery.com')
    cy.get('input[type="password"]').type('123456')
    cy.contains('LOG IN').click()
    cy
      .wait('@member')
      .its('requestHeaders.authorization')
      .should('eq', 'Bearer xxxx')
    cy
      .window()
      .its('localStorage.token')
      .should('eq', 'xxxx')

    cy.contains('My apps')
  })

  it('should load auth from localStorage', () => {
    cy.visitUA('/', 'ANDROID', window => {
      window.localStorage.setItem('token', 'yyyy')
    })

    cy
      .wait('@member')
      .its('requestHeaders.authorization')
      .should('eq', 'Bearer yyyy')

    cy.contains('My apps')
  })

  it('should not load invalid auth from localStorage', () => {
    cy
      .route({
        method: 'GET',
        url: '/api/member',
        status: 401,
        response: '',
      })
      .as('member')

    cy.visitUA('/', 'ANDROID', window => {
      window.localStorage.setItem('token', 'zzzz')
    })

    cy
      .wait('@member')
      .its('requestHeaders.authorization')
      .should('eq', 'Bearer zzzz')

    cy.contains('LOG IN')
  })

  it('should load auth from url', () => {
    cy.visitUA('/?authToken=aaaa', 'ANDROID')

    cy
      .wait('@member')
      .its('requestHeaders.authorization')
      .should('eq', 'Bearer aaaa')

    cy.contains('My apps')
  })

  it('should load auth from url instead of localStorage', () => {
    cy.visitUA('/?authToken=bbbb', 'ANDROID', window => {
      window.localStorage.setItem('token', 'cccc')
    })

    cy
      .wait('@member')
      .its('requestHeaders.authorization')
      .should('eq', 'Bearer bbbb')

    cy.contains('My apps')
  })

  it('should save auth from url', () => {
    cy.visitUA('/?authToken=bbbb', 'ANDROID', window => {
      window.localStorage.setItem('token', 'cccc')
    })

    cy
      .wait('@member')
      .its('requestHeaders.authorization')
      .should('eq', 'Bearer bbbb')

    cy.contains('My apps')

    cy.visitUA('/', 'ANDROID')

    cy
      .wait('@member')
      .its('requestHeaders.authorization')
      .should('eq', 'Bearer bbbb')

    cy.contains('My apps')
  })
})
