import { professors, addProfessor } from '../src/models/DataStore';
import Professor from '../src/models/Professor';

describe('addProfessor', () => {
    beforeEach(() => {
        // Clear the professors array before each test to ensure a clean slate
        professors.length = 0;
    });

    it('should add a professor to the list and return a success message', () => {
        const newProfessor: Professor = {
            id: 1,
            name: "John Doe",
            department: "Mathematics"
        };

        const result = addProfessor(newProfessor);

        // Verify that the professor was added to the professors array
        expect(professors.length).toBe(1);
        expect(professors[0]).toEqual(newProfessor);

        // Verify the returned OperationResult
        expect(result.success).toBe(true);
        expect(result.message).toBe("Professor added successfully.");
        expect(result.data).toEqual(newProfessor);
    });
});
