let currentOrder = 'desc';

async function loadTransactions(direction = 'desc') {
    try {
        // Guardamos el orden actual para que otras funciones lo sepan
        currentOrder = direction;

        // Construimos la URL con los @RequestParam que espera Java
        const url = `http://localhost:8080/api/transactions?sortField=date&direction=${direction}`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network error");
        
        const transactions = await response.json();

        renderTable(transactions);

    } catch (error) {
        console.error("Error al cargar:", error);
    }
}

function renderTable(transactions) {
    const tbody = document.getElementById('tabla-body');
    tbody.innerHTML = '';

    transactions.forEach(transaction => {
        const row = document.createElement('tr');
        const typeClass = transaction.type === 'GASTO' ? 'tipo-gasto' : 'tipo-ingreso';
        const sign = transaction.type === 'GASTO' ? '-' : '+';

        row.innerHTML = `
            <td>${transaction.description}</td>
            <td class="${typeClass}">${sign}${transaction.amount}€</td>
            <td>
                <span class="badge" style="background-color: ${transaction.category.color}">
                    ${transaction.category.name}
                </span>
            </td>
            <td>${transaction.date}</td>
            <td>
                <button class="btn-borrar" onclick="deleteTransaction(${transaction.id})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

async function loadCategories() {
    try {
        const response = await fetch('http://localhost:8080/api/categories');
        const categories = await response.json();

        const select = document.getElementById('categoria-select');
        
        // Clear previous content
        select.innerHTML = '<option value="">-- Selecciona Categoría --</option>';

        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat.id;
            option.textContent = cat.name;
            select.appendChild(option);
        });
    } catch (error) {
        console.error("Failed to load categories:", error);
    }
}

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
        const response = await fetch('http://localhost:8080/api/transactions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            alert("¡Transacción guardada!");
            form.reset();
            await loadTransactions(); 
        } else {
            const errorDetail = await response.text();
            console.error("Server error:", errorDetail);
            alert("No se pudo guardar: " + response.status);
        }
    } catch (error) {
        console.error("Network error:", error);
        alert("Error de conexión con el servidor.");
    }
}

async function deleteTransaction(id) {
    if(!confirm("¿Seguro que quieres eliminar esta transacción?")) return;
    
    try {
        const response = await fetch(`http://localhost:8080/api/transactions/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            await loadTransactions();
        } else {
            alert("No se pudo eliminar la transacción.");
        }
    } catch (error) {
        console.error("Error deleting:", error);
    }
}

loadTransactions();
loadCategories();