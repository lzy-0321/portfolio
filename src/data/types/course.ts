export type CourseType = "AI" | "Database" | "Systems" | "Networks" | "Programming" | "Hardware" | "Design" | "Theory" | "Software Engineering";

export type Course = {
  code: string;
  name: string;
  university: string;
  description: string;
  type: CourseType[];
  link?: string;
  handbookUrl: string;
}; 