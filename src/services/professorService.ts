import { schedule, classrooms } from '../models/DataStore';
import Lesson from '../models/Lesson';

function getProfessorSchedule(professorId: number): Lesson[] {
    return schedule.filter((lesson: Lesson) => lesson.professorId === professorId);
}

export default getProfessorSchedule;