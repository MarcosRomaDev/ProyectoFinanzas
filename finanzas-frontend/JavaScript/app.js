async function cargarTransactions() {
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
                <td>
                    <button class="btn-borrar" onclick="borrarTransaction(${t.id})">
                    Eliminar
                </td>
            `;
            tbody.appendChild(fila);
        });

    } catch (error) {
        console.error("Error al conectar con la API:", error);
        alert("No se pudo conectar con el Backend. ¿Está arrancado Spring?");
    }
}

async function cargarCategorias() {
    try {
        // Consultamos controlador de Java
        const respuesta = await fetch('http://localhost:8080/api/categories');
        const categorias = await respuesta.json();

        const select = document.getElementById('categoria-select');
        
        // Limpiamos el contenido previo
        select.innerHTML = '<option value="">-- Selecciona Categoría --</option>';

        // Recorremos la lista de categorías y creamos etiquetas <option>
        categorias.forEach(cat => {
            const opcion = document.createElement('option');
            opcion.value = cat.id; // El valor que JS mandará a Java es el ID
            opcion.textContent = cat.name; // Lo que el usuario ve es el nombre
            select.appendChild(opcion);
        });
    } catch (error) {
        console.error("Fallo al cargar categorías:", error);
    }
}

const formulario = document.getElementById('transaccion-form');
formulario.addEventListener('submit', async (evento) => {
    evento.preventDefault();
    
    // Creamos el objeto "paquete" para enviarlo a Java
    // El nombre de las propiedades debe coincidir con tus atributos de la Clase Java
    const transaccion = {
        description: document.getElementById('descripcion').value,
        amount: Number.parseFloat(document.getElementById('monto').value),
        type: document.getElementById('tipo').value,
        date: document.getElementById('fecha').value,
        // Como en Java usas un objeto Category, aquí mandamos un objeto con su ID
        category: {
            id: Number.parseInt(document.getElementById('categoria-select').value)
        }
    };

    // Llamamos a la función que enviará este objeto por la red
    await enviarTransaction(transaccion);
});

async function enviarTransaction(objetoDatos) {
    try {
        const respuesta = await fetch('http://localhost:8080/api/transactions', {
            method: 'POST', // Queremos crear un recurso nuevo
            headers: {
                'Content-Type': 'application/json' // Avisamos a Java que enviamos JSON
            },
            body: JSON.stringify(objetoDatos) // Convertimos el objeto JS a texto
        });

        if (respuesta.ok) {
            alert("¡Transacción guardada!");
            formulario.reset(); // Limpia los campos del formulario
            
            // IMPORTANTE: Volvemos a pedir las transacciones al servidor
            // para que la nueva aparezca en la tabla automáticamente.
            await cargarTransactions(); 
        } else {
            // Si el servidor responde con error (ej. 400 o 500)
            const errorDetalle = await respuesta.text();
            console.error("Error del servidor:", errorDetalle);
            alert("No se pudo guardar: " + respuesta.status);
        }
    } catch (error) {
        console.error("Error de red:", error);
        alert("Error de conexión con el servidor.");
    }
}

async function borrarTransaction(id) {
    if(!confirm("¿Seguro que quieres eliminar esta transacción?")) return;
    
    try{
        const respuesta = await fetch(`http://localhost:8080/api/transactions/${id}`, {
             method: 'DELETE'
        });
        if(respuesta.ok){
            await cargarTransactions();
        }else{
            alert("No se pudo eliminar la transacción.");
        }  
    }catch(error){
        console.error("Error al borrar:", error);
    }
}

// Ejecutar al cargar la página
cargarTransactions();
cargarCategorias();