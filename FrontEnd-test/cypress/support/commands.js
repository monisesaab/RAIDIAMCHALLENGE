// ---- Application actions

Cypress.Commands.add('accessPHPtravelsFligth', () => { 
    cy.visit('https://phptravels.net/flights') 
    cy.waitUntilContains('PHPTRAVELS')
    cy.clickGet('.header_menu > :nth-child(1) > .nav-link')
})

Cypress.Commands.add('searchFligths',(from, to, date, travellersAdult,travellersChilds,travellersInfants) => {
  cy.get('#onereturn > :nth-child(1) > .input-items > .form-floating > .select2 > .selection > .select2-selection > .select2-selection__arrow > b').click()
  cy.clickButton(from)
  cy.get('#onereturn > :nth-child(2) > .input-items > .form-floating > .select2 > .selection > .select2-selection > .select2-selection__arrow > b').click()
  cy.clickButton(to)
  cy.get('#cookie_stop').click()
  cy.get(':nth-child(3) > .row > :nth-child(1) > .form-floating > #departure').click()
  cy.get(':nth-child(3) > .row > :nth-child(1) > .form-floating > #departure').clear().type(date)
  cy.get('.form-group > .dropdown > .dropdown-toggle').click()
  cy.get('#fadults').clear().type(travellersAdult)
  cy.get('#fchilds').clear().type(travellersChilds)
  cy.get('#finfant').clear().type(travellersInfants)
  cy.get('.col-md-1 > #flights-search').click()

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