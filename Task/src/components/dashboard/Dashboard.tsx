import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { useTaskStore } from '../../store/taskStore';
import { Task, TaskCategory, TaskPriority } from '../../types';
import { TaskCard } from '../tasks/TaskCard';
import { TaskForm } from '../tasks/TaskForm';
import { TaskGenerationModal } from '../tasks/TaskGenerationModal';
import { TaskPreview } from '../tasks/TaskPreview';
import { StatsCards } from './StatsCards';
import { TaskFilters } from './TaskFilters';
import { Plus, Sparkles, ListTodo } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

export function Dashboard() {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showGenerationModal, setShowGenerationModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [previewTasks, setPreviewTasks] = useState<Task[]>([]);
  
  // Filters
  const [categoryFilter, setCategoryFilter] = useState<TaskCategory | undefined>();
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | undefined>();
  const [completedFilter, setCompletedFilter] = useState<boolean | undefined>();

  const {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    getTaskStats,
    getFilteredTasks,
  } = useTaskStore();

  const stats = getTaskStats();
  const filteredTasks = getFilteredTasks({
    category: categoryFilter,
    priority: priorityFilter,
    completed: completedFilter,
  });

  const handleCreateTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    addTask(taskData);
  };

  const handleEditTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
      setEditingTask(null);
    }
  };

  const handleTasksGenerated = (generatedTasks: Task[]) => {
    setPreviewTasks(generatedTasks);
    setShowPreview(true);
  };

  const handleSaveGeneratedTasks = () => {
    previewTasks.forEach(task => addTask(task));
    setPreviewTasks([]);
  };

  const clearFilters = () => {
    setCategoryFilter(undefined);
    setPriorityFilter(undefined);
    setCompletedFilter(undefined);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 space-y-8">
        {/* Stats Overview */}
        <StatsCards stats={stats} />

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={() => setShowTaskForm(true)}
            className="flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Create Task</span>
          </Button>
          
          <Button
            variant="outline"
            onClick={() => setShowGenerationModal(true)}
            className="flex items-center space-x-2"
          >
            <Sparkles className="h-4 w-4" />
            <span>Generate AI Tasks</span>
          </Button>
        </div>

        {/* Filters */}
        <TaskFilters
          category={categoryFilter}
          priority={priorityFilter}
          completed={completedFilter}
          onCategoryChange={setCategoryFilter}
          onPriorityChange={setPriorityFilter}
          onCompletedChange={setCompletedFilter}
          onClearFilters={clearFilters}
        />

        {/* Tasks List */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <ListTodo className="h-5 w-5" />
              <CardTitle>Your Tasks</CardTitle>
            </div>
            <CardDescription>
              {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredTasks.length === 0 ? (
              <div className="text-center py-12">
                <ListTodo className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground mb-2">
                  No tasks found
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Get started by creating your first task or generating AI-powered tasks.
                </p>
                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                  <Button onClick={() => setShowTaskForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Task
                  </Button>
                  <Button variant="outline" onClick={() => setShowGenerationModal(true)}>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate AI Tasks
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence>
                  {filteredTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onToggle={toggleTask}
                      onEdit={(task) => {
                        setEditingTask(task);
                        setShowTaskForm(true);
                      }}
                      onDelete={deleteTask}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <TaskForm
        open={showTaskForm}
        onOpenChange={(open) => {
          setShowTaskForm(open);
          if (!open) setEditingTask(null);
        }}
        task={editingTask}
        onSubmit={editingTask ? handleEditTask : handleCreateTask}
      />

      <TaskGenerationModal
        open={showGenerationModal}
        onOpenChange={setShowGenerationModal}
        onTasksGenerated={handleTasksGenerated}
      />

      <TaskPreview
        open={showPreview}
        onOpenChange={setShowPreview}
        tasks={previewTasks}
        onSaveTasks={handleSaveGeneratedTasks}
      />
    </div>
  );
}