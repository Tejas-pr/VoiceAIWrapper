export type ProjectStatus = "ACTIVE" | "COMPLETED" | "ON_HOLD";

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  taskCount: number;
  completedTasks: number;
  completionRate: number;
}
