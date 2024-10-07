import Lesson from "../models/Lesson"

function validateLesson(lesson: Lesson): ScheduleConflict | null {
    // Check for conflicts with other lessons in the schedule
    for (const existingLesson of schedule) {
      // Check if the professor is the same and the time slot overlaps
      if (existingLesson.professorId === lesson.professorId &&
          existingLesson.dayOfWeek === lesson.dayOfWeek &&
          existingLesson.timeSlot === lesson.timeSlot) {
        return {
          type: "ProfessorConflict",
          lessonDetails: existingLesson,
        };
      }
  
      // Check if the classroom is the same and the time slot overlaps
      if (existingLesson.classroomNumber === lesson.classroomNumber &&
          existingLesson.dayOfWeek === lesson.dayOfWeek &&
          existingLesson.timeSlot === lesson.timeSlot) {
        return {
          type: "ClassroomConflict",
          lessonDetails: existingLesson,
        };
      }
    }
  
    // No conflicts found
    return null;
  }