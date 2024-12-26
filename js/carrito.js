const tablaCompras = document.getElementById('tabla-compras');
const tbody = tablaCompras.querySelector('tbody');

function verCarrito(){

    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
   
    carrito.forEach(producto => {
        const nuevaFila = document.createElement('tr');
        nuevaFila.id = `${producto.id}`;
        nuevaFila.innerHTML = `
        <td > <img src="${producto.imagen}" alt="${producto.nombre}"> </td>
            <td>${producto.nombre}</td>
            <td>${producto.cantidad}</td>
            <td>$${producto.precioUnitario}</td>
            <td>$${producto.precioTotal}</td>
            <td>  <button onclick="btnEditar(${producto.id})">Editar </button>
                  <button onclick="btnEliminar(${producto.id})">Borrar </button>
            </td>
        `;
        producto.precioTotal += producto.precioTotal
        tbody.appendChild(nuevaFila);
       

    });

}
function btnEditar(id){
    console.log("Hizo Click Editar ")
    const myModal = document.getElementById('myModal')
    myModal.style.display = 'block'
    const myInput = document.querySelectorAll('input')
    const filaEditar = document.getElementById(id);

    myInput[0].value = filaEditar.children[1].textContent
    myInput[1].value = filaEditar.children[2].textContent
    xx = filaEditar.children[3].textContent.split('$')
    myInput[2].value = xx[1].trim()
    
    filaEditar.children[4].textContent
    xx = filaEditar.children[4].textContent.split('$')
    myInput[3].value = xx[1].trim()
    
    
    const btnCerrar = document.querySelector('.modal-footer .btn-secondary');

    btnCerrar.addEventListener('click', () => {
        myModal.style.display = 'none';
    });
    
    const btnGuardar = document.querySelector('.modal-footer .btn-primary');
    btnGuardar.id = id
    
    btnGuardar.addEventListener('click', ()=> {
        xx = document.querySelector('.modal-footer .btn-primary');
        id = parseInt(xx.id)
        const nuevaCantidad = parseFloat(document.getElementById('cantidad').value);
        const precio = parseFloat(document.getElementById('precio').value);
        const carritoString = localStorage.getItem('carrito');
        let carrito = JSON.parse(carritoString) || [];
        console.log('guardo cambios', id)

        const indice = carrito.findIndex(producto => producto.id === id);
        if (indice !== -1) {
           
            carrito[indice].cantidad = nuevaCantidad;
            total = nuevaCantidad*precio;
            // Guardar el nuevo total en el carrito o en una variable separada
            carrito[indice].precioTotal = total; // O crear una propiedad total en el carrito
    
            localStorage.setItem('carrito', JSON.stringify(carrito));
        } else {
            console.error('Producto no encontrado en el carrito');
        }
    
        myModal.style.display = 'none';
        tbody.textContent = ''
        verCarrito()
    })
}
function btnEliminar(id) {
    console.log(id)
    let vid =id;
    const filaEliminar = document.getElementById(vid);
    const carritoString = localStorage.getItem('carrito');
    let carrito = JSON.parse(carritoString) || []; 

    const indice = carrito.findIndex(producto => producto.id === id);

    if (indice !== -1) {
        carrito.splice(indice, 1);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        console.log('Producto eliminado correctamente');
    } else {
        console.log('Producto no encontrado en el carrito');
    }

    const tabla = filaEliminar.parentNode;
    tabla.removeChild(filaEliminar);
    // Elimina la fila del padre
    
}









window.onload = verCarrito()