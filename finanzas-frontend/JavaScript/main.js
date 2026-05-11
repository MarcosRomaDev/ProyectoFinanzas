import { TransactionService } from "./services/transaction.service.js";
import { TransactionView } from "./components/transaction.view.js";
import { CategoryService } from "./services/category.service.js";
import { CategoryView } from "./components/category.view.js";

let currentOrder = "desc";

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
    const data = await TransactionService.fetchTransactions(currentOrder);
    TransactionView.renderTable(data, handleDelete);
    TransactionView.renderSummary(data);
  } catch (error) {
    console.error("Fallo al actualizar UI:", error);
  }
}

async function handleDelete(id) {
  if (confirm("¿Estás seguro de eliminar esta transacción?")) {
    const success = await TransactionService.deleteTransaction(id);
    if (success) await updateUI();
  }
}

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

    const success = await TransactionService.createTransaction(payload);
    if (success) {
      e.target.reset();
      await updateUI();
    }
  });
