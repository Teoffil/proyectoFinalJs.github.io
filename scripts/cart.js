const productoContenedor = document.getElementById('producto-contenedor')

let carrito = []

// Delegación de eventos
productoContenedor.addEventListener('click', (e) => {
    if (e.target.classList.contains('agregar')) {
        validarProductoEnCarrito(e.target.id)
    }
})

const validarProductoEnCarrito = (productoId) => {
    const estaRepetido = carrito.some(producto => producto.id == productoId)

    if (estaRepetido) {
        const producto = carrito.find(producto => producto.id == productoId)
        producto.cantidad++
        const cantidad = document.getElementById(`cantidad${producto.id}`)
        cantidad.innerText = `Cantidad: ${producto.cantidad}`
        actualizarTotalesCarrito(carrito)
    } else {
        const producto = productos.find(producto => producto.id == productoId)
        carrito.push(producto)
        pintarProductoEnCarrito(producto)
        actualizarTotalesCarrito(carrito)
    }
};

const pintarProductoEnCarrito = (producto) => {
    const contenedor = document.getElementById('carrito-contenedor')
    const div = document.createElement('div')
    div.classList.add('productoEnCarrito')
    div.innerHTML = `
        <p>${producto.nombre}</p>
        <p>Precio: ${producto.precio}</p>
        <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
        <button class="btn waves-effect waves-ligth boton-eliminar" value="${producto.id}">X</button>
    `
    contenedor.appendChild(div)
};

const pintarCarrito = (carrito) => {
    const contenedor = document.getElementById('carrito-contenedor')

    contenedor.innerHTML = ''

    carrito.forEach(producto => {
        const div = document.createElement('div')
        div.classList.add('productoEnCarrito')
        div.innerHTML = `
            <p>${producto.nombre}</p>
            <p>Precio: ${producto.precio}</p>
            <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
            <button class="btn waves-effect waves-ligth boton-eliminar" value="${producto.id}">X</button>
        `
        contenedor.appendChild(div)
    });
};

const eliminarProductoCarrito = (productoId) => {
    const index = carrito.findIndex(producto => producto.id == productoId)
    const producto = carrito[index]

    if (producto.cantidad > 1) {
        producto.cantidad -= 1
    } else {
        carrito.splice(index, 1)
    }

    pintarCarrito(carrito)
    actualizarTotalesCarrito(carrito)
    guardarCarritoStorage(carrito)
};

const actualizarTotalesCarrito = (carrito) => {
    const totalCantidad = carrito.reduce((acc, prod) => acc + prod.cantidad, 0)
    const totalCompra = carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0)

    const contadorCarrito = document.getElementById('contador-carrito')
    const precioTotal = document.getElementById('precioTotal')

    contadorCarrito.innerText = totalCantidad
    precioTotal.innerText = totalCompra

    guardarCarritoStorage(carrito)
};

const guardarCarritoStorage = (carrito) => {
    console.log(carrito)
    localStorage.setItem('carrito', JSON.stringify(carrito))
};

const obtenerCarritoStorage = () => {
    const carritoStorage = JSON.parse(localStorage.getItem('carrito'))
    return carritoStorage
};

if (localStorage.getItem('carrito')) {
    carrito = obtenerCarritoStorage()
    pintarCarrito(carrito)
    actualizarTotalesCarrito(carrito)
}



/* ELIMINAR TODO */

const eliminarTodo = () => {
    carrito = []; // Vaciamos el arreglo de carrito
    localStorage.removeItem('carrito'); // Eliminamos el carrito del almacenamiento local
    const contenedor = document.getElementById('carrito-contenedor');
    if (contenedor.children.length === 0) {
        contenedor.innerHTML = '<p>No tienes ningún producto en el carrito</p>';
    } else {
      pintarCarrito(carrito); // Actualizamos el carrito en la vista
      actualizarTotalesCarrito(carrito); // Actualizamos los totales del carrito en la vista
    }
};



/* Mensaje final */

const btnFinalizarCompra = document.getElementById('btn-finalizar-compra');
btnFinalizarCompra.addEventListener('click', finalizarCompra);

function finalizarCompra() {
    const precioTotal = document.getElementById('precioTotal').textContent;
    Swal.fire(
        'Felicitaciones!',
        `Tu compra total es de $${precioTotal}`,
        'Estaremos en contacto!'
    ).then(() => {
        eliminarTodo();
    });
}


