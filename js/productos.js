console.log("Buscar Productos");



function Listaproductos(){
    vcard = document.querySelector(".cards-container");
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    URL = ('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a')
    const idDrink = []; tituloURL = []; imagenURL = []; textoURL = []; categoriaURL = [];

    fetch(URL)
        .then(res => res.json())
        .then(data =>{
            for (var i = 0; i < data.drinks.length; i++) {
                idDrink.push(data.drinks[i].idDrink);
                tituloURL.push(data.drinks[i].strDrink)
                imagenURL.push(data.drinks[i].strDrinkThumb)  
                textoURL.push(data.drinks[i].strInstructionsES)
                categoriaURL.push(data.drinks[i].strCategory)
                }
            
            const fragment = document.createDocumentFragment();

            for(x = 0; x < data.drinks.length; x++){
                let vcardHTML =   `<section>
                                        <h3>${tituloURL[x]}</h3>
                                        <div class="imagen">
                                            <img src="${imagenURL[x]}"  alt="${tituloURL[x]}" </img>
                                            <p class="sectexto"> ${textoURL[x]} </p>
                                        </div>
                                        <div class="precio">
                                        Precios: $ <p> ${(Math.random()*1000).toFixed(2) }</p>
                                        </div>
                                
                                        <div class="contador" >
                                            <button id="res${idDrink[x]}" onclick="btnRes(${idDrink[x]})">➖ </button>
                                            <span id="cant${idDrink[x]}">0</span>
                                            <button id="sum${idDrink[x]}" onclick="btnSum(${idDrink[x]})">➕ </button>
                                        </div>
                                        <button type="button" id="${idDrink[x]}" onclick="btnAgregar(${idDrink[x]})" disabled>Agregar</button>
                                    </section>`;

                template = document.createElement('template');
                template.innerHTML = vcardHTML;
                fragment.appendChild(template.content);
                }
                               
            // Insertar el fragmento en el contenedor
            vcard.appendChild(fragment);
        });
       
}


    
function btnAgregar(id){
    prod = document.getElementById(id);
   
    Fprod = prod.parentElement 
    vprod =  Fprod.children[0].textContent
    vimg = Fprod.children[1].children[0].src
    vprecio = Fprod.children[2].children[0].textContent
    vcant = parseInt(Fprod.children[3].children[1].textContent)
    const producto = {
        id: id,
        nombre: vprod,
        imagen: vimg,
        cantidad: vcant,
        precioUnitario: vprecio,
        precioTotal: vcant * vprecio
      };

        
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const indice = carrito.findIndex(item => item.id === producto.id);
    if (indice !== -1) {
        carrito[indice].cantidad = producto.cantidad;
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }else{
        carrito.push(producto);
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

}



function btnSum(id){

    cantidadSpan = document.getElementById('cant'+id);
    cantidadActual = parseInt(cantidadSpan.textContent);
    document.getElementById(id).disabled = false;
    nuevaCantidad = cantidadActual + 1;
    cantidadSpan.textContent = nuevaCantidad;
}

function btnRes(id){
    cantidadSpan = document.getElementById('cant'+id);
    cantidadActual = parseInt(cantidadSpan.textContent);
    if (cantidadActual <= 1){
        document.getElementById(id).disabled = true;
        nuevaCantidad = 0;
        cantidadSpan.textContent = nuevaCantidad;
       /* alert("La Cantidad No puede ser Negativa")*/
    }else{
        nuevaCantidad = cantidadActual - 1;
        cantidadSpan.textContent = nuevaCantidad;
    }
    
}









window.onload = Listaproductos()