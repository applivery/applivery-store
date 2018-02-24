describe('SO check', () => {
  it('should alert without ios or android', () => {
    cy.visitUA('/', 'DESKTOP')
    cy.contains('Please enter this site with your iOS or Android device')
  })
  it('should alert with ios', () => {
    cy.visitUA('/', 'IOS')
    cy.contains('LOG IN')
  })
  it('should alert with android', () => {
    cy.visitUA('/', 'ANDROID')
    cy.contains('LOG IN')
  })
})
