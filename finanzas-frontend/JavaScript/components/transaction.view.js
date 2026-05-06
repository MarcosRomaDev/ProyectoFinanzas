export const TransactionView = {
    // Referencia al cuerpo de la tabla
    tableBody: document.getElementById('transactions-body'),

    renderTable(transactions, onDeleteClick) {
        if (!this.tableBody) return;
        
        // LIMPIEZA TOTAL: Esto garantiza que el orden se vea reflejado
        this.tableBody.innerHTML = '';

        transactions.forEach(t => {
            const isGasto = t.type === 'GASTO';
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${t.description}</td>
                <td class="${isGasto ? 'tipo-gasto' : 'tipo-ingreso'}">
                    ${isGasto ? '-' : '+'}${t.amount.toFixed(2)}€
                </td>
                <td><span class="badge" style="background-color:${t.category.color}">${t.category.name}</span></td>
                <td>${t.date}</td>
                <td>
                    <button class="btn-borrar" data-id="${t.id}">Eliminar</button>
                </td>
            `;

            // Evento de borrado
            row.querySelector('.btn-borrar').addEventListener('click', () => onDeleteClick(t.id));
            
            this.tableBody.appendChild(row);
        });
    }
};