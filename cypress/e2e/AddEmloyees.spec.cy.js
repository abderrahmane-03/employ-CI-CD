describe('Employee Form Tests', () => {
    beforeEach(() => {
        // Visit the "Add Employee" or "Edit Employee" page
        cy.visit('/employees/add'); // Replace with the actual route for the form page
    });

    it('should add an employee successfully', () => {
        // Fill out the form with valid data
        cy.get('input[formControlName="name"]').type('John Doe'); // Fill "Name"
        cy.get('input[formControlName="email"]').type('john.doe@example.com'); // Fill "Email"
        cy.get('input[formControlName="hireDate"]').type('2025-01-01'); // Fill "Hire Date"

        // Submit the form
        cy.get('button[type="submit"]').click();

        // Verify redirection or success behavior
        cy.url().should('not.include', '/add'); // Ensure it navigates away from the form page
        cy.contains('John Doe').should('exist'); // Verify the new employee appears in the list
    });

    it('should display validation messages for empty fields', () => {
        // Attempt to trigger validation messages by touching fields
        cy.get('input[formControlName="name"]').focus().blur(); // Focus and blur to trigger validation
        cy.get('input[formControlName="email"]').focus().blur();
        cy.get('input[formControlName="hireDate"]').focus().blur();

        // Check for validation messages
        cy.get('small').contains('Nom est requis').should('be.visible');
        cy.get('small').contains('Email est requis').should('be.visible');
        cy.get('small').contains("Date d'embauche est requise").should('be.visible');
    });


    it('should display an error for invalid email format', () => {
        // Fill out the form with invalid email
        cy.get('input[formControlName="name"]').type('John Doe'); // Fill "Name"
        cy.get('input[formControlName="email"]').type('invalid-email').focus().blur(); // Explicitly focus and blur
        cy.get('input[formControlName="hireDate"]').type('2025-01-01'); // Fill "Hire Date"

        // Check for email format validation message
        cy.get('small').contains("Format de l'email invalide").should('be.visible');
    });

    it('should disable the submit button when the form is invalid', () => {
        // Verify the submit button is disabled initially
        cy.get('button[type="submit"]').should('be.disabled');

        // Fill out the form partially
        cy.get('input[formControlName="name"]').type('John Doe');
        cy.get('input[formControlName="email"]').type('john.doe@example.com');

        // Check that the button is still disabled
        cy.get('button[type="submit"]').should('be.disabled');
    });

    it('should enable the submit button when the form is valid', () => {
        // Fill out the form with valid data
        cy.get('input[formControlName="name"]').type('John Doe');
        cy.get('input[formControlName="email"]').type('john.doe@example.com');
        cy.get('input[formControlName="hireDate"]').type('2025-01-01');

        // Verify the submit button is enabled
        cy.get('button[type="submit"]').should('not.be.disabled');
    });
});