import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { useTaskStore } from '../../store/taskStore';
import { TaskCategory } from '../../types';
import { Loader2, Sparkles } from 'lucide-react';

interface TaskGenerationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTasksGenerated: (tasks: any[]) => void;
}

const categories: { value: TaskCategory; label: string }[] = [
  { value: 'work', label: 'Work' },
  { value: 'personal', label: 'Personal' },
  { value: 'learning', label: 'Learning' },
  { value: 'health', label: 'Health' },
  { value: 'finance', label: 'Finance' },
  { value: 'other', label: 'Other' },
];

export function TaskGenerationModal({ open, onOpenChange, onTasksGenerated }: TaskGenerationModalProps) {
  const [topic, setTopic] = useState('');
  const [category, setCategory] = useState<TaskCategory>('other');
  const [count, setCount] = useState(5);
  
  const { generateTasks, isLoading } = useTaskStore();

  const handleGenerate = async () => {
    if (!topic.trim()) return;

    const tasks = await generateTasks({
      topic: topic.trim(),
      count,
      category,
    });

    if (tasks.length > 0) {
      onTasksGenerated(tasks);
      onOpenChange(false);
      setTopic('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span>Generate AI Tasks</span>
          </DialogTitle>
          <DialogDescription>
            Enter a topic and let AI generate personalized tasks for you.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="topic">Topic</Label>
            <Input
              id="topic"
              placeholder="e.g., Learn Python, Fitness Goals, Project Planning"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={(value: TaskCategory) => setCategory(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="count">Number of Tasks</Label>
            <Select value={count.toString()} onValueChange={(value) => setCount(parseInt(value))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">3 tasks</SelectItem>
                <SelectItem value="5">5 tasks</SelectItem>
                <SelectItem value="7">7 tasks</SelectItem>
                <SelectItem value="10">10 tasks</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleGenerate}
            disabled={!topic.trim() || isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Generate Tasks
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}