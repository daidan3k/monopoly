    class Game {
    /**
     * Constructor de l'objecte joc
     * @param {*} jugadors Jugadors del joc
     * @param {*} casillas Caselles del joc
     * @param {*} cartas Cartes de sort i cofre de comunitat
     */
    constructor(jugadors, casillas, cartas) {
        this.jugadors = jugadors;
        this.numJugadors = jugadors.length;
        //Crea un array del nom dels jugadors agafant el valor "nom" de cada jugador del array d'objectes Player
        this.nomJugadors = jugadors.map((e) => e.nom);
        this.partidaAcabada = false;
        this.casillas = casillas;
        this.cartas = cartas;
    }

    /**
     * Metode per actualitzar la informacio del taullell2
     */
    updateInfo() {
        //Per cada jugador
        for (let i = 0; i < this.numJugadors; i++) {
            const jugador = this.jugadors[i];
            //Apuntar els diners
            document.getElementById(`jugador${i + 1}`).textContent =
                jugador.nom + ": " +
                jugador.diners + "€ ";

            //Apuntar la casella
            if (jugador.casella == 12) {
                document.getElementById(`casellaJ${i + 1}`).textContent =
                    "Casella: CÁRCEL";
            } else {
                document.getElementById(`casellaJ${i + 1}`).textContent =
                    "Casella: " +
                    jugador.casella;
            }

            //Ordena les propietats comparant en parelles quina es mes gran que l'altre
            jugador.propietats.sort((a, b) => parseFloat(a.casella) - parseFloat(b.casella));
            var div = document.getElementById(`propietatsJ${i + 1}`);
            //Borra el contingut del div per no ajuntar el contingut anterior amb el nou
            div.innerHTML = " ";

            //Per cada propietat del jugador
            for (let j = 0; j < jugador.propietats.length; j++) {
                var colorFons;
                //Switch per determinar el codi de color depenent de quin color te assignat la casella
                switch (jugador.propietats[j].color) {
                    case "Morado": colorFons = "#5e3577"; break;
                    case "Celeste": colorFons = "#d2eaf5"; break;
                    case "Rosa": colorFons = "#b02f7c"; break;
                    case "Naranja": colorFons = "#fa811d"; break;
                    case "Rojo": colorFons = "#f50c2b"; break;
                    case "Amarillo": colorFons = "#ffed20"; break;
                    case "Verde": colorFons = "#41994e"; break;
                    case "Azul": colorFons = "#5a6dba"; break;
                    case "Gris1": colorFons = "#7F7F7F"; break;
                    case "Gris2": colorFons = "#BFBFBF"; break;
                }

                //Crea un element p i li dona estil
                var propietat = document.createElement("p");
                propietat.style.margin = "0";
                propietat.style.backgroundColor = colorFons;
                propietat.style.display = "inline-block";
                propietat.style.borderRadius = "2px";
                propietat.style.padding = "0 4px";
                propietat.style.margin = "1px 0";

                //Coloca l'element p dins del div i un salt de linea
                div.appendChild(propietat);
                div.appendChild(document.createElement("br"));
                //Escriu el numero, nom i alquiler de la propietat en l'element p
                propietat.innerText = "(" + jugador.propietats[j].casella + ") " +
                    jugador.propietats[j].nom +
                    " - Alquiler: " +
                    jugador.propietats[j].alquiler +
                    "€";
            }
        }
    }

    /**
     * Metode per simular la tirada de daus
     * @returns Array de 2 enters amb el numero de cada dau
     */
    tirarDaus() {
        let daus = [];
        for (let i = 1; i <= 2; i++) {
            //Genera un numero entre 1 i 6
            let dauRandom = Math.floor(Math.random() * 5) + 1;
            //Afageix el numero a l'array dels daus
            daus.push(dauRandom);
            //Canvia l'imatge del dau
            document.getElementById(`dau${i}`).setAttribute("src", "images/daus/dau" + dauRandom + ".png");
        }
        return daus;
    }

    /**
     * Metode per fer el moviment del jugador
     * @param {*} jugador Jugador actual
     * @param {*} totalDaus Suma dels 2 daus
     */
    moviment(jugador, totalDaus) {
        //Guarda la casella abans de moure's
        var casellaPre = jugador.casella;

        //Si pot avançar sense passarse de 41, ho fa
        if (jugador.casella + totalDaus <= 41) {
            jugador.casella += totalDaus;
            //Si no dona la volta
        } else {
            //Es mou fins arribar a 41 i lo que li sobra es mou desde 1
            jugador.casella += totalDaus - 41;
            //Es sumen 200 euros al donar la volta
            jugador.diners += 200;
            alert("Pasas por la casilla de salida, cobras 200€.")
        }

        //Codi per simular el pas de nomes visita i caure a la preso
        //Nomes visita i la preso, internament, son 2 caselles diferents. 
        //Pero realment nomes es 1

        //Si no caus directe a la preso, no t'hi quedes.
        if (jugador.casella == 11) { //Si caus directe a la preso
            jugador.carcel = true;
            jugador.casella = 12; //Et porta a la preso real
            alert("Has caido en la carcel");
        } else if (casellaPre < 11 && jugador.casella >= 12) { //Si passes pero no hi caus
            jugador.casella++; //Et suma una casella de mes, per simular com si fos una casella sola
        } else if (jugador.casella == 32) { //Si caus a la casella de "Ves a la preso"
            jugador.carcel = true;
            jugador.casella = 12;
            alert("Ve a la carcel!");
        }

        //Guardem la casella actual en una variable per millorar la legibilitat
        let casellaActual = this.casillas[jugador.casella - 1];

        //Com actua depenent del tipus de casella
        switch (casellaActual.tipus) {
            case "Sortida":
                break;
            case "Propiedad":
                if (casellaActual.propietari == null) { //Si no te propietari
                    this.comprarPropiedad(jugador, casellaActual);
                } else { //Si te propietari
                    jugador.cobrar(jugador, casellaActual.propietari, casellaActual.alquiler, this);
                }
                break;
            case "Cofre":
                alert("Carta Cofre de la Comunidad!");
                //Agafa una carta random del array de cartes
                var cartaRandom = this.cartas[Math.round(Math.random() * this.cartas.length)];
                //Fer accio de la carta
                cartaRandom.ferAccio(cartaRandom, jugador, this);
                break;
            case "Impuesto":
                //Impuesto sobre la renta
                if (casellaActual.casella == 5) {
                    alert(jugador.nom + " ha pagat 75€ de impost sobre la renta.");
                    jugador.diners -= 75;                    
                }
                //Impuesto de lujo
                if (casellaActual.casella == 40) {
                    alert(jugador.nom + " ha pagat 200€ de impost de luxe.");
                    jugador.diners -= 200;
                }
                //Comprovar si l'impost ha fet perdre al jugador
                jugador.bancarrota = jugador.comprovarBancarrota(jugador, this);
                break;
            case "Estacion":
                if (casellaActual.propietari == null) { //Si no te propietari
                    this.comprarPropiedad(jugador, casellaActual);
                } else { //Si te propietari
                    jugador.cobrarEstacio(jugador, casellaActual.propietari, this);
                }
                break;
            case "Suerte":
                alert("Carta de Suerte!");
                //Agafa una carta random del array de cartes
                var cartaRandom = this.cartas[Math.round(Math.random() * this.cartas.length)];
                //Per algun motiu avegades el random dona un numero fora del array, aqui comprova si el numero esta fora del array
                //En cas de estar fora, s'agafa l'ultima carta
                cartaRandom = (cartaRandom > this.cartas.length-1 || cartaRandom < 0) ? this.cartas.length-1 : cartaRandom;
                cartaRandom.ferAccio(cartaRandom, jugador, this);
                break;
            case "Trivial":
                break;
            case "Carcel":
                break;
            case "Compañia":
                if (casellaActual.propietari == null) { //Si no te propietari
                    this.comprarPropiedad(jugador, casellaActual);
                } else { //Si te propietari
                    jugador.cobrarCompanyia(jugador, casellaActual.propietari, totalDaus, this);
                }
                break;
        }
        this.updateInfo(); //Actualizar la informacio abans d'acabar el moviment
    }

    /**
     * Metode per comprar propietats
     * @param {*} jugador Jugador que compra
     * @param {*} casellaActual Casella a comprar
     */
    comprarPropiedad(jugador, casellaActual) {
        //Pregunta i guarda la resposta en una variable
        let comprar = confirm('Quieres comprar ('
            + casellaActual.casella + ') '
            + casellaActual.nom
            + ' por ' + casellaActual.preu + '€'
            + '?');

        //Si la vol comprar
        if (comprar) {
            //Si tens suficients diners per comprarla
            if (jugador.diners - casellaActual.preu >= 0) {
                jugador.diners -= casellaActual.preu; //Resta els diners
                casellaActual.propietari = jugador; //El propietari de la casella es el jugador
                jugador.propietats.push(casellaActual); //S'afageix la propietat a l'array de propietats del jugador
            } else { //Si no tens suficients diners
                alert("Dinero insuficiente.")
            }
        }
    }

}
