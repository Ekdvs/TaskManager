"use client";

import { Task } from "@/types/task";
import { markTaskDone, deleteTask } from "@/services/taskService";
import toast from "react-hot-toast";

interface Props {
  task: Task;
  reload: () => void;
  onEdit: (task: Task) => void;
}

export default function TaskCard({ task, reload, onEdit }: Props) {
  const handleDone = async () => {
    try {
      await markTaskDone(task.id);
      toast.success("Task marked done!");
      reload();
    } catch {
      toast.error("Failed to update task");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    try {
      await deleteTask(task.id);
      toast.success("Task deleted!");
      reload();
    } catch {
      toast.error("Failed to delete task");
    }
  };

  const statusColors: Record<string, string> = {
    TODO: "bg-yellow-100 text-yellow-800",
    IN_PROGRESS: "bg-purple-100 text-purple-800",
    DONE: "bg-green-100 text-green-800",
  };

  const priorityColors: Record<string, string> = {
    LOW: "bg-blue-100 text-blue-800",
    MEDIUM: "bg-orange-100 text-orange-800",
    HIGH: "bg-red-100 text-red-800",
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 flex flex-col justify-between hover:shadow-md transition">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
        <p className="text-gray-500 text-sm mt-1">{task.description}</p>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-2">
          <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[task.status]}`}>
            {task.status.replace("_", " ")}
          </span>
          <span className={`px-2 py-1 rounded text-xs font-medium ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
        </div>

        <div className="flex gap-2">
          {task.status !== "DONE" && (
            <button
              onClick={handleDone}
              className="px-2 py-1 text-white bg-green-500 rounded hover:bg-green-600 text-xs"
            >
              Done
            </button>
          )}
          <button
            onClick={() => onEdit(task)}
            className="px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600 text-xs"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600 text-xs"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}