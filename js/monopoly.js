//Script per fer sortir un missatge de confirmacio al tencar o recarregar la finestra
window.addEventListener("beforeunload", function (event) {
    var confirmationMessage = "Si surts o recarregues la finestra perdras el progres de la partida!";
    event.returnValue = confirmationMessage;
    return confirmationMessage;
});

/**
 * Funcio que s'executa al cliclar el boto seguent despres d'escollir els jugadors
 */
function seguentOpcio() {
    
    event.preventDefault(); //Evitar recarregar la pestanya

    //Guardar el numero de jugadors selecionat
    var j = document.getElementById("selectPlayers");
    this.nJugadors = j.value; 

    //Amagar numero de jugadors i mostar menu nom de jugadors
    document.getElementById("numJugadors").style.display = 'none';
    document.getElementById("nomJugadors").style.display = 'block';

    //Bucle que itera entre els 4 jugadors
    for (let i = 1; i <= 4; i++) {
        //Si i <= nJugadors mostra, altrament amaga
        const displayStyle = i <= this.nJugadors ? 'inline-block' : 'none';
        const borderStyle = i <= this.nJugadors ? '2px solid black;' : 'none';
        document.getElementById(`labelJ${i}`).style.display = displayStyle;
        document.getElementById(`nomJugador${i}`).style.display = displayStyle;
        document.getElementById(`jugador${i}`).style.display = displayStyle;
        document.getElementById(`casellaJ${i}`).style.border = borderStyle;

        if (i <= this.nJugadors) {
            var inputJugador = document.getElementById(`nomJugador${i}`);
            inputJugador.insertAdjacentHTML("afterend", "<br>");
        }
    }
}

/**
 * Agafa els noms dels jugadors introduits en el formulari i crea un nou objecte de jugador
 * Guarda els objectes en un array
 */
function nomsJugadors() {
    event.preventDefault(); //Evita recarregar
    this.jugadors = [];
    for (let i = 0; i < this.nJugadors; i++) {
        this.jugadors.push(new Player(document.getElementById("nomJugadors").elements[i].value));
    }
    //Prepara la partida
    prepararPartida();
}

/**
 * Funcio preparacio de la partida
 */
