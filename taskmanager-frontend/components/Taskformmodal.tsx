"use client";

import { useState, useEffect } from "react";
import { createTask, updateTask } from "@/services/taskService";
import { Task, TaskPriority, TaskStatus } from "@/types/task";
import toast from "react-hot-toast";

interface Props {
  task: Task | null;
  onClose: () => void;
  reload: () => void;
}

export default function TaskFormModal({ task, onClose, reload }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("LOW");
  const [status, setStatus] = useState<TaskStatus>("TODO");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
      setStatus(task.status);
      setDueDate(task.dueDate || "");
    } else {
      // reset fields for new task
      setTitle("");
      setDescription("");
      setPriority("LOW");
      setStatus("TODO");
      setDueDate("");
    }
  }, [task]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const taskData = { title, description, priority, status, dueDate };

      if (task) {
        await updateTask(task.id, taskData);
        toast.success("Task updated!");
      } else {
        await createTask(taskData);
        toast.success("Task created!");
      }

      reload();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save task");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          {task ? "Edit Task" : "New Task"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border px-3 py-2 rounded"
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border px-3 py-2 rounded"
            rows={3}
          />
          <div className="flex gap-2">
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
              className="border px-3 py-2 rounded flex-1"
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as TaskStatus)}
              className="border px-3 py-2 rounded flex-1"
            >
              <option value="TODO">To Do</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="DONE">Done</option>
            </select>
          </div>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="border px-3 py-2 rounded"
          />
          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}