import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task, TaskCategory, TaskPriority, TaskStats, TaskGenerationRequest } from '../types';
import { generateId } from '../lib/utils';

interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  generateTasks: (request: TaskGenerationRequest) => Promise<Task[]>;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  
  // Getters
  getTasksByCategory: (category: TaskCategory) => Task[];
  getTaskStats: () => TaskStats;
  getFilteredTasks: (filters: { category?: TaskCategory; completed?: boolean; priority?: TaskPriority }) => Task[];
}

// Mock Gemini API call
const mockGeminiAPI = async (topic: string, count: number = 5): Promise<string[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock task generation based on topic
  const taskTemplates: Record<string, string[]> = {
    'Learn Python': [
      'Set up Python development environment',
      'Complete Python basics tutorial on variables and data types',
      'Practice writing functions and control structures',
      'Build a simple calculator project',
      'Learn about Python libraries like NumPy and Pandas'
    ],
    'Fitness': [
      'Create a weekly workout schedule',
      'Track daily water intake and nutrition',
      'Complete 30-minute cardio session',
      'Learn proper form for basic exercises',
      'Set measurable fitness goals for the month'
    ],
    'JavaScript': [
      'Master JavaScript fundamentals and ES6+ features',
      'Build interactive web components with DOM manipulation',
      'Learn asynchronous programming with Promises and async/await',
      'Create a full-stack application with Node.js',
      'Practice algorithmic problem solving with JavaScript'
    ],
    'default': [
      'Research and gather information about the topic',
      'Create a structured learning plan',
      'Practice daily for consistent progress',
      'Join communities or find mentors in the field',
      'Apply knowledge through practical projects'
    ]
  };

  const templates = taskTemplates[topic] || taskTemplates['default'];
  return templates.slice(0, count);
};

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: [],
      isLoading: false,
      error: null,

      generateTasks: async (request: TaskGenerationRequest) => {
        set({ isLoading: true, error: null });
        
        try {
          const taskTitles = await mockGeminiAPI(request.topic, request.count);
          
          const generatedTasks: Task[] = taskTitles.map(title => ({
            id: generateId(),
            title,
            completed: false,
            category: request.category || 'other',
            priority: 'medium',
            createdAt: new Date(),
            updatedAt: new Date(),
            userId: 'current-user',
            aiGenerated: true,
          }));

          set({ isLoading: false });
          return generatedTasks;
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'Failed to generate tasks' 
          });
          return [];
        }
      },

      addTask: (taskData) => {
        const task: Task = {
          ...taskData,
          id: generateId(),
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        
        set(state => ({
          tasks: [...state.tasks, task]
        }));
      },

      updateTask: (id, updates) => {
        set(state => ({
          tasks: state.tasks.map(task =>
            task.id === id
              ? { ...task, ...updates, updatedAt: new Date() }
              : task
          )
        }));
      },

      deleteTask: (id) => {
        set(state => ({
          tasks: state.tasks.filter(task => task.id !== id)
        }));
      },

      toggleTask: (id) => {
        set(state => ({
          tasks: state.tasks.map(task =>
            task.id === id
              ? { ...task, completed: !task.completed, updatedAt: new Date() }
              : task
          )
        }));
      },

      getTasksByCategory: (category) => {
        return get().tasks.filter(task => task.category === category);
      },

      getTaskStats: () => {
        const tasks = get().tasks;
        const total = tasks.length;
        const completed = tasks.filter(task => task.completed).length;
        const pending = total - completed;
        const completionRate = total > 0 ? (completed / total) * 100 : 0;

        return { total, completed, pending, completionRate };
      },

      getFilteredTasks: (filters) => {
        return get().tasks.filter(task => {
          if (filters.category && task.category !== filters.category) return false;
          if (filters.completed !== undefined && task.completed !== filters.completed) return false;
          if (filters.priority && task.priority !== filters.priority) return false;
          return true;
        });
      },
    }),
    {
      name: 'task-storage',
    }
  )
);