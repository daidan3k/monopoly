class Carta {
    /**
     * Constructor del objecte Carta
     * @param {*} tipus Tipus de carta
     * @param {*} text Text de la carta
     * @param {*} diners Diners que suma/resta la carta
     */
    constructor(tipus, text, diners) {
        this.tipus = tipus;
        this.text = text;
        this.diners = diners;
    }

    /**
     * Metode per executar l'accio de la carta
     * @param {*} carta Carta que ha sortit
     * @param {*} jugador Jugador que ha agafat la carta
     * @param {*} game Objecte del joc
     */
    ferAccio(carta, jugador, game) {
        let resposta;
        switch (carta.tipus) {
            case "Buena": //Si es bona suma els diners
                jugador.diners += carta.diners;
                alert(carta.text + " (+" + carta.diners + "€)");
                break;
            case "Mala": //Si es mala resta els diners
                jugador.diners -= carta.diners;
                alert(carta.text + " (-" + carta.diners + "€)");
                break;
            case "PreguntaSi": //Si es pregunta i la resposta es si, suma si contestes be, resta si no 
                resposta = confirm(carta.text);
                if (resposta) {
                    jugador.diners += carta.diners;
                    alert("Has ganado " + carta.diners + "€!");
                } else {
                    jugador.diners -= carta.diners;
                    alert("Has perdido " + carta.diners + "€!");
                }
                break;
            case "PreguntaNo": //Si es pregunta i la resposta es no, sima si contestes be, resta si no 
                resposta = confirm(carta.text);
                if (resposta) {
                    jugador.diners -= carta.diners;
                    alert("Has perdido " + carta.diners + "€!");
                } else {
                    jugador.diners += carta.diners;
                    alert("Has ganado " + carta.diners + "€!");
                }
                break;
            case "Carcel": //T'envia a la preso
                alert(carta.text);
                jugador.carcel = true;
                jugador.casella = 12;
        }
        //Abans de acabar mira si la carta ha fet perdre al jugador
        jugador.comprovarBancarrota(jugador, game);
    }
}