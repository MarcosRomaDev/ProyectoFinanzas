export const CategoryView = {
  renderCategories(categories) {
    const selectFiltro = document.getElementById("filtro-categoria");
    const selectFormulario = document.getElementById("categoria-select");

    // Función auxiliar para no repetir código para los dos selectores
    const llenarSelect = (selectElement, placeholderText) => {
      // 1. Limpiar el selector
      selectElement.innerHTML = `<option value="">${placeholderText}</option>`;

      // 2. Recorrer e insertar
      categories.forEach((cat) => {
        const option = document.createElement("option");

        // Si tu Java devuelve objetos: cat.name. Si devuelve Strings: cat
        option.value = cat.id || cat;
        option.textContent = cat.name || cat;

        selectElement.appendChild(option);
      });
    };

    // Llenamos ambos desplegables (el de filtrar y el de crear nueva)
    if (selectFiltro) llenarSelect(selectFiltro, "Todas las categorías");
    if (selectFormulario)
      llenarSelect(selectFormulario, "Selecciona categoría...");
  },
};
