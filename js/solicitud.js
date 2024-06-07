document.addEventListener("DOMContentLoaded", function() {
    const frmReclamo = document.getElementById("frm_Reclamo");
    const btnGuardar = document.getElementById("btn_Guardar");

    btnGuardar.addEventListener("click", function(event) {
        event.preventDefault();
        try {
            guardarReclamo().then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Creado con Éxito!",
                    showConfirmButton: false,
                    timer: 1500
                });
                setTimeout(() => {
                    window.location.href = "../index.html";
                }, 2000);
            }).catch(error => {
                Swal.fire({
                    icon: "error",
                    title: "Error al guardar reclamo",
                    text: error.message,
                    showConfirmButton: false,
                    timer: 1500
                });
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error inesperado",
                text: error.message,
                showConfirmButton: false,
                timer: 1500
            });
        }
    });

    async function guardarReclamo() {
        try {
            const nuevoReclamo = {
                id: Date.now(),
                asunto: frmReclamo.querySelector("#inp_Asunto").value,
                mensaje: '\n[ Cliente ]: ' + frmReclamo.querySelector("#inp_Mensaje").value,
                sector: frmReclamo.querySelector("#inp_Sector").value,
                estado: 'Abierto'
            };
            console.log(nuevoReclamo);
            const reclamos = await obtenerReclamos();
            reclamos.push(nuevoReclamo);
            localStorage.setItem("_reclamos", JSON.stringify(reclamos));
        } catch (error) {
            console.error("Error al guardar el reclamo:", error);
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
});