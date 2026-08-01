describe('Entrando no site', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/home');
  });

  context('Verificar componentes tela', () => {
    describe('Verificar se todos os componentes estão presentes no Header', () => {
      it('Verificar Header', () => {
        cy.get('header').should('exist');
        cy.get('header img[alt="Logo Iara Noiva"]').should('exist');
        cy.get('header nav').should('exist');
        cy.get('header a[href="/moodboard"]').should('exist');
        cy.get('header nav a[href="/home"]').should('exist');
        cy.get('header nav a[href="/collections"]').should('exist');
        cy.get('header nav a[href="/about"]').should('exist');
        cy.get('[data-testid="hero-section"]').should('exist');
        cy.get('[data-testid="testimonials-section"]').should('exist');
        cy.get('[data-testid="testimonials-section"] .slick-active').should('be.visible').and('not.be.empty');
      })
    })
  })
})
