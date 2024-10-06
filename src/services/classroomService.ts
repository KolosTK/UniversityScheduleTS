import { schedule, classrooms } from '../models/DataStore';

function findAvailableClassrooms(timeSlot: TimeSlot, dayOfWeek: DayOfWeek): string[] {
    const occupiedClassrooms = schedule
        .filter(lesson => lesson.timeSlot === timeSlot && lesson.dayOfWeek === dayOfWeek)
        .map(lesson => lesson.classroomNumber);
    
    return classrooms
        .map(classroom => classroom.number)
        .filter(classroomNumber => !occupiedClassrooms.includes(classroomNumber));
}

export default findAvailableClassrooms;