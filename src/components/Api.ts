const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export interface User {
  id: string;
  name: string;
  points: number;
}

export interface Category {
  id?: string;
  name: string;
  color: string;
  completions?: Completion[];
}

export interface Task {
  id?: string;
  name: string;
  category: Category;
  points: number;
  completions?: Completion[];
}

export interface Completion {
  id: string;
  user: User;
  task: Task;
  timestamp: string;
}

export interface Reward {
  id?: string;
  name: string;
  color: string;
  points: number;
  rewarded: RewardedPoints[];
}

export interface RewardedPoints {
  id: string;
  timestamp: string;
  user: User;
  reward: Reward;
}

export interface FridgeCategory {
  id?: string;
  name: string;
  color: string;
  items?: FridgeItem[];
}

export interface FridgeItem {
  id?: string;
  name: string;
  quantity: number;
  index: number;
  description: string;
  category: FridgeCategory;
}

export interface CustomElement {
  id?: string;
  name: string;
  color: string;
  type: "url";
  action: string;
}

export interface Vegetable {
  id?: string;
  name: string;
  recipes?: Recipe[];
}

export interface Recipe {
  id?: string;
  name: string;
  description?: string;
  extra?: boolean;
  vegetables: Vegetable[];
}

export const Api = {
  getTasks: async (categoryId?: string): Promise<Task[]> => {
    const query = categoryId ? `?categoryId=${categoryId}` : "";
    const response = await fetch(`${BACKEND_URL}/tasks${query}`);
    return response.json();
  },
  getTask: async (taskId: string): Promise<Task> => {
    const response = await fetch(`${BACKEND_URL}/tasks/${taskId}`);
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
    if (response.status !== 200) {
      if (response.status === 400)
        throw new Error("Nome categoria già esistente");
      throw new Error("Errore durante il salvataggio");
    }
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

  getRewards: async (): Promise<Reward[]> => {
    const response = await fetch(`${BACKEND_URL}/rewards`);
    return response.json();
  },

  getReward: async (id: string): Promise<Reward> => {
    const response = await fetch(`${BACKEND_URL}/rewards/${id}`);
    return response.json();
  },

  addReward: async (reward: Reward): Promise<Reward> => {
    const response = await fetch(`${BACKEND_URL}/rewards`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reward),
    });
    if (!response.ok) {
      if (response.status === 400)
        throw new Error("L'utente non ha punti sufficienti");
      throw new Error("Errore durante il salvataggio");
    }

    return response.json();
  },

  updateReward: async (reward: Reward): Promise<Reward> => {
    const response = await fetch(`${BACKEND_URL}/rewards/${reward.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reward),
    });
    if (!response.ok) {
      if (response.status === 400)
        throw new Error("L'utente non ha punti sufficienti");
      throw new Error("Errore durante il salvataggio");
    }

    return response.json();
  },

  deleteReward: async (id: string): Promise<void> => {
    await fetch(`${BACKEND_URL}/rewards/${id}`, { method: "DELETE" });
  },

  addRewardedPoints: async (
    reward: Reward,
    user: User,
  ): Promise<RewardedPoints> => {
    const response = await fetch(`${BACKEND_URL}/rewarded`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reward,
        user,
        timestamp: new Date().toISOString(),
      }),
    });
    if (!response.ok) {
      if (response.status === 400)
        throw new Error("L'utente non ha punti sufficienti");
      throw new Error("Errore durante il salvataggio");
    }
    return response.json();
  },

  deleteRewardedPoints: async (rewardedPointsId: string): Promise<void> => {
    await fetch(`${BACKEND_URL}/rewarded/${rewardedPointsId}`, {
      method: "DELETE",
    });
  },

  addCompletion: async (task: Task, user: User): Promise<Completion> => {
    const response = await fetch(`${BACKEND_URL}/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task,
        user,
        timestamp: new Date().toISOString(),
      }),
    });
    return response.json();
  },

  deleteCompletion: async (completionId: string): Promise<void> => {
    const response = await fetch(`${BACKEND_URL}/completions/${completionId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      if (response.status === 400)
        throw new Error("L'utente non ha punti sufficienti");
      throw new Error("Errore durante il salvataggio");
    }
  },

  getFridgeItems: async (): Promise<FridgeItem[]> => {
    const response = await fetch(`${BACKEND_URL}/fridge/items/`);
    return response.json();
  },

  addFridgeItem: async (item: FridgeItem): Promise<FridgeItem> => {
    const response = await fetch(`${BACKEND_URL}/fridge/items/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    if (!response.ok) {
      throw new Error("Errore durante il salvataggio");
    }
    return response.json();
  },

  updateFridgeItem: async (item: FridgeItem): Promise<FridgeItem> => {
    const response = await fetch(`${BACKEND_URL}/fridge/items/${item.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    return response.json();
  },

  deleteFridgeItem: async (id: string): Promise<void> => {
    await fetch(`${BACKEND_URL}/fridge/items/${id}`, { method: "DELETE" });
  },
  getFridgeCategories: async (): Promise<FridgeCategory[]> => {
    const response = await fetch(`${BACKEND_URL}/fridge/categories`);
    return response.json();
  },
  addFridgeCategory: async (
    category: FridgeCategory,
  ): Promise<FridgeCategory> => {
    const response = await fetch(`${BACKEND_URL}/fridge/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(category),
    });
    if (response.status !== 200) {
      if (response.status === 400)
        throw new Error("Nome categoria già esistente");
      throw new Error("Errore durante il salvataggio");
    }
    return response.json();
  },
  updateFridgeCategory: async (
    id: string,
    name: string,
  ): Promise<FridgeCategory> => {
    const response = await fetch(`${BACKEND_URL}/fridge/categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    return response.json();
  },
  deleteFridgeCategory: async (id: string): Promise<void> => {
    const response = await fetch(`${BACKEND_URL}/fridge/categories/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Errore durante l'eliminazione");
    }
  },
  getCustomElements: async (): Promise<CustomElement[]> => {
    const response = await fetch(`${BACKEND_URL}/elements`);
    return response.json();
  },
  addCustomElement: async (element: CustomElement): Promise<CustomElement> => {
    const response = await fetch(`${BACKEND_URL}/elements`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(element),
    });
    if (!response.ok) {
      throw new Error("Errore durante il salvataggio");
    }
    return response.json();
  },
  updateCustomElement: async (
    element: CustomElement,
  ): Promise<CustomElement> => {
    const response = await fetch(`${BACKEND_URL}/elements/${element.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(element),
    });
    return response.json();
  },
  deleteCustomElement: async (id: string): Promise<void> => {
    const response = await fetch(`${BACKEND_URL}/elements/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Errore durante l'eliminazione");
    }
  },
  getVegetables: async (): Promise<Vegetable[]> => {
    const response = await fetch(`${BACKEND_URL}/vegetables`);
    return response.json();
  },
  getVegetable: async (id: string): Promise<Vegetable> => {
    const response = await fetch(`${BACKEND_URL}/vegetables/${id}`);
    return response.json();
  },
  addVegetable: async (vegetable: Vegetable): Promise<Vegetable> => {
    const response = await fetch(`${BACKEND_URL}/vegetables`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(vegetable),
    });
    if (!response.ok) {
      throw new Error("Errore durante il salvataggio");
    }
    return response.json();
  },
  updateVegetable: async (vegetable: Vegetable): Promise<Vegetable> => {
    const response = await fetch(`${BACKEND_URL}/vegetables/${vegetable.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(vegetable),
    });
    return response.json();
  },
  deleteVegetable: async (id: string): Promise<void> => {
    const response = await fetch(`${BACKEND_URL}/vegetables/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Errore durante l'eliminazione");
    }
  },
  getRecipes: async (): Promise<Recipe[]> => {
    const response = await fetch(`${BACKEND_URL}/recipes`);
    return response.json();
  },
  getRecipe: async (id: string): Promise<Recipe> => {
    const response = await fetch(`${BACKEND_URL}/recipes/${id}`);
    return response.json();
  },
  addRecipe: async (recipe: Recipe): Promise<Recipe> => {
    const response = await fetch(`${BACKEND_URL}/recipes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipe),
    });
    if (!response.ok) {
      throw new Error("Errore durante il salvataggio");
    }
    return response.json();
  },
  updateRecipe: async (recipe: Recipe): Promise<Recipe> => {
    const response = await fetch(`${BACKEND_URL}/recipes/${recipe.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipe),
    });
    return response.json();
  },
  deleteRecipe: async (id: string): Promise<void> => {
    const response = await fetch(`${BACKEND_URL}/recipes/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Errore durante l'eliminazione");
    }
  },
};
