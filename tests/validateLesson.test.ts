import { validateLesson } from '../src/services/lessonService'; // Adjust the path as needed
import { addLesson } from '../src/models/DataStore'; // Adjust the path as needed
import Lesson from '../src/models/Lesson';
import { schedule } from '../src/models/DataStore'; // Assuming this is where your schedule is defined


// Sample Data for Tests
const initialSchedule = [
    {
        dayOfWeek: 'Monday' as DayOfWeek,
        timeSlot: '09:00-10:00' as TimeSlot,
        professorId: 5,
        classroomNumber: '101',
        courseType: "Lab" as CourseType

    },
    {
        dayOfWeek: 'Monday' as DayOfWeek,
        timeSlot: '10:00-11:00' as TimeSlot,
        professorId: 4,
        classroomNumber: '102',
        courseType: "Lab" as CourseType
    }
];

// This will reset the schedule before each test
beforeEach(() => {
    schedule.length = 0; // Clear the schedule
    initialSchedule.forEach(lesson => schedule.push(lesson)); // Add initial lessons
});

describe('Lesson Validation', () => {
    it('should validate a new lesson with no conflicts', () => {
        const newLesson: Lesson = {
            dayOfWeek: 'Monday' as DayOfWeek,
            timeSlot: '11:00-12:00' as TimeSlot,
            professorId:5,
            classroomNumber: '103',
            courseType: "Lab" as CourseType
        };

        const result = validateLesson(newLesson);
        expect(result.success).toBe(true);
        expect(result.message).toBe("No conflicts detected.");
    });

    it('should detect a professor conflict', () => {
        const newLesson: Lesson = {
            dayOfWeek: 'Monday'  as DayOfWeek,
            timeSlot: '09:00-10:00' as TimeSlot,
            professorId: 7,
            classroomNumber: '104',
            courseType: "Lab" as CourseType
        };
        const conflictingLesson: Lesson = {
            dayOfWeek: 'Monday' as DayOfWeek,
            timeSlot: '09:00-10:00' as TimeSlot,
            professorId: 7,
            classroomNumber: '103',
            courseType: "Lab" as CourseType
    
        };
        addLesson(newLesson);
        const result = validateLesson(conflictingLesson);
        expect(result.success).toBe(false);
        expect(result.message).toBe("Lesson conflicts with existing schedule.");
        expect(result.data?.type).toBe("ProfessorConflict");
    });

    it('should detect a classroom conflict', () => {
        const newLesson: Lesson = {
            dayOfWeek: 'Monday'  as DayOfWeek,
            timeSlot: '09:00-10:00' as TimeSlot,
            professorId: 4,
            classroomNumber: '104',
            courseType: "Lab" as CourseType
        };
        const conflictingLesson: Lesson = {
            dayOfWeek: 'Monday'  as DayOfWeek,
            timeSlot: '09:00-10:00' as TimeSlot,
            professorId: 7,
            classroomNumber: '104',
            courseType: "Lab" as CourseType
        };
        addLesson(newLesson)

        const result = validateLesson(conflictingLesson);
        expect(result.success).toBe(false);
        expect(result.message).toBe("Lesson conflicts with existing schedule.");
        expect(result.data?.type).toBe("ClassroomConflict");
    });

    it('should add a lesson if no conflict exists', () => {
        const newLesson: Lesson = {
            dayOfWeek: 'Monday'  as DayOfWeek,
            timeSlot: '09:00-10:00' as TimeSlot,
            professorId: 4,
            classroomNumber: '103',
            courseType: "Lab" as CourseType
        };
        const conflictingLesson: Lesson = {
            dayOfWeek: 'Monday'  as DayOfWeek,
            timeSlot: '09:00-10:00' as TimeSlot,
            professorId: 7,
            classroomNumber: '104',
            courseType: "Lab" as CourseType
        };
        addLesson(newLesson);

        // const addResult = addLesson(newLesson);
        // expect(addResult.success).toBe(true);
        // expect(addResult.message).toBe("Lesson added successfully.");
        // expect(schedule).toContain(newLesson);

        const result = validateLesson(conflictingLesson);

        expect(result.success).toBe(true);
        expect(result.message).toBe("No conflicts detected.");
        expect(result.data?.type).toBe(undefined);
    });

});
