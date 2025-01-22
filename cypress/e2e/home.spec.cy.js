describe('Home Page Test', () => {
    it('should display the welcome message', () => {
        cy.visit('/');
        cy.contains('Liste des employés'); // Replace "Welcome to My App" with your app'

    });
});