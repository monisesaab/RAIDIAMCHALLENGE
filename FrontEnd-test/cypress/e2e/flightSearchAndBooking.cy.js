describe('Flight Search and Booking', () => {

    it('Flight search', () => {
      cy.accessPHPtravelsFligth();
      cy.searchFligths('LHE','DXB','15-11-2023','2','1','1')
      cy.checkTheFlightSearched('LHE','DXB','15-11-2023')
    })
    
    it('Pre-booking while not logged in', () => {
      cy.accessPHPtravelsFligth();
      cy.searchFligths('LHE','DXB','15-11-2023','1','0','0');
      cy.clickButton('Select Flight');
      cy.checkTheFlightSelected('LHE','DXB','economy','Pakistan International Airlines')
    })    

    it('Make the booking while not logged in', () => {
      cy.accessPHPtravelsFligth();
      cy.searchFligths('LHE','DXB','15-11-2023','1','0','0');
      cy.clickButton('Select Flight');
      cy.confirmPassegersDetails('Monise','Saab','123456','monisesaab@gmail.com','34992047203');
      cy.checkBookingPaymentStatus('unpaid');
      cy.checkBookingStatus('pending');
    })
    
  })