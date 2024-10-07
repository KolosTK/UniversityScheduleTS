import { addLesson } from '../src/models/DataStore'; // Adjust the path as necessary
import { schedule } from '../src/models/DataStore';


describe('addLesson', () => {

    beforeEach(() => {
        schedule.length = 0; // Clear the schedule before each test
    });


    it('should add a lesson when there are no conflicts', () => {
        const timeSlot: TimeSlot = "8:30-10:00";
        const dayOfWeek: DayOfWeek = "Monday";
        const courseType: CourseType = "Lab";
        
        const lesson = {
            dayOfWeek: dayOfWeek,
            timeSlot: timeSlot,
            classroomNumber: '101',
            professorId: 3,
            courseType: courseType
        };

        const result = addLesson(lesson);
        
        expect(result).toEqual({ success: true, message: "Lesson added successfully.", data: lesson });
        expect(schedule).toContainEqual(lesson); // Check if the lesson was added to the schedule
    });

    it('should not add a lesson when there is a conflict with the classroom', () => {
        const timeSlot: TimeSlot = "8:30-10:00";
        const dayOfWeek: DayOfWeek = "Monday";
        const courseType: CourseType = "Lab";

        // Add an existing lesson to create a conflict
        const existingLesson = {
            dayOfWeek: dayOfWeek,
            timeSlot: timeSlot,
            classroomNumber: '101',
            professorId: 4,
            courseType: courseType
        };
        schedule.push(existingLesson);

        // New lesson that conflicts with the existing lesson
        const newLesson = {
            dayOfWeek: dayOfWeek,
            timeSlot: timeSlot,
            classroomNumber: '101', 
            professorId: 4,
            courseType: courseType
        };

        const result = addLesson(newLesson);

        // Assert that the result indicates a conflict
        expect(result).toEqual({ success: false, message: "Lesson conflicts with existing schedule." });
        
       // Check that the new lesson was not added and the schedule remains unchanged
         expect(schedule).toEqual([existingLesson]);
   });
    
    it('should not add a lesson when there is a conflict with the professor', () => {
        const timeSlot: TimeSlot = "8:30-10:00";
        const dayOfWeek: DayOfWeek = "Monday";
        const courseType: CourseType = "Lab";

        // Add an existing lesson to create a conflict
        const existingLesson = {
            dayOfWeek: dayOfWeek,
            timeSlot: timeSlot,
            classroomNumber: '102',
            professorId: 4,
            courseType: courseType
        };
        schedule.push(existingLesson);
        // Same professor as existing lesson
        const newLesson = {
            dayOfWeek: dayOfWeek,
            timeSlot: timeSlot,
            classroomNumber: '101',
            professorId: 4,
            courseType: courseType
        };

        const result = addLesson(newLesson);

        expect(result).toEqual({ success: false, message: "Lesson conflicts with existing schedule." });
        expect(schedule).not.toContainEqual(newLesson); // Check that the new lesson was not added
    });
});