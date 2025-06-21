import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Task } from '../../types';
import { Check, X, Plus } from 'lucide-react';

interface TaskPreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tasks: Task[];
  onSaveTasks: () => void;
}

export function TaskPreview({ open, onOpenChange, tasks, onSaveTasks }: TaskPreviewProps) {
  const handleSave = () => {
    onSaveTasks();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Generated Tasks Preview</DialogTitle>
          <DialogDescription>
            Review the AI-generated tasks below. You can save them to your task list.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-3 py-4">
          {tasks.map((task, index) => (
            <Card key={task.id} className="border-l-4 border-l-primary">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-base font-medium">
                      {task.title}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      Category: {task.category} • Priority: {task.priority}
                    </CardDescription>
                  </div>
                  <div className="ml-2 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    #{index + 1}
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
        
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex items-center space-x-2"
          >
            <X className="h-4 w-4" />
            <span>Discard</span>
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            className="flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Save All Tasks</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}