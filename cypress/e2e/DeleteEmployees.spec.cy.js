describe('Delete Employee', () => {
    beforeEach(() => {
        const employees = [
            { id: 1, name: 'John Doe', email: 'john.doe@example.com', hireDate: '2023-01-01' },
            { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', hireDate: '2023-05-01' }
        ];
        localStorage.setItem('employees', JSON.stringify(employees));
    });

    it('should delete an employee successfully', () => {
        cy.visit('/employees');

        // Verify initial employee list
        cy.get('app-employee-card').should('have.length', 2);

        // Click the delete button for the first employee (using index)
        cy.get('button:contains("Supprimer")').eq(0).click();

        // Verify employee count after deletion
        cy.get('app-employee-card').should('have.length', 1);

        // Verify the remaining employee
        cy.then(() => {
            const updatedEmployees = JSON.parse(localStorage.getItem('employees'));
            expect(updatedEmployees).to.have.length(1);
            expect(updatedEmployees[0].id).to.equal(2);
        });
    });

    afterEach(() => {
        localStorage.clear();
    });
});