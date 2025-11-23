

//  CLASES Y POLIMORFISMO
class Producto {
    constructor(id, nombre, precio) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }
}

class Auto extends Producto {
    constructor(id, nombre, precio, imagen) {
        super(id, nombre, precio);
        this.imagen = imagen;
    }
    
    // Método para mostrar información
    obtenerDetalles() {
        return `${this.nombre}`;
    }
}

// USO DE MAPAS 

const inventario = new Map();

inventario.set(1, new Auto(1, "Koenigsegg Jesko", 3000000, "img/jesko.jpg"));
inventario.set(2, new Auto(2, "Bugatti Chiron", 3800000, "img/chiron.jpg"));
inventario.set(3, new Auto(3, "SSC Tuatara", 2000000, "img/tuatara.jpg"));

// Array del carrito
let carrito = [];

// FUNCIONES

// Función activada por el botón "Comprar Ahora"
function agregarProducto(id) {
    const autoSeleccionado = inventario.get(id);
    
    if (autoSeleccionado) {
        carrito.push(autoSeleccionado);
        actualizarCarritoUI();
        alert(`¡Has añadido el ${autoSeleccionado.nombre} al garaje!`);
    } else {
        console.error("Error: Auto no encontrado");
    }
}

// Función Recursiva para calcular el total 
function calcularTotalRecursivo(lista, index = 0) {
    if (index === lista.length) {
        return 0;
    }
    return lista[index].precio + calcularTotalRecursivo(lista, index + 1);
}

// Función para actualizar la visualización del carrito
const actualizarCarritoUI = () => {
    // Referencias
    const contador = document.getElementById('contador-carrito');
    const lista = document.getElementById('lista-carrito');
    const precioTotal = document.getElementById('precio-total');

    //  Actualizar el número en el menú
    contador.textContent = carrito.length;

    // Llenar la lista de la ventana
    lista.innerHTML = ''; // Limpiar lista anterior
    
    carrito.forEach((auto, indice) => {
        const item = document.createElement('li');
        item.textContent = `${indice + 1}. ${auto.obtenerDetalles()} - $${auto.precio.toLocaleString()}`;
        lista.appendChild(item);
    });

    // Calcular total con recursividad
    const total = calcularTotalRecursivo(carrito);
    precioTotal.textContent = total.toLocaleString();
};


// 4. MANEJO DE EVENTOS 
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal-carrito');
    const btnAbrir = document.getElementById('btn-abrir-carrito');
    const btnCerrar = document.querySelector('.cerrar-modal');
    const btnPagar = document.getElementById('btn-pagar');

    // Abrir ventana
    btnAbrir.addEventListener('click', (e) => {
        e.preventDefault(); // Evita que la página salte arriba
        modal.style.display = 'block';
    });

    // Cerrar ventana con la X
    btnCerrar.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Cerrar ventana haciendo clic fuera del cuadro blanco
    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.style.display = 'none';
        }
    });

    // Botón Finalizar Compra 
    btnPagar.addEventListener('click', () => {
        if (carrito.length === 0) {
            alert("Tu garaje está vacío.");
            return;
        }

        const mensaje = document.getElementById('mensaje-final');
        mensaje.textContent = "Procesando pago con el banco...";
        mensaje.style.color = "blue";

        // Temporizador de 2 segundos
        setTimeout(() => {
            mensaje.textContent = "¡Compra Exitosa! Disfruta tus autos.";
            mensaje.style.color = "green";
            carrito = []; // Vaciar carrito
            actualizarCarritoUI();
        }, 2000);
    });
});