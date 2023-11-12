describe('Flight Search and Booking', () => {

    it('Flight search', () => {
      cy.accessPHPtravelsFligth();
      cy.searchFligths('LHE','DXB','15-11-2023','2','1','1')
    })
  
  })