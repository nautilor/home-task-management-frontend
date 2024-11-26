const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export interface Completion {
  id: string;
  user: {
    id: string;
    name: string;
  };
  timestamp: string;
}

export interface Category {
  id?: string;
  name: string;
  color: string;
}

export interface Task {
  id?: string;
  name: string;
  category: Category;
  points: number;
  frequency: string;
  completions?: Completion[];
}

export interface User {
  id: string;
  name: string;
  points: number;
}

export const Api = {
  getTasks: async (categoryId?: string): Promise<Task[]> => {
    const query = categoryId ? `?categoryId=${categoryId}` : "";
    const response = await fetch(`${BACKEND_URL}/tasks${query}`);
    return response.json();
  },

  addTask: async (task: Omit<Task, "id" | "completions">): Promise<Task> => {
    const response = await fetch(`${BACKEND_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    return response.json();
  },

  deleteTask: async (taskId: string): Promise<void> => {
    await fetch(`${BACKEND_URL}/tasks/${taskId}`, { method: "DELETE" });
  },

  getUsers: async (): Promise<User[]> => {
    const response = await fetch(`${BACKEND_URL}/users`);
    return response.json();
  },

  updateUser: async (userId: string, user: Partial<User>): Promise<User> => {
    const response = await fetch(`${BACKEND_URL}/users/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    return response.json();
  },

  getCategories: async (): Promise<Category[]> => {
    const response = await fetch(`${BACKEND_URL}/categories`);
    return response.json();
  },

  addCategory: async (category: Category): Promise<Category> => {
    const response = await fetch(`${BACKEND_URL}/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(category),
    });
    return response.json();
  },

  updateCategory: async (id: string, name: string): Promise<Category> => {
    const response = await fetch(`${BACKEND_URL}/categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    return response.json();
  },

  deleteCategory: async (id: string): Promise<void> => {
    await fetch(`${BACKEND_URL}/categories/${id}`, { method: "DELETE" });
  },

  addCompletion: async (
    taskId: string,
    userId: string,
  ): Promise<Completion> => {
    const response = await fetch(`${BACKEND_URL}/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task: { id: taskId },
        user: { id: userId },
        timestamp: new Date().toISOString(),
      }),
    });
    return response.json();
  },

  deleteCompletion: async (completionId: string): Promise<void> => {
    await fetch(`${BACKEND_URL}/completions/${completionId}`, {
      method: "DELETE",
    });
  },
};
