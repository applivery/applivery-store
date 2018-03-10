describe('SO check', () => {
  it('should alert without ios or android', () => {
    cy.visitUA('/', 'DESKTOP')
    cy.contains('Please enter this site with your iOS or Android device')
  })
  it('should work with ios', () => {
    cy.visitUA('/', 'IOS')
    cy.contains('LOG IN')
  })
  it('should work with android', () => {
    cy.visitUA('/', 'ANDROID')
    cy.contains('LOG IN')
  })

  it('should work with desktop and android as param', () => {
    cy.visitUA('/?os=android', 'DESKTOP')
    cy.contains('LOG IN')
  })
  it('should work with desktop and ios as param', () => {
    cy.visitUA('/?os=ios', 'DESKTOP')
    cy.contains('LOG IN')
  })
  it('should alert with desktop and invalid as param', () => {
    cy.visitUA('/?os=invalid', 'DESKTOP')
    cy.contains('Please enter this site with your iOS or Android device')
  })
})
