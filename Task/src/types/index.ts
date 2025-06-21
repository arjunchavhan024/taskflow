export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  category: TaskCategory;
  priority: TaskPriority;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  aiGenerated: boolean;
}

export type TaskCategory = 'work' | 'personal' | 'learning' | 'health' | 'finance' | 'other';

export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface TaskGenerationRequest {
  topic: string;
  count: number;
  category?: TaskCategory;
}

export interface TaskStats {
  total: number;
  completed: number;
  pending: number;
  completionRate: number;
}