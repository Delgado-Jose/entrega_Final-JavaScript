document.addEventListener("DOMContentLoaded", function(event) {
    event.preventDefault();
    try {
        cargarReclamos().catch(error => {
            console.error("Error al cargar reclamos:", error);
            Swal.fire({
                icon: "error",
                title: "Error al cargar reclamos",
                text: error.message,
                showConfirmButton: false,
                timer: 1500
            });
        });
    } catch (error) {
        console.error("Error inesperado:", error);
        Swal.fire({
            icon: "error",
            title: "Error inesperado",
            text: error.message,
            showConfirmButton: false,
            timer: 1500
        });
    }
});

async function cargarReclamos() {
    try {
        const reclamos = await obtenerReclamos();
        const tbody = document.getElementById("reclamos-list");
        tbody.innerHTML = '';
        reclamos.forEach(reclamo => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${reclamo.id}</td>
                <td>${reclamo.asunto}</td>
                <td>${reclamo.sector}</td>
                <td>${reclamo.estado}</td>
                <td><a href="../pages/resolver.html?id=${reclamo.id}">Atender</a></td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error("Error al cargar los reclamos:", error);
        throw error;
    }
}

function obtenerReclamos() {
    return new Promise((resolve, reject) => {
        try {
            let reclamos = JSON.parse(localStorage.getItem("_reclamos"));
            if (!Array.isArray(reclamos)) {
                reclamos = [];
            }
            resolve(reclamos);
        } catch (error) {
            console.error("Error al obtener reclamos:", error);
            reject(error);
        }
    });
}