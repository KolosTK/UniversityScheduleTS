import Professor from './Professor';
import Classroom from './Classroom';
import Course from './Course';
import Lesson from './Lesson';
import OperationResult from '../types/OperationResult';

const professors: Professor[] = [];
const classrooms: Classroom[] = [];
const courses: Course[] = [];
const schedule: Lesson[] = [];

function addProfessor(professor: Professor): OperationResult<Professor> {
    professors.push(professor);
    return { success: true, message: "Professor added successfully.", data: professor };
}

function addLesson(lesson: Lesson): OperationResult<Lesson> {
    // Check for conflicts
    const conflictExists = schedule.some(existingLesson => {
        return existingLesson.dayOfWeek === lesson.dayOfWeek && 
               existingLesson.timeSlot === lesson.timeSlot &&
               (existingLesson.classroomNumber === lesson.classroomNumber || existingLesson.professorId === lesson.professorId);
    });

    // If a conflict exists, do not add the lesson to the schedule
    if (conflictExists) {
        return { success: false, message: "Lesson conflicts with existing schedule." };
    }

    // No conflict, add the lesson to the schedule
    schedule.push(lesson);
    return { success: true, message: "Lesson added successfully.", data: lesson };
}



export { professors, classrooms, courses, schedule, addProfessor, addLesson };