// --- CONFIGURACIÓN GLOBAL ---
const API_BASE_URL = 'http://localhost:8080/api';
let currentOrder = 'desc'; // Memoria de la aplicación

// --- 1. CARGA Y RENDERIZADO ---

/**
 * Obtiene las transacciones del servidor con el orden especificado.
 */
async function loadTransactions(direction = 'desc') {
    try {
        currentOrder = direction; // Actualizamos la memoria
        
        // Construimos la URL con los parámetros que espera el Controller de Java
        const url = `${API_BASE_URL}/transactions?sortField=date&direction=${direction}`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        
        const transactions = await response.json();
        renderTable(transactions);

    } catch (error) {
        console.error("Error al cargar transacciones:", error);
        alert("No se pudieron cargar las transacciones. Revisa la conexión con el servidor.");
    }
}

/**
 * Dibuja las filas en la tabla HTML.
 */
function renderTable(transactions) {
    const tbody = document.getElementById('transactions-body');
    if (!tbody) return; // Seguridad si el ID en el HTML cambia
    
    tbody.innerHTML = '';

    transactions.forEach(t => {
        const row = document.createElement('tr');
        const typeClass = t.type === 'GASTO' ? 'tipo-gasto' : 'tipo-ingreso';
        const sign = t.type === 'GASTO' ? '-' : '+';

        row.innerHTML = `
            <td>${t.description}</td>
            <td class="${typeClass}">${sign}${t.amount.toFixed(2)}€</td>
            <td>
                <span class="badge" style="background-color: ${t.category.color}">
                    ${t.category.name}
                </span>
            </td>
            <td>${t.date}</td>
            <td>
                <button class="btn-borrar" onclick="deleteTransaction(${t.id})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

/**
 * Función que se dispara desde el selector <select> del HTML
 */
function changeOrder() {
    const select = document.getElementById('orden-fecha');
    loadTransactions(select.value);
}

// --- 2. GESTIÓN DE CATEGORÍAS ---

async function loadCategories() {
    try {
        const response = await fetch(`${API_BASE_URL}/categories`);
        const categories = await response.json();

        const select = document.getElementById('categoria-select');
        if (!select) return;

        select.innerHTML = '<option value="">-- Selecciona Categoría --</option>';

        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat.id;
            option.textContent = cat.name;
            select.appendChild(option);
        });
    } catch (error) {
        console.error("Error al cargar categorías:", error);
    }
}

// --- 3. OPERACIONES (POST & DELETE) ---

const form = document.getElementById('transaccion-form');
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const transaction = {
        description: document.getElementById('descripcion').value,
        amount: Number.parseFloat(document.getElementById('monto').value),
        type: document.getElementById('tipo').value,
        date: document.getElementById('fecha').value,
        category: {
            id: Number.parseInt(document.getElementById('categoria-select').value)
        }
    };

    await sendTransaction(transaction);
});

async function sendTransaction(payload) {
    try {
        const response = await fetch(`${API_BASE_URL}/transactions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            alert("¡Transacción guardada!");
            form.reset();
            // REFRESCAMOS manteniendo el orden que el usuario tenía puesto
            await loadTransactions(currentOrder); 
        } else {
            alert("Error al guardar: " + response.status);
        }
    } catch (error) {
        console.error("Error de red al enviar:", error);
    }
}

async function deleteTransaction(id) {
    if (!confirm("¿Seguro que quieres eliminar esta transacción?")) return;
    
    try {
        const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            // REFRESCAMOS manteniendo el orden actual
            await loadTransactions(currentOrder);
        } else {
            alert("No se pudo eliminar.");
        }
    } catch (error) {
        console.error("Error al borrar:", error);
    }
}

// --- INICIO DE LA APLICACIÓN ---
loadTransactions(currentOrder);
loadCategories();