function prepararPartida() {
    //Amaga opcions i titol , i mostra el taulell i info de la partida  
    document.getElementById("opcionsPartida").style.display = "none";
    document.getElementById("titol").style.display = "none";
    document.getElementById("parent").style.display = "flex";

    //Crea les caselles i les guarda en un array
    const casillas = [new Casilla(0, 0, 1, "", "Sortida"),
    new Casilla(50, 35, 2, "Morado", "Propiedad", "Avinguda Empírica"),
    new Casilla(0, 0, 3, "", "Cofre"),
    new Casilla(50, 35, 4, "Morado", "Propiedad", "Avinguda Tartaria"),
    new Casilla(0, 0, 5, "", "Impuesto"),
    new Casilla(200, "Per cada estacio: 100", 6, "Gris1", "Estacion", "Estació Latam"),
    new Casilla(100, 70, 7, "Celeste", "Propiedad", "Avinguda Mexic"),
    new Casilla(0, 0, 8, "", "Suerte"),
    new Casilla(100, 70, 9, "Celeste", "Propiedad", "Avinguda Peru"),
    new Casilla(120, 80, 10, "Celeste", "Propiedad", "Avinguda Bolivia"),
    new Casilla(0, 0, 11, "", "Trivial"),
    new Casilla(0, 0, 12, "", "Carcel"),
    new Casilla(140, 90, 13, "Rosa", "Propiedad", "Carrer Astral"),
    new Casilla(150, "X", 14, "Gris2", "Compañia", "Companyia Electrica"),
    new Casilla(140, 90, 15, "Rosa", "Propiedad", "States Avenue"),
    new Casilla(140, 90, 16, "Rosa", "Propiedad", "Avinguda Reptil"),
    new Casilla(200, "Per cada estacio: 100", 17, "Gris1", "Estacion", "Estació Negra"),
    new Casilla(180, 130, 18, "Naranja", "Propiedad", "Avinguda Mali"),
    new Casilla(0, 0, 19, "", "Cofre"),
    new Casilla(180, 130, 20, "Naranja", "Propiedad", "Avinguda Nigeria"),
    new Casilla(200, 140, 21, "Naranja", "Propiedad", "Avinguda Zimbabwe"),
    new Casilla(0, 0, 22, "", "Trivial"),
    new Casilla(200, 140, 23, "Rojo", "Propiedad", "Avinguda Kentucky"),
    new Casilla(0, 0, 24, "", "Suerte"),
    new Casilla(220, 160, 25, "Rojo", "Propiedad", "Avinguda Donalds"),
    new Casilla(220, 160, 26, "Rojo", "Propiedad", "Avinguda King"),
    new Casilla(200, "Per cada estacio: 100", 27, "Gris1", "Estacion", "Estacio Burgir"),
    new Casilla(260, 185, 28, "Amarillo", "Propiedad", "Avinguda TFT"),
    new Casilla(260, 185, 29, "Amarillo", "Propiedad", "Avinguda Ligo"),
    new Casilla(120, "X", 30, "Gris2", "Compañia", "Aigua Treballs"),
    new Casilla(280, 200, 31, "Amarillo", "Propiedad", "Avinguda Abbys"),
    new Casilla(0, 0, 32, "", "Preso"),
    new Casilla(300, 215, 33, "Verde", "Propiedad", "Avinguda Void"),
    new Casilla(300, 215, 34, "Verde", "Propiedad", "Avinguda Stars"),
    new Casilla(0, 0, 35, "", "Cofre"),
    new Casilla(320, 230, 36, "Verde", "Propiedad", "Avinguda Imagine"),
    new Casilla(200, "Per cada estacio: 100", 37, "Gris1", "Estacion", "Estacio Lamentos"),
    new Casilla(0, 0, 38, "", "Suerte"),
    new Casilla(350, 230, 39, "Azul", "Propiedad", "Parc MayPay"),
    new Casilla(0, 0, 40, "", "Impuesto"),
    new Casilla(400, 280, 41, "Azul", "Propiedad", "Broadwalk")
    ];

    //Crea les cartes i les guarda en un array
    const cartas = [new Carta("Buena", "Cobras una ayuda social por ser moro", 150),
    new Carta("Buena", "Ingreso por personas con IQ reducido", 45),
    new Carta("Mala", "Si te gusta comer dinero es lo que hay", 60),
    new Carta("Buena", "Robin Hood le robo a unas abuelas pero y deja un recado", 80),
    new Carta("Mala", "Te quitamos esto para la asociacion de fumadores, ellos tambien necesitan su dosis", 11),
    new Carta("Buena", "Acabas de encontrar un billete en el suelo", 50),
    new Carta("Buena", "Te has visto un tutorial de evasion de impuestos", 250),
    new Carta("Mala", "Un gitano te acaba de robar", 200),
    new Carta("PreguntaNo", "Juegas al LoL?", 450),
    new Carta("PreguntaSi", "¿El tiempo es una construcción subjetiva de la mente humana?", 75),
    new Carta("PreguntaNo", "Tienes miedo a la muerte?", 10),
    new Carta("PreguntaNo", "¿Puedes acceder a variables privadas de un módulo en JavaScript desde otro archivo?", 325),
    new Carta("PreguntaNo", "Arigatooo?", 50),
    new Carta("PreguntaNo", "¿Te gusta JavaScript?", 75),
    new Carta("PreguntaSi", "¿JavaScript es un lenguaje de programación orientado a objetos?", 40),
    new Carta("PreguntaSi", "¿Los objetos en JavaScript pueden tener métodos y propiedades?", 30),
    new Carta("Carcel", "Te ha parado un policia y ha encontrado tus sustancias ilegales, toca ir a la carcel", 0),
    new Carta("Carcel", "Los tutoriales de evasion de impuestos te han llevado a la carcel", 0),
    new Carta("Carcel", "Un policia tenia un mal dia y te llevado a la carcel", 0)
    ];

    //Crea l'objecte Game
    const game = new Game(this.jugadors, casillas, cartas);
    //Inicia la partida
    jugarPartida(game, this.jugadors);
}

/**
 * Funcio de torns de la partida
 * Funcio async per permetre entrar en espera mentres el jugador no tira els daus
 * @param {*} game Objecte de joc
 * @param {*} jugadors Objecte de jugadors
 */
