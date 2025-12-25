import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Todo } from '@/types';

/**
 * Represents the state and actions for managing todos.
 *
 * @property {Todo[]} todos - The list of todo items.
 * @property {(text: string, category: 'Business' | 'Personal') => void} addTodo - Adds a new todo to the list.
 * @property {(id: number) => void} toggleTodo - Toggles the completion status of a todo.
 * @property {(id: number) => void} deleteTodo - Deletes a todo from the list.
 */
type TodoStore = {
  todos: Todo[];
  addTodo: (text: string, category: 'Business' | 'Personal') => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  editTask: (id: number, updated: Partial<Omit<Todo, 'id'>>) => void;
};

/**
 * A custom Zustand store for managing the application's todo list.
 *
 * This store provides state and actions for adding, toggling, and deleting todos.
 * It also uses the `persist` middleware to save the state to local storage,
 * ensuring that the data is not lost on page refresh.
 *
 * @returns An object containing the `todos` array and actions to modify it.
 */
export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],
      addTodo: (text, category) =>
        set((state) => ({
          todos: [
            ...state.todos,
            { id: Date.now(), text, completed: false, category },
          ],
        })),
      toggleTodo: (id) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        }));
      },
      deleteTodo: (id) => {
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        }));
      },
      editTask: (id: number, updated: Partial<Omit<Todo, 'id'>>) => {
        set((state) => ({
          todos: state.todos.map((t) =>
            t.id === id ? { ...t, ...updated } : t
          ),
        }));
      },
    }),
    {
      name: 'todo-storage',
    }
  )
);