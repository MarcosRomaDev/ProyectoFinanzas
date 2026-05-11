let graficoGastos = null;
let graficoCategorias = null;

export const TransactionView = {
  // Referencia al cuerpo de la tabla
  tableBody: document.getElementById("transactions-body"),

  renderTable(transactions, onDeleteClick) {
    if (!this.tableBody) return;
    this.tableBody.innerHTML = "";

    transactions.forEach((t) => {
      const isGasto = t.type === "GASTO";
      const row = document.createElement("tr");

      row.innerHTML = `
                <td>${t.description}</td>
                <td class="${isGasto ? "tipo-gasto" : "tipo-ingreso"}">
                    ${isGasto ? "-" : "+"}${t.amount.toFixed(2)}€
                </td>
                <td><span class="badge" style="background-color:${t.category.color}">${t.category.name}</span></td>
                <td>${t.date}</td>
                <td>
                    <button class="btn-borrar" data-id="${t.id}">Eliminar</button>
                </td>
            `;

      // Evento de borrado
      row
        .querySelector(".btn-borrar")
        .addEventListener("click", () => onDeleteClick(t.id));

      this.tableBody.appendChild(row);
    });
  },

  updateGraficoGastos(ingresos, gastos) {
    const ctx = document.getElementById("graficoGastos").getContext("2d");

    // 1. Limpieza: Si el gráfico ya existe, hay que eliminarlo
    if (graficoGastos) {
      graficoGastos.destroy();
    }

    // 2. Creación: Configuramos Chart.js
    graficoGastos = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Ingresos", "Gastos"],
        datasets: [
          {
            data: [ingresos, gastos],
            backgroundColor: ["#2ecc71", "#e74c3c"], // Colores más modernos
            borderWidth: 2,
            hoverOffset: 10,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: { display: true, text: "Gastos / Ingresos" },
          legend: {
            position: "bottom",
          },
        },
      },
    });
  },

  updateGraficoCategorias(categoryData) {
    const ctx = document.getElementById("graficoCategorias").getContext("2d");

    if (graficoCategorias) {
      graficoCategorias.destroy();
    }

    graficoCategorias = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: Object.keys(categoryData),
        datasets: [
          {
            data: Object.values(categoryData),
            backgroundColor: [
              "#3498db",
              "#9b59b6",
              "#f1c40f",
              "#e67e22",
              "#1abc9c",
            ],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: { display: true, text: "Gastos por Categoría" },
          legend: { position: "bottom" },
        },
      },
    });
  },

  renderSummary(transactions) {
    let ingresos = 0;
    let gastos = 0;
    const gastosPorCategoria = {};

    transactions.forEach((t) => {
      if (t.type === "INGRESO") {
        ingresos += t.amount;
      } else {
        gastos += t.amount;

        // Lógica de agrupación:
        const catName = t.category.name;
        if (!gastosPorCategoria[catName]) {
          gastosPorCategoria[catName] = 0;
        }
        gastosPorCategoria[catName] += t.amount;
      }
    });

    const balance = ingresos - gastos;

    // Inyectamos los valores en el HTML
    document.getElementById("total-ingresos").textContent =
      `${ingresos.toFixed(2)}€`;
    document.getElementById("total-gastos").textContent =
      `${gastos.toFixed(2)}€`;
    document.getElementById("total-balance").textContent =
      `${balance.toFixed(2)}€`;

    // Un toque de color extra al balance
    const balanceElement = document.getElementById("total-balance");
    balanceElement.style.color = balance >= 0 ? "#28a745" : "#dc3545";
    // Llamamos al gráfico
    this.updateGraficoGastos(ingresos, gastos);
    this.updateGraficoCategorias(gastosPorCategoria);
  },
};
