

let allPlaces = [];
function searchCondition() {

    const palabraClave = document.getElementById('palabraClave').value.toLowerCase();
    const report = document.getElementById('result');
    report.innerHTML = '';

    fetch('./travel_recommendation_api.json')

        .then(response => response.json())
        .then(data => {
            const cities = data.countries.flatMap(country => country.cities);
            const temples = data.temples;
            const beaches = data.beaches;

            allPlaces = [...cities, ...temples, ...beaches];


            const conticion = allPlaces.filter(item => item.name.toLowerCase().includes(palabraClave)
                || item.description.toLowerCase().includes(palabraClave));

            conticion.forEach(item => {


                const div = document.createElement('div');
                div.classList.add('cities');
                const options = { timeZone: `${item.name}`, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
                //const time = new Date().toLocaleTimeString('en-US', options);
                
                div.innerHTML = `<img src="${item.imageUrl}" alt=contrie ${width = 200} ></img>
                        <h5><strong>Ciudad:</strong> ${item.name}  </h5>
                        <p><strong>Descripcion:</strong> ${item.description}</p>
                        <button id="visit">Visitar</button>`;
                report.appendChild(div);



            });


        })
        .catch(error => {
            console.error('error', error);
            report.innerHTML = 'An error occurred while fetching data.';

        });
    document.getElementById('palabraClave').value = "";
}

function limpiar() {
    document.getElementById('result').innerHTML = "";
    document.getElementById('palabraClave').value = "";


}
function enviarComent(){
    alert("Su comentario fue enviado con exito!")
    document.getElementById('name').value="";
    document.getElementById('email').value="";
    document.getElementById('mensaje').value="";
}

document.addEventListener("DOMContentLoaded", function () {
    const eliminarBtn = document.getElementById('limpiarBusque');
    if (eliminarBtn) {
        eliminarBtn.addEventListener("click", limpiar);
    } else {
        console.error("El botón con id 'limpiarBusque' no existe en el DOM.");
    }
});

document.addEventListener("DOMContentLoaded",function(){
    const enviarComen= document.getElementById('submit');
    if(enviarComen){
        enviarComen.addEventListener("click", enviarComent);
    }else{
        console.error("El botón con id 'submit' no existe en el DOM.");
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const buscarBtn = document.getElementById('buscarDesti');
    if (buscarBtn) {
        buscarBtn.addEventListener("click", searchCondition);
    } else {
        console.error("El botón con id 'buscarDesti' no existe en el DOM.");
    }
});
