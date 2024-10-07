import Lesson from '../models/Lesson'

export type ScheduleConflict = {
    type: "ProfessorConflict" | "ClassroomConflict";
    lessonDetails: Lesson;
};