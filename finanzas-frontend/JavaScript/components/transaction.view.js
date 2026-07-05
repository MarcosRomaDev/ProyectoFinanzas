let graficoGastos = null;
let graficoCategorias = null;

// Texto oscuro sobre fondos claros y blanco sobre oscuros, para que
// la etiqueta sea legible con cualquier color de categoría
function badgeTextColor(hex) {
  if (!hex) return "#ffffff";
  const n = hex.replace("#", "");
  const r = Number.parseInt(n.substring(0, 2), 16);
  const g = Number.parseInt(n.substring(2, 4), 16);
  const b = Number.parseInt(n.substring(4, 6), 16);
  const luminancia = 0.299 * r + 0.587 * g + 0.114 * b;
  return luminancia > 160 ? "#16181d" : "#ffffff";
}

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
                <td><span class="badge" style="background-color:${t.category.color}; color:${badgeTextColor(t.category.color)}">${t.category.name}</span></td>
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
            backgroundColor: ["#0ca30c", "#d03b3b"],
            borderColor: "#ffffff",
            borderWidth: 2,
            hoverOffset: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "68%",
        plugins: {
          // El título vive en la cabecera de la tarjeta (HTML)
          legend: {
            position: "bottom",
            labels: { usePointStyle: true, boxWidth: 8, padding: 16 },
          },
        },
      },
    });
  },

  updateGraficoCategorias(categoryData, categoryColors = {}) {
    const ctx = document.getElementById("graficoCategorias").getContext("2d");

    if (graficoCategorias) {
      graficoCategorias.destroy();
    }

    // Paleta de reserva por si alguna categoría no trae color
    const fallback = [
      "#2a78d6",
      "#1baf7a",
      "#eda100",
      "#008300",
      "#4a3aa7",
      "#e34948",
      "#e87ba4",
      "#eb6834",
    ];
    const labels = Object.keys(categoryData);

    graficoCategorias = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels,
        datasets: [
          {
            data: Object.values(categoryData),
            // El color sigue a la entidad: mismo color que su badge en la tabla
            backgroundColor: labels.map(
              (name, i) => categoryColors[name] || fallback[i % fallback.length],
            ),
            borderColor: "#ffffff",
            borderWidth: 2,
            hoverOffset: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "68%",
        plugins: {
          // El título vive en la cabecera de la tarjeta (HTML)
          legend: {
            position: "bottom",
            labels: { usePointStyle: true, boxWidth: 8, padding: 16 },
          },
        },
      },
    });
  },

  renderSummary(transactions) {
    let ingresos = 0;
    let gastos = 0;
    const gastosPorCategoria = {};
    const coloresPorCategoria = {};

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
        coloresPorCategoria[catName] = t.category.color;
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
    balanceElement.style.color = balance >= 0 ? "#067647" : "#b42318";
    // Llamamos al gráfico
    this.updateGraficoGastos(ingresos, gastos);
    this.updateGraficoCategorias(gastosPorCategoria, coloresPorCategoria);
  },
};
