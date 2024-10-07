import OperationResult from '../types/OperationResult'; // Adjust the path as needed
import Lesson from '../models/Lesson'; 
import {ScheduleConflict} from '../types/ScheduleConflict';
import {schedule} from '../models/DataStore';

export function validateLesson(lesson: Lesson): OperationResult<ScheduleConflict | null> {
    // Check for conflicts with existing lessons in the schedule
    for (const existingLesson of schedule) {
        const isSameTime = existingLesson.dayOfWeek === lesson.dayOfWeek && 
                           existingLesson.timeSlot === lesson.timeSlot;
        const isProfessorConflict = existingLesson.professorId === lesson.professorId;
        const isClassroomConflict = existingLesson.classroomNumber === lesson.classroomNumber;

        if (isSameTime && (isProfessorConflict || isClassroomConflict)) {
            return {
                success: false,
                message: "Lesson conflicts with existing schedule.",
                data: {
                    type: isProfessorConflict ? "ProfessorConflict" : "ClassroomConflict",
                    lessonDetails: existingLesson,
                },
            };
        }
    }

    // No conflicts found
    return {
        success: true,
        message: "No conflicts detected.",
        data: null,
    };
}
