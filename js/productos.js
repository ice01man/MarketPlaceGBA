console.log("Buscar Productos");



function Listaproductos(){
    vcard = document.querySelector(".cards-container");

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
                                            <p> ${textoURL[x]} </p>
                                        </div>

                                        <hr /> 
                                        <div class="contador" >
                                            <button id="res${idDrink[x]}" onclick="btnRes(${idDrink[x]})">➖ </button>
                                            <span id="cant${idDrink[x]}">0</span>
                                            <button id="sum${idDrink[x]}" onclick="btnSum(${idDrink[x]})">➕ </button>
                                        </div>
                                        <button type="button" id="${idDrink[x]}" onclick="btnComprar(${idDrink[x]})">Comprar</button>
                                    </section>`;

                template = document.createElement('template');
                template.innerHTML = vcardHTML;
                fragment.appendChild(template.content);
                }
                            
        // Insertar el fragmento en el contenedor
        vcard.appendChild(fragment);
        });
    }
function btnComprar(id){
    const cantidadSpan = document.getElementById('cant'+id);
    console.log(cantidadSpan);
    const cantidadActual = parseInt(cantidadSpan.textContent);
    const nuevaCantidad = cantidadActual + 1;
    cantidadSpan.textContent = nuevaCantidad;

}

function btnSum(id){

    cantidadSpan = document.getElementById('cant'+id);
    cantidadActual = parseInt(cantidadSpan.textContent);
    nuevaCantidad = cantidadActual + 1;
    cantidadSpan.textContent = nuevaCantidad;
}

function btnRes(id){
    cantidadSpan = document.getElementById('cant'+id);
    console.log('Canti Menos '+ cantidadSpan.textContent);
    cantidadActual = parseInt(cantidadSpan.textContent);
    if (cantidadActual <= 0){
        alert("La Cantidad No puede ser Negativa")
        nuevaCantidad = 0;
        cantidadSpan.textContent = nuevaCantidad;
    }else{
        nuevaCantidad = cantidadActual - 1;
        cantidadSpan.textContent = nuevaCantidad;
    }
    
}









window.onload = Listaproductos()