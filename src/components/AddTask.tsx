import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Plus, X } from 'lucide-react';
import { useTodoStore } from '@/store/todoStore';
import type { Category } from '@/types';

/**
 * A component that provides a button to add a new task.
 *
 * This component renders a floating action button that, when clicked, opens a modal
 * dialog to add a new task. The modal contains a form to enter the task details,
 * including the task name and category.
 *
 * @returns The rendered `AddTask` component.
 */
type AddTaskProps = {
  open?: boolean;
  onClose?: () => void;
  initialTask?: { text: string; category: Category };
  onSubmitTask?: (text: string, category: Category) => void;
  mode?: 'add' | 'edit';
};

const AddTask: React.FC<AddTaskProps> = ({
  open,
  onClose,
  initialTask,
  onSubmitTask,
  mode = 'add',
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [taskText, setTaskText] = useState<string>(initialTask?.text || '');
  const [taskCategory, setTaskCategory] = useState<Category>( initialTask?.category || 'Personal');
  const { addTodo } = useTodoStore();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const isValidTask = useMemo(() => taskText.trim().length > 0, [taskText]);

  useEffect(() => {
    if (!(open ?? modalOpen) || typeof document === 'undefined') {
      return undefined;
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (onClose) onClose();
        else setModalOpen(false);
      }
    };
    const focusTimeout = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 75);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(focusTimeout);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, modalOpen, onClose]);

  const handleSubmit = () => {
    if (!isValidTask) return;
    if (onSubmitTask) {
      onSubmitTask(taskText.trim(), taskCategory);
    } else {
      addTodo(taskText.trim(), taskCategory);
    }
    setTaskText('');
    setTaskCategory('Personal');
    if (onClose) onClose();
    else setModalOpen(false);
  };

  const renderModal = () => {
    if (!(open ?? modalOpen) || typeof document === 'undefined') {
      return null;
    }

    return createPortal(
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-task-title"
        onClick={() => setModalOpen(false)}
      >
        <div
          className="w-full max-w-lg translate-y-0 rounded-3xl bg-white p-6 shadow-2xl transition md:p-7"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 id="add-task-title" className="mt-1 text-2xl font-semibold text-slate-800">
                {mode === 'edit' ? 'Edit task' : 'Add a new task'}
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                {mode === 'edit'
                  ? 'Update the details and save your changes.'
                  : 'Write what you need to do and choose where it belongs. You can update it anytime.'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              aria-label="Close add task dialog"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit();
            }}
            className="mt-6 space-y-4"
          >
            <div>
              <label htmlFor="task-title" className="text-sm font-medium text-slate-600">
                Task name
              </label>
              <input
                id="task-title"
                ref={inputRef}
                type="text"
                value={taskText}
                onChange={(event) => setTaskText(event.target.value)}
                placeholder="e.g. Prepare project update"
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-800 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </div>

            <div>
              <label htmlFor="task-category" className="text-sm font-medium text-slate-600">
                Category
              </label>
              <div className="relative mt-2">
                <select
                  id="task-category"
                  value={taskCategory}
                  onChange={(event) => setTaskCategory(event.target.value as Category)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-700 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                >
                  <option value="Personal">Personal</option>
                  <option value="Business">Business</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.135l3.71-3.905a.75.75 0 011.08 1.04l-4.24 4.47a.75.75 0 01-1.08 0l-4.25-4.47a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose ? onClose : () => setModalOpen(false)}
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isValidTask}
                className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-300"
              >
                {mode === 'edit' ? 'Save changes' : 'Add a task'}
              </button>
            </div>
          </form>
        </div>
      </div>,
      document.body
    );
  };

  // If used as a floating button (add mode, no open prop), render button and modal
  if (typeof open === 'undefined') {
    return (
      <>
        <button
          onClick={() => setModalOpen(true)}
          className="fixed bottom-6 right-6 rounded-full bg-indigo-600 p-3 text-white shadow-lg transition hover:bg-indigo-700 sm:bottom-8 sm:right-8 sm:p-4 md:bottom-10 md:right-10"
          aria-label="Add task"
        >
          <Plus className="h-6 w-6 sm:h-7 sm:w-7" />
        </button>
        {renderModal()}
      </>
    );
  }
  // If controlled (edit mode), just render modal
  return <>{renderModal()}</>;
};

export default AddTask;
