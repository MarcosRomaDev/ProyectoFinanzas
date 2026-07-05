import { TransactionService } from "./services/transaction.service.js";
import { TransactionView } from "./components/transaction.view.js";
import { CategoryService } from "./services/category.service.js";
import { CategoryView } from "./components/category.view.js";

let currentOrder = "desc";
let currentCategory = "";
let editingId = null; // id de la transacción en edición (null = creando)

document.addEventListener("DOMContentLoaded", initApp);

async function initApp() {
  try {
    const categories = await CategoryService.fetchCategories();
    CategoryView.renderCategories(categories);
    updateUI();
  } catch (error) {
    console.error("No se pudo arrrancar la aplicación: ", error);
  }
}

// Función centralizadora para refrescar la pantalla
async function updateUI() {
  try {
    const data = await TransactionService.fetchTransactions(
      currentOrder,
      currentCategory,
    );
    TransactionView.renderTable(data, handleDelete, enterEditMode);
    TransactionView.renderSummary(data);
  } catch (error) {
    console.error("Fallo al actualizar UI:", error);
  }
}

// Pasa el formulario a modo edición con los datos de la transacción
function enterEditMode(t) {
  editingId = t.id;
  document.getElementById("descripcion").value = t.description;
  document.getElementById("monto").value = t.amount;
  document.getElementById("tipo").value = t.type;
  document.getElementById("categoria-select").value = t.category.id;
  document.getElementById("fecha").value = t.date;

  document.getElementById("form-titulo").textContent = "Editar transacción";
  document.getElementById("btn-guardar").textContent = "Guardar cambios";
  document.getElementById("btn-cancelar").hidden = false;

  document
    .getElementById("contenedor-formulario")
    .scrollIntoView({ behavior: "smooth", block: "start" });
}

// Vuelve al modo de creación y limpia el formulario
function exitEditMode() {
  editingId = null;
  document.getElementById("transaccion-form").reset();
  document.getElementById("form-titulo").textContent = "Nueva transacción";
  document.getElementById("btn-guardar").textContent = "Guardar transacción";
  document.getElementById("btn-cancelar").hidden = true;
}

document
  .getElementById("btn-cancelar")
  .addEventListener("click", exitEditMode);

async function handleDelete(id) {
  if (confirm("¿Estás seguro de eliminar esta transacción?")) {
    const success = await TransactionService.deleteTransaction(id);
    if (success) await updateUI();
  }
}

// Evento para refrescar los datos manualmente
document.getElementById("btn-actualizar").addEventListener("click", updateUI);

// Evento para filtrar por categoria
document.getElementById("filtro-categoria").addEventListener("change", (e) => {
  console.log("Cambiado filtro categoria a ", e.target.value);
  currentCategory = e.target.value;
  updateUI();
});

// Evento para cambiar el orden (Selector)
document.getElementById("orden-fecha").addEventListener("change", async (e) => {
  currentOrder = e.target.value;
  await updateUI();
});

// Evento para el formulario (Guardar)
document
  .getElementById("transaccion-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
      description: document.getElementById("descripcion").value,
      amount: Number.parseFloat(document.getElementById("monto").value),
      type: document.getElementById("tipo").value,
      date: document.getElementById("fecha").value,
      category: {
        id: Number.parseInt(document.getElementById("categoria-select").value),
      },
    };

    // Si hay una transacción en edición actualizamos; si no, creamos
    const success = editingId
      ? await TransactionService.updateTransaction(editingId, payload)
      : await TransactionService.createTransaction(payload);

    if (success) {
      exitEditMode();
      await updateUI();
    }
  });
