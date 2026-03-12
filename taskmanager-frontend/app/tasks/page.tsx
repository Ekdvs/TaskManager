"use client";

import { useEffect, useState, useCallback } from "react";
import { getTasks } from "@/services/taskService";
import Filters from "@/components/Filters";
import Pagination from "@/components/Pagination";
import { Task } from "@/types/task";
import toast from "react-hot-toast";
import ProtectedRoute from "@/components/ProtectedRoute";
import TaskCard from "@/components/Taskcard";
import TaskFormModal from "@/components/Taskformmodal";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [sortBy, setSortBy] = useState("dueDate");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);

  const loadTasks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getTasks(page, status, priority, sortBy);
      const data = res?.data;
      setTasks(data?.content || []);
      setTotalPages(data?.totalPages || 0);
      setTotalElements(data?.totalElements || 0);
    } catch {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }, [page, status, priority, sortBy]);

  useEffect(() => { loadTasks(); }, [loadTasks]);

  const handleEdit = (task: Task) => { setEditTask(task); setShowModal(true); };
  const handleModalClose = () => { setShowModal(false); setEditTask(null); };
  const handleFilterChange = (s: string, p: string) => { setStatus(s); setPriority(p); setPage(0); };

  const doneTasks = tasks.filter(t => t.status === "DONE").length;
  const inProgTasks = tasks.filter(t => t.status === "IN_PROGRESS").length;
  const todoTasks = tasks.filter(t => t.status === "TODO").length;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        

        <main className="max-w-[1200px] mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">My Tasks</h1>
              <p className="text-gray-500 text-sm mt-1">
                {totalElements > 0 ? `${totalElements} task${totalElements !== 1 ? "s" : ""}` : "No tasks yet"}
              </p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-medium transition"
            >
              + New Task
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Total", value: totalElements, color: "text-blue-500" },
              { label: "To Do", value: todoTasks, color: "text-yellow-500" },
              { label: "In Progress", value: inProgTasks, color: "text-purple-500" },
              { label: "Done", value: doneTasks, color: "text-green-500" },
            ].map(s => (
              <div key={s.label} className="bg-white shadow rounded-lg p-4 text-center">
                <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-gray-400 text-sm">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Filters */}
          <Filters
            status={status}
            priority={priority}
            sortBy={sortBy}
            onFilterChange={handleFilterChange}
            onSortChange={setSortBy}
          />

          {/* Task Grid */}
          {loading ? (
            <div className="text-center py-20 text-gray-400">Loading tasks...</div>
          ) : tasks.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              No tasks found. Create your first task to get started.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {tasks.map(task => (
                <TaskCard key={task.id} task={task} reload={loadTasks} onEdit={handleEdit} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <Pagination page={page} setPage={setPage} totalPages={totalPages} />
          )}
        </main>
      </div>

      {showModal && (
        <TaskFormModal task={editTask} onClose={handleModalClose} reload={loadTasks} />
      )}
    </ProtectedRoute>
  );
}