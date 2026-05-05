const API_URL = 'http://localhost:8080/api/transactions';

export const TransactionService = {
    // Obtenemos los datos con el orden deseado
    async fetchTransactions(direction = 'desc') {
        const response = await fetch(`${API_URL}?sortField=date&direction=${direction}`);
        if (!response.ok) throw new Error("Error en la comunicación con la API");
        return await response.json();
    },

    // Enviamos una nueva transacción
    async createTransaction(payload) {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        return response.ok;
    },

    // Borramos por ID
    async deleteTransaction(id) {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        return response.ok;
    }
};