// ---- Application actions

Cypress.Commands.add('accessPHPtravelsFligth', () => { 
    cy.visit('https://phptravels.net/flights') 
    cy.waitUntilContains('PHPTRAVELS')
    cy.clickGet('.header_menu > :nth-child(1) > .nav-link')
})

// ---- Basics actions

// Cliking elements

Cypress.Commands.add('clickButton', (label) => {
    cy.get('button').contains(label).click()
  })

Cypress.Commands.add('clickLink', (label) => {
    cy.get('a').contains(label).click()
  })

  Cypress.Commands.add('clickGet', (label) => {
    cy.get(label).click()
  })

  Cypress.Commands.add('clickContains', (label) => {
    cy.contains(label).click()
  })


// Implicity waiting

Cypress.Commands.add('waitUntilContains', (label) => {
    cy.contains(label, { timeout: 60000 }).should('be.visible')    
})

Cypress.Commands.add('waitUntilGet', (label) => {
    cy.get(label, { timeout: 60000 }).should('be.visible')    
})

Cypress.Commands.add('waitUntilGetContains', (element,label) => {
    cy.get(element, { timeout: 60000 }).contains(label).should('be.visible')    
})