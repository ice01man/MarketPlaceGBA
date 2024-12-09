console.log("Buscar Productos");

vcard = document.querySelector(".cards-container");

URL = ('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a')
const tituloURL = [];
const imagenURL = [];
const textoURL = [];
const categoriaURL = [];



fetch(URL)
    .then(res => res.json())
    .then(data =>{
        for (var i = 0; i < data.drinks.length; i++) {
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
                                    <button type="button" id="${tituloURL[x]}">Comprar</button>
                                 </section>`;

            template = document.createElement('template');
            template.innerHTML = vcardHTML;
            fragment.appendChild(template.content);
            }
                           
    // Insertar el fragmento en el contenedor
    vcard.appendChild(fragment);
    });