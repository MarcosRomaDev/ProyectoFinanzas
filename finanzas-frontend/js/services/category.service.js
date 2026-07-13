const API_URL = "https://proyectofinanzas-x5wl.onrender.com/api/categories";

export const CategoryService = {
  async fetchCategories() {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error en la cominicación con la API");
    return await response.json();
  },
};
