import Professor from './Professor';
import Classroom from './Classroom';
import Course from './Course';
import Lesson from './Lesson';

const professors: Professor[] = [];
const classrooms: Classroom[] = [];
const courses: Course[] = [];
const schedule: Lesson[] = [];

function addProfessor(professor: Professor): void {
    professors.push(professor);
}

function addLesson(lesson: Lesson): boolean {
    // Check for conflicts
    const conflictExists = schedule.some(existingLesson => {
        return existingLesson.dayOfWeek === lesson.dayOfWeek && existingLesson.timeSlot === lesson.timeSlot &&
               (existingLesson.classroomNumber === lesson.classroomNumber || existingLesson.professorId === lesson.professorId);
    });

    if (!conflictExists) {
        schedule.push(lesson); 
        return true; 
    }

    return false;
}

export { professors, classrooms, courses, schedule, addProfessor, addLesson };