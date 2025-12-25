import React, { useState } from 'react';
import Header from '@/components/Header';
import CategoryCard from '@/components/CategoryCard';
import TaskItem from '@/components/TaskItem';
import AddTask from '@/components/AddTask';
import { useTodoStore } from '@/store/todoStore';
import type { Category, Todo } from '@/types';

/**
 * The main page of the application, displaying the user's tasks.
 *
 * This component serves as the primary interface for the user, showcasing the
 * header, category filters, and the list of tasks. It allows users to filter
 * tasks by category and view their progress.
 *
 * @returns The rendered `HomePage` component.
 */
const HomePage: React.FC = () => {
  const todos = useTodoStore((state) => state.todos);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const editTask = useTodoStore((state) => state.editTask);
  const [activeFilter, setActiveFilter] = useState<'All' | Category>('All');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Todo | null>(null);

  const businessTasks = todos.filter((todo: Todo) => todo.category === 'Business');
  const personalTasks = todos.filter((todo: Todo) => todo.category === 'Personal');
  const filteredTodos =
    activeFilter === 'All'
      ? todos
      : todos.filter((todo: Todo) => todo.category === activeFilter);

  const handleFilterChange = (category: Category) => {
    setActiveFilter((prev) => (prev === category ? 'All' : category));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-white font-sans">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-4 py-12 md:px-6">
        <div className="w-full max-w-3xl rounded-3xl border border-slate-200 bg-white/90 shadow-xl backdrop-blur">
          <div className="px-6 py-8 sm:px-10 sm:py-12">
            <Header />

            <div className="grid grid-cols-1 gap-4 pb-6 md:grid-cols-2 md:gap-5">
              <CategoryCard
                category="Business"
                taskCount={businessTasks.filter((t: Todo) => t.completed).length}
                totalTasks={businessTasks.length}
                color="#4f46e5"
                isActive={activeFilter === 'Business'}
                onSelect={handleFilterChange}
              />
              <CategoryCard
                category="Personal"
                taskCount={personalTasks.filter((t: Todo) => t.completed).length}
                totalTasks={personalTasks.length}
                color="#db2777"
                isActive={activeFilter === 'Personal'}
                onSelect={handleFilterChange}
              />
            </div>

            <div className="space-y-3">
              {filteredTodos.map((todo: Todo) => (
                <TaskItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onEdit={(task: Todo) => {
                    setEditingTask(task);
                    setEditModalOpen(true);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <AddTask />
      {editingTask && editTask && (
        <AddTask
          open={editModalOpen}
          onClose={() => {
            setEditModalOpen(false);
            setEditingTask(null);
          }}
          initialTask={{ text: editingTask.text, category: editingTask.category }}
          mode="edit"
          onSubmitTask={(text, category) => {
            editTask(editingTask.id, { text, category });
            setEditModalOpen(false);
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
};

export default HomePage;
