"use strict";

var musicas = [];

function criarMusicaFactory(id, titulo) {
    return {
        id: id,
        titulo: titulo,
    };

}

function renderizaMusica(musica, indice) {
    return ` <div class="btn-video__wrapper">
    <button type="button" class="btn-video__title" data-musica-codigo="${musica.id}">
        ${musica.titulo}
    </button>
    <button type="button" data-music-indice="${indice}" class="btn-video__remove" title="Remover vídeo">
        <i class="fa fa-times"></i>
    </button>
</div>
`;

}

function renderizaMusicas(p_musicas) {
    let listaMusicas = "";


    for (let i = 0; i < p_musicas.length; i++) {
        /*  console.log(renderizaMusica(p_musicas[i])); */
        listaMusicas += renderizaMusica(p_musicas[i], i);
    }
    document.getElementById("musicWrapper").innerHTML = listaMusicas;
    configPlayMusica();
    configDeleteMusica();


}

function limpaListaMusicas() {

    if (confirm("Deseja realmente limpar a lista de músicas?")) {
        musicas = [];
        renderizaMusicas(musicas);

    }
}

function configButtonClick() {
    let btnClean = document.querySelectorAll('.js-clean-music');

    btnClean.forEach(obj => {
        obj.onclick = limpaListaMusicas;
    });

}

function configPlayMusica() {
    let btnPlay = document.querySelectorAll("[data-musica-codigo]");
    btnPlay.forEach((obj) => {
        obj.onclick = function () {
            let codigoMusica = this.getAttribute("data-musica-codigo");
            document.querySelector("[data-frame-musica]").src = `https://www.youtube.com/embed/e9VLnw17RJ8]`;
        };
    });
}


function configDeleteMusica() {
    let btnDelete = document.querySelectorAll("[data-music-indice]");
    console.log(btnDelete);
    btnDelete.forEach((obj) => {
        obj.onclick = function () {
            if (confirm("Deseja realmente remover a música?")) {
                let indice = Number(this.getAttribute("data-music-indice"));
                console.log(typeof indice, indice);
                musicas.splice(indice, 1);
                renderizaMusicas(musicas);
            }
        };

    });
}

function abreFormCadastro() {
    document.querySelector("[data-btn-add]").classList.remove("hidden");
};



function run() {
    musicas.push(criarMusicaFactory('ie9VLnw17RJ8', 'Título da primeira música'));
    musicas.push(criarMusicaFactory('ie9VLnw17RJ8', 'Título da segunda música'));
    musicas.push(criarMusicaFactory('ie9VLnw17RJ8', 'Título da terceira música'));
    musicas.push(criarMusicaFactory('ie9VLnw17RJ8', 'Título da quarta música'));
    musicas.push(criarMusicaFactory('ie9VLnw17RJ8', 'Título da quinta música'));
    musicas.push(criarMusicaFactory('ie9VLnw17RJ8', 'Título da sexta música'));

    document.querySelector("[data-btn-add]").onclick = function () {
        this.classList.add("hidden");
        document.querySelector("[data-form-add]").classList.remove("hidden");
    };

    document.querySelector("[data-form-add]").onsubmit = function (e) {
        e.preventDefaul();
        let txtTitulo = document.querySelector("#txtTitulo");
        let txtCodigo = document.querySelector("#txtCodigo");

        let musicaObj = criarMusicaFactory(txtCodigo.value, txtTitulo.value);

        musicas.push(musicaObj);
        renderizaMusicas(musicas);

        this.reset();


        document.querySelector('[data-form-add]').classList.add("hidden");  //this.classList.add('hidden');
        document.querySelector('[data-btn-add]').classList.remove("hidden");


    };


    renderizaMusicas(musicas);
    configButtonClick();
}

window.onload = run;