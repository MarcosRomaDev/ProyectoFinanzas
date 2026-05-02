async function cargarTransacciones() {
    try {
        // Llamada a tu endpoint de Spring
        const respuesta = await fetch('http://localhost:8080/api/transactions');
        
        if (!respuesta.ok) {
            throw new Error("Error en la respuesta del servidor");
        }

        const transacciones = await respuesta.json();
        const tbody = document.getElementById('tabla-body');
        
        // Limpiamos la tabla antes de cargar
        tbody.innerHTML = '';

        transacciones.forEach(t => {
            const fila = document.createElement('tr');
            
            // Elegimos clase CSS según el tipo
            const claseTipo = t.type === 'GASTO' ? 'tipo-gasto' : 'tipo-ingreso';
            const signo = t.type === 'GASTO' ? '-' : '+';

            fila.innerHTML = `
                <td>${t.description}</td>
                <td class="${claseTipo}">${signo}${t.amount}€</td>
                <td>
                    <span class="badge" style="background-color: ${t.category.color}">
                        ${t.category.name}
                    </span>
                </td>
                <td>${t.date}</td>
            `;
            tbody.appendChild(fila);
        });

    } catch (error) {
        console.error("Error al conectar con la API:", error);
        alert("No se pudo conectar con el Backend. ¿Está arrancado Spring?");
    }
}

// Ejecutar al cargar la página
cargarTransacciones();