describe('Update Employee', () => {
    beforeEach(() => {
        const employees = [
            { id: 1, name: 'John Doe', email: 'john.doe@example.com', hireDate: '2023-01-01' },
            { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', hireDate: '2023-05-01' }
        ];
        localStorage.setItem('employees', JSON.stringify(employees));
    });

    it('should update an employee successfully', () => {
        cy.visit('/employees');

        // Verify initial employee list
        cy.get('app-employee-card').should('have.length', 2);

        // Navigate to edit page for the first employee
        cy.get('button:contains("Modifier")').eq(0).click();

        // Verify the form is pre-filled with the employee data
        cy.get('input[formControlName="name"]').should('have.value', 'John Doe');
        cy.get('input[formControlName="email"]').should('have.value', 'john.doe@example.com');
        cy.get('input[formControlName="hireDate"]').should('have.value', '2023-01-01');

        // Update the employee data
        cy.get('input[formControlName="name"]').clear().type('John Updated');
        cy.get('input[formControlName="email"]').clear().type('john.updated@example.com');
        cy.get('input[formControlName="hireDate"]').clear().type('2025-01-01');
        cy.get('button[type="submit"]').click();

        // Verify the employee is updated in the list
        cy.visit('/employees');
        cy.get('app-employee-card').first().within(() => {
            cy.contains('John Updated').should('exist');
            cy.contains('john.updated@example.com').should('exist');

            // Verify the formatted hire date in the correct format
            // Adjust the formatted date to match what the dateFormat pipe produces
            cy.contains('01/01/2025').should('exist');
            // Update this based on the actual format
        });

        // Verify the employee data in localStorage
        cy.then(() => {
            const updatedEmployees = JSON.parse(localStorage.getItem('employees'));
            expect(updatedEmployees).to.have.length(2);
            expect(updatedEmployees[0]).to.deep.equal({
                id: 1,
                name: 'John Updated',
                email: 'john.updated@example.com',
                hireDate: '2025-01-01' // Raw date for localStorage
            });
        });
    });

    afterEach(() => {
        localStorage.clear();
    });
});