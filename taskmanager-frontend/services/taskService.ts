import API from "./api";
import { Task } from "@/types/task";

export const getTasks = async (
  page: number,
  status?: string,
  priority?: string,
  sortBy: string = "dueDate"
) => {
  let url = `/tasks/getall?page=${page}&size=9&sortBy=${sortBy}`;
  if (status) url += `&status=${status}`;
  if (priority) url += `&priority=${priority}`;
  const res = await API.get(url);
  return res.data;
};

export const createTask = async (data: Task) => {
  const res = await API.post("/tasks/create", data);
  return res.data;
};

export const updateTask = async (id: number, data: Task) => {
  const res = await API.put(`/tasks/update/${id}`, data);
  return res.data;
};

export const deleteTask = async (id: number) => {
  const res = await API.delete(`/tasks/delete/${id}`);
  return res.data;
};

export const markTaskDone = async (id: number) => {
  const res = await API.put(`/tasks/mark/${id}/done`);
  return res.data;
};