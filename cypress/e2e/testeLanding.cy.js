describe('Entrando no site', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/home');
  });

  context('Verificar componentes tela', () => {
    describe('Verificar se todos os componentes estão presentes no Header', () => {
      it('Verificar Header', () => {
        cy.get('.header').should('exist');
        cy.get('.logo > a > img').should('exist');
        cy.get('.navbar').should('exist');
        cy.get('.moodboard-icon > a').should('exist');
        cy.get('ul > :nth-child(1) > a').should('exist');
        cy.get('ul > :nth-child(2) > a').should('exist');
        cy.get('ul > :nth-child(3) > a').should('exist');
        cy.get('.hero').should('exist')
        cy.get('[style="display: flex; flex-direction: column; min-height: 100vh;"] > :nth-child(3)').should('exist');
        cy.get('.slick-active > :nth-child(1) > .testimonial-box > .testimonial-image').should('visible')
      })
    })
  })
})