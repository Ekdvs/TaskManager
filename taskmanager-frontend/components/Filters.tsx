"use client";

interface Props {
  status: string;
  priority: string;
  sortBy: string;
  onFilterChange: (status: string, priority: string) => void;
  onSortChange: (sortBy: string) => void;
}

export default function Filters({ status, priority, sortBy, onFilterChange, onSortChange }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-4 mb-6 bg-white p-4 shadow rounded-lg">
      <select
        value={status}
        onChange={e => onFilterChange(e.target.value, priority)}
        className="border rounded px-3 py-2 text-gray-700"
      >
        <option value="">All Status</option>
        <option value="TODO">To Do</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="DONE">Done</option>
      </select>

      <select
        value={priority}
        onChange={e => onFilterChange(status, e.target.value)}
        className="border rounded px-3 py-2 text-gray-700"
      >
        <option value="">All Priority</option>
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
      </select>

      <select
        value={sortBy}
        onChange={e => onSortChange(e.target.value)}
        className="border rounded px-3 py-2 text-gray-700"
      >
        <option value="dueDate">Sort by Due Date</option>
        <option value="createdAt">Sort by Created</option>
      </select>
    </div>
  );
}