async function jugarPartida(game, jugadors) {
    //Canviar titol de la pagina
    document.title = "Asandiopoly | Partida";
    //Bucle que es repeteix fins acabar la partida
    while (!game.partidaAcabada) {
        game.updateInfo(); //Actualitzar .info2
        //Bucle que itera entre els jugadors per cada ronda
        for (let i = 0; i < game.numJugadors; i++) {
            //Aquest if serveix perque si el for no ha acabat de donar totes les voltes
            //i acaba la partida, no fagi res amb els seguents jugadors
            if (!game.partidaAcabada) {

                //Guardem el jugador actual per millorar legibilitat
                let jugadorActual = jugadors[i];
                //Posem a 0 el numero de dobles seguits
                jugadorActual.dobles = 0;

                //Escriu el nom del jugador actual
                document.getElementById("torn").innerHTML = jugadorActual.nom;

                //Posa en pausa la funcio fins que s'acaba la funcio esperarTirarDaus
                await esperarTirarDaus("tirarDaus");
                let daus = game.tirarDaus(); //Tirar daus i assignarlos a un array amb 2 posicions      
                game.updateInfo(); //Actualitzar info panell2
                //Pimer comprovar si el jugador no esta a la preso

                //Si el jugador no esta a la preso
                if (jugadorActual.carcel == false) {
                    game.moviment(jugadorActual, daus[0] + daus[1]); //Fer jugada
                    while (daus[0] == daus[1] && jugadorActual.dobles <= 2) { //En cas de tirar dobles
                        jugadorActual.dobles++; //Es suma 1 al contador de dobles seguits
                        if (jugadorActual.carcel == false) { //Si el jugador no ha caigut a la preso

                            await esperarTirarDaus(); //Espera a fer click a tirar els daus
                            daus = game.tirarDaus(); //Tira els daus i els guarda en l'array

                            //Si porta 2 dobles seguits i els que acaba de tirar tambe ho son
                            if (jugadorActual.dobles == 2 && daus[0] == daus[1]) {
                                //Va a la preso
                                jugadorActual.carcel = true;
                                alert("Has sacado 3 dobles seguidos, ve a la carcel");
                            //Altrament fa el moviment
                            } else {
                                game.moviment(jugadorActual, daus[0] + daus[1]);
                            }
                        } else {
                            //Si ha caigut a la preso els daus es posen en 1 i 2
                            //Aixo es fa per evitar un bucle infinit ja que si esta a la preso no pot tirar
                            //I si no els canviesim sempre li deixaria tornar a tirar ja que ha tret dobles
                            daus = [1, 2];
                        }                        
                    }
                //En cas de estar a la preso
                } else {
                    //Si porta menys de 3 torns a la preso
                    if (jugadorActual.turnosCarcel < 3) {
                        if (daus[0] == daus[1]) { //Si treu dobles surt de la preso i fa el moviment
                            alert("Sales de la carcel!");
                            jugadorActual.carcel = false;
                            jugadorActual.turnosCarcel = 0;
                            game.moviment(jugadorActual, daus[0] + daus[1]);
                        } else { //Si no treu dobles es queda i es suma 1 al contador de torns a la preso
                            alert("Te quedas en la carcel");
                            jugadorActual.turnosCarcel++;
                        }
                    } else { //Si porta 3 torns a la preso surt, pero no fa el moviment
                        alert("Sales de la carcel!");
                        jugadorActual.carcel = false;
                        jugadorActual.turnosCarcel = 0;
                    }
                }
            }
        }
    }
    //Cuan acaba el bucle de partida s'executa la funcio de final de partida
    finalPartida(game);
}

/**
 * Funcio amb les mecaniques de fi de partida
 * @param {*} game Objecte del joc
 */
function finalPartida(game) {//Canviar titol de la pagina
    document.title = "Asandiopoly | Resultats";
    //S'amaga el taulell i es mostra la pantalla de fi de partida
    document.getElementById("parent").style.display = "none";
    document.getElementById("fiPartida").style.display = "block";
    alert("Final de la partida");
    
    //Ordena els jugadors per cantitat de diners de forma descendent
    game.jugadors.sort((a, b) => parseFloat(b.diners) - parseFloat(a.diners));

    //Per cada jugador
    for (let i = 0; i < game.numJugadors; i++) {
        
        //Es mira si es el jugador que ha perdut
        //Si ho es s'escriu al seu nom al lloc corresponent
        var perdedor = document.getElementById("perdedor");
        if (game.jugadors[i].bancarrota == true) {
            perdedor.textContent = "Ha perdut el jugador: " +
                game.jugadors[i].nom;
        }

        //S'escriu el nom del jugador i els diners al acabar la partida
        const jugador = game.jugadors[i];
        var infoJ = document.getElementById(`fPartidaJugador${i + 1}`);
        infoJ.textContent = i+1 + "º - " +
            jugador.nom + ": " +
            jugador.diners + "€ ";
    }
}

/**
 * Funcio que espera a que es fagi click al boto de tirar daus
 * @returns 
 */
function esperarTirarDaus() {
    //Crea una "promesa" amb una funcio de resolucio, que posara en "pausa" el programa fins cumplir la promesa
    //Un cop la promesa es compleixi permetra al programa sortir del estat de "pausa"
    return new Promise(resolve => {
        const boto = document.getElementById("tirarDaus");

        const maneigClick = () => { //La promesa, fer click al boto de tirarDaus
            boto.removeEventListener("click", maneigClick);
            resolve();
        }

        boto.addEventListener("click", maneigClick);
    });
}
