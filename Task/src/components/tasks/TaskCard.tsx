import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import { Button } from '../ui/button';
import { Task } from '../../types';
import { Edit2, Trash2, Calendar, Flag } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatDate } from '../../lib/utils';

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const priorityColors = {
  low: 'text-gray-500 bg-gray-100',
  medium: 'text-blue-600 bg-blue-100',
  high: 'text-orange-600 bg-orange-100',
  urgent: 'text-red-600 bg-red-100',
};

const categoryColors = {
  work: 'bg-blue-50 text-blue-700',
  personal: 'bg-green-50 text-green-700',
  learning: 'bg-purple-50 text-purple-700',
  health: 'bg-pink-50 text-pink-700',
  finance: 'bg-yellow-50 text-yellow-700',
  other: 'bg-gray-50 text-gray-700',
};

export function TaskCard({ task, onToggle, onEdit, onDelete }: TaskCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className={`transition-all duration-200 cursor-pointer ${
          task.completed ? 'opacity-75 bg-gray-50' : 'hover:shadow-md'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start space-x-3">
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => onToggle(task.id)}
              className="mt-1"
            />
            <div className="flex-1 min-w-0">
              <h3
                className={`font-medium text-sm leading-relaxed ${
                  task.completed
                    ? 'line-through text-muted-foreground'
                    : 'text-foreground'
                }`}
              >
                {task.title}
              </h3>
              {task.description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {task.description}
                </p>
              )}
            </div>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex space-x-1"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(task);
                  }}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(task.id);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </motion.div>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  categoryColors[task.category]
                }`}
              >
                {task.category}
              </span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${
                  priorityColors[task.priority]
                }`}
              >
                <Flag className="h-3 w-3" />
                <span>{task.priority}</span>
              </span>
            </div>
            
            <div className="flex items-center space-x-2 text-muted-foreground">
              {task.dueDate && (
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(task.dueDate)}</span>
                </div>
              )}
              {task.aiGenerated && (
                <div className="px-1 py-0.5 bg-primary/10 text-primary rounded text-xs">
                  AI
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}