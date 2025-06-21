import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { TaskCategory, TaskPriority } from '../../types';
import { Filter, X } from 'lucide-react';

interface TaskFiltersProps {
  category?: TaskCategory;
  priority?: TaskPriority;
  completed?: boolean;
  onCategoryChange: (category?: TaskCategory) => void;
  onPriorityChange: (priority?: TaskPriority) => void;
  onCompletedChange: (completed?: boolean) => void;
  onClearFilters: () => void;
}

const categories: { value: TaskCategory; label: string }[] = [
  { value: 'work', label: 'Work' },
  { value: 'personal', label: 'Personal' },
  { value: 'learning', label: 'Learning' },
  { value: 'health', label: 'Health' },
  { value: 'finance', label: 'Finance' },
  { value: 'other', label: 'Other' },
];

const priorities: { value: TaskPriority; label: string }[] = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' },
];

export function TaskFilters({
  category,
  priority,
  completed,
  onCategoryChange,
  onPriorityChange,
  onCompletedChange,
  onClearFilters,
}: TaskFiltersProps) {
  const hasActiveFilters = category || priority || completed !== undefined;

  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-muted/50 rounded-lg">
      <div className="flex items-center space-x-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Filters:</span>
      </div>
      
      <Select
        value={category || 'all'}
        onValueChange={(value) => onCategoryChange(value === 'all' ? undefined : value as TaskCategory)}
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((cat) => (
            <SelectItem key={cat.value} value={cat.value}>
              {cat.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Select
        value={priority || 'all'}
        onValueChange={(value) => onPriorityChange(value === 'all' ? undefined : value as TaskPriority)}
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Priorities</SelectItem>
          {priorities.map((prio) => (
            <SelectItem key={prio.value} value={prio.value}>
              {prio.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Select
        value={completed === undefined ? 'all' : completed ? 'completed' : 'pending'}
        onValueChange={(value) => {
          if (value === 'all') {
            onCompletedChange(undefined);
          } else {
            onCompletedChange(value === 'completed');
          }
        }}
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Tasks</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
        </SelectContent>
      </Select>
      
      {hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={onClearFilters}
          className="flex items-center space-x-2"
        >
          <X className="h-4 w-4" />
          <span>Clear</span>
        </Button>
      )}
    </div>
  );
}