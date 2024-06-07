document.addEventListener("DOMContentLoaded", async function() {
    try {
        const id = new URLSearchParams(window.location.search).get('id');
        if (!id) {
            throw new Error("ID no especificado en la URL");
        }
        const reclamo = await obtenerReclamoPorId(id);
        if (reclamo) {
            document.getElementById("reclamo-detalle").innerHTML = `
                <p><strong>ID: </strong>${reclamo.id}</p>
                <p><strong>Asunto: </strong>${reclamo.asunto}</p>
                <p><strong>Mensaje: </strong>${reclamo.mensaje.replace(/\n/g, '<br>')}</p>
                <p><strong>Sector: </strong>${reclamo.sector}</p>
                <p><strong>Estado: </strong>${reclamo.estado}</p>
            `;
        } else {
            throw new Error("Reclamo no encontrado");
        }
    } catch (error) {
        console.error("Error al cargar el reclamo:", error);
        Swal.fire({
            icon: "error",
            title: "Error al cargar el reclamo",
            text: error.message,
            showConfirmButton: false,
            timer: 1500
        });
    }

    document.getElementById("resolver-form").addEventListener('submit', async function(event) {
        event.preventDefault();
        try {
            const id = new URLSearchParams(window.location.search).get('id');
            const reclamo = await obtenerReclamoPorId(id);
            if (!reclamo) {
                throw new Error("Reclamo no encontrado");
            }
            reclamo.estado = event.target.estado.value;
            reclamo.mensaje += '\n[ Administrador ]: ' + event.target.respuesta.value;
            await actualizarReclamo(reclamo);
            Swal.fire({
                icon: "success",
                title: "Reclamo Actualizado!",
                showConfirmButton: false,
                timer: 1500
            });
            setTimeout(() => {
                window.location.href = "../pages/lista.html";
            }, 2000);
        } catch (error) {
            console.error("Error al actualizar el reclamo:", error);
            Swal.fire({
                icon: "error",
                title: "Error al actualizar el reclamo",
                text: error.message,
                showConfirmButton: false,
                timer: 1500
            });
        }
    });
});

async function obtenerReclamoPorId(id) {
    try {
        const reclamos = await obtenerReclamos();
        return reclamos.find(r => r.id == id);
    } catch (error) {
        console.error("Error al obtener el reclamo por ID:", error);
        throw error;
    }
}

async function actualizarReclamo(actualizar) {
    try {
        let reclamos = await obtenerReclamos();
        reclamos = reclamos.map(reclamo => reclamo.id == actualizar.id ? actualizar : reclamo);
        localStorage.setItem('_reclamos', JSON.stringify(reclamos));
    } catch (error) {
        console.error("Error al actualizar el reclamo:", error);
        throw error;
    }
}

function obtenerReclamos() {
    return new Promise((resolve, reject) => {
        try {
            let reclamos = JSON.parse(localStorage.getItem('_reclamos'));
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


/*import Swal from 'sweetalert2'

// or via CommonJS
const Swal = require('sweetalert2')

document.addEventListener("DOMContentLoaded",async function(){
    const btnVolver = this.getElementById("")
    const id = new URLSearchParams(window.location.search).get('id');
    const reclamo = await obtenerReclamoPorId(id);
    if(reclamo){
        document.getElementById("reclamo-detalle").innerHTML=`
            <p><strong>ID: </strong>${reclamo.id}</p>
            <p><strong>Asunto: </strong>${reclamo.asunto}</p>
            <p><strong>Mensaje: </strong>${reclamo.mensaje.replace(/\n/g, '<br>')}</p>
            <p><strong>Sector: </strong>${reclamo.sector}</p>
            <p><strong>Estado: </strong>${reclamo.estado}</p>
        
        `;
    }
    document.getElementById("resolver-form").addEventListener('submit',async function(event){
        event.preventDefault();
        try{
            reclamo.estado = event.target.estado.value;
            reclamo.mensaje += '\n [ Administrador ]: ' + event.target.respuesta.value;
            await actualizarReclamo(reclamo);
            Swal.fire({
                icon: "success",
                title: "Reclamo Actualizado!",
                showConfirmButton: false,
                timer: 1500
            });
        }catch(error){
            Swal.fire({
                icon: "error",
                title: error,
                showConfirmButton: false,
                timer: 1500
            });
        }
        setTimeout(() => {
            window.location.href = "../pages/lista.html"            
        }, 2000);
    })
});

async function obtenerReclamoPorId(id){
    const reclamos = await obtenerReclamos();
    return reclamos.find(r=>r.id == id);
}

async function actualizarReclamo(actualizar) {
    let reclamos = await obtenerReclamos();
    reclamos = reclamos.map(reclamo => reclamo.id == actualizar.id ? actualizar : reclamo);
    localStorage.setItem('_reclamos',JSON.stringify(reclamos));
}

function obtenerReclamos(){
    return new Promise((resolve)=>{
        const reclamos = JSON.parse(localStorage.getItem('_reclamos'));
        resolve(reclamos);
    });
}*/