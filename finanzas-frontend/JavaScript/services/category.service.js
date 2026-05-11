const API_URL = "http://localhost:8080/api/categories";

export const CategoryService = {
  async fetchCategories() {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error en la cominicación con la API");
    return await response.json();
  },
};
