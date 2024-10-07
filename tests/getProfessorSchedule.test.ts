import { schedule, professors } from '../src/models/DataStore'; // Import the necessary modules
import getProfessorSchedule from '../src/services/professorService'; // Import the function you want to test
import { addProfessor } from '../src/models/DataStore'; // Import addProfessor function
import Lesson from '../src/models/Lesson'; // Import Lesson model

// Clean up the schedule and professors before each test
beforeEach(() => {
    // Resetting the schedule and professors for a clean test environment
    schedule.length = 0; 
    professors.length = 0; 
});

// Test cases
describe('getProfessorSchedule', () => {
    it('should return the correct schedule for a given professor', () => {
        // Create a new professor
        const professor = { id: 1, name: 'Dr. Smith' };
        addProfessor(professor); // Add the professor

        // Add lessons for this professor
        const lesson1 = {
            dayOfWeek: 'Monday' as DayOfWeek,
            timeSlot: '8:30-10:00' as TimeSlot,
            classroomNumber: '101',
            professorId: 1,
            courseType: 'Lab' as CourseType
        };
        const lesson2 = {
            dayOfWeek: 'Monday' as DayOfWeek,
            timeSlot: '10:15-11:45' as TimeSlot,
            classroomNumber: '102',
            professorId: 1,
            courseType: 'Seminar' as CourseType
        };
        const lesson3 = {
            dayOfWeek: 'Tuesday' as DayOfWeek,
            timeSlot: '8:30-10:00' as TimeSlot,
            classroomNumber: '103',
            professorId: 2, // Different professor
            courseType: 'Seminar' as CourseType
        };

        // Add lessons to the schedule
        schedule.push(lesson1);
        schedule.push(lesson2);
        schedule.push(lesson3); // This lesson should not be included in the result

        // Retrieve the professor's schedule
        const professorSchedule = getProfessorSchedule(professor.id);

        // Assert that the professor's schedule contains the correct lessons
        expect(professorSchedule).toEqual([lesson1, lesson2]);
    });

    it('should return an empty array if the professor has no lessons', () => {
        // Create and add a new professor with no lessons
        const professor = { id: 2, name: 'Dr. Johnson' };
        addProfessor(professor);

        // Retrieve the professor's schedule
        const professorSchedule = getProfessorSchedule(professor.id);

        // Assert that the returned schedule is an empty array
        expect(professorSchedule).toEqual([]);
    });
});