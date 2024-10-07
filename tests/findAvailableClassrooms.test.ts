import findAvailableClassrooms from "../src/services/classroomService";
import { classrooms, schedule, professors,addLesson } from '../src/models/DataStore';

describe('findAvailableClassrooms', () => {
    beforeEach(() => {

        // Clear data before each test
        schedule.length = 0;
        classrooms.length = 0;
        professors.length = 0;
        
        // Add classrooms
        classrooms.push({ number: '101', capacity: 30, hasProjector: true });
        classrooms.push({ number: '102', capacity: 20, hasProjector: false });
        classrooms.push({ number: '103', capacity: 25, hasProjector: true });
    });

    it('should return available classrooms for a given time slot and day', () => {
        const timeSlot: TimeSlot = "8:30-10:00";
        const dayOfWeek: DayOfWeek = "Monday";
        const courseTypeFirst: CourseType = "Lecture";
        const courseTypeSecond: CourseType = "Lab";
    
        // Add lessons to occupy classrooms 101 and 102
        addLesson({ courseType: courseTypeFirst, professorId: 1, classroomNumber: '101', dayOfWeek, timeSlot });
        addLesson({ courseType: courseTypeSecond, professorId: 2, classroomNumber: '102', dayOfWeek, timeSlot });
    
        // Call the function and check the result
        const availableClassrooms = findAvailableClassrooms(timeSlot, dayOfWeek);
        expect(availableClassrooms).toEqual(['103']); // Only '103' should be available
    });

    it('should return all classrooms if none are occupied', () => {
        const timeSlot: TimeSlot = "10:15-11:45";
        const dayOfWeek: DayOfWeek = "Tuesday";

        const availableClassrooms = findAvailableClassrooms(timeSlot, dayOfWeek);
        expect(availableClassrooms).toEqual(['101', '102', '103']); // All should be available
    });
});