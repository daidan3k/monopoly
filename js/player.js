class Player {
    /**
     * Constructor del objecte de Player
     * @param {*} nom Nom del jugador
     */
    constructor(nom) {
        this.nom = nom;
        this.diners = 1500; //Diners inicials
        this.propietats = [];
        this.casella = 1;
        this.estaAPreso = false;
        this.dobles = 0;
        this.bancarrota = false;
        this.carcel = false;
        this.turnosCarcel = 0; //Torns que porta a la preso
    }

    /**
     * Metode per pagar alquilers
     * @param {*} jugador Jugador que ha de pagar
     * @param {*} propietari Propietari de la casella
     * @param {*} alquiler Alquiler a pagar
     * @param {*} game Objecte del joc
     */
    cobrar(jugador, propietari, alquiler, game) {
        if (jugador != propietari) { //Comprovar si el el propietari no es el mateix jugador
            jugador.diners -= alquiler;
            propietari.diners += alquiler;
            alert(jugador.nom + " ha pagat " + alquiler + "€ a " + propietari.nom);
            this.comprovarBancarrota(jugador, game);
        }
    }
    
    /**
     * Metode per calcular els diners a pagar si caus en una estacio
     * @param {*} jugador Jugador que ha de pagar
     * @param {*} propietari Propietari de l'estacio
     * @param {*} game Objecte del joc
     */
    cobrarEstacio(jugador, propietari, game) {
        var nEstacions = 0;
        //Bucle per contar cuantes estacions te el propietari
        for (var i = 0; i < propietari.propietats.length; i++) {
            if (propietari.propietats[i].casella == 6 ||
                propietari.propietats[i].casella == 17 ||
                propietari.propietats[i].casella == 27 ||
                propietari.propietats[i].casella == 37) {

                nEstacions++;
            }
        }
        //Cobrar 100 per cada estacio
        this.cobrar(jugador, propietari, 100 * nEstacions, game);
    }

    /**
     * Metode per calcular els diners a pagar si caus en una companyia
     * @param {*} jugador Jugador que ha de pagar
     * @param {*} propietari Propietari de la companyia
     * @param {*} totalDaus Total dels daus
     * @param {*} game Objecte del joc
     */
    cobrarCompanyia(jugador, propietari, totalDaus, game) {
        var nCompanyies = 0;
        //Mirar cuantes companyies te el propietari
        for (var i = 0; i < propietari.propietats.length; i++) {
            if (propietari.propietats[i].casella == 14 ||
                propietari.propietats[i].casella == 30) {
                nCompanyies++;
            }
        }
        //Si te una companyia pagar el total de daus x 4
        if (nCompanyies == 1) {
            this.cobrar(jugador, propietari, totalDaus * 4, game);
        }
        //Si te dos companyies pagar el total de daus x 10
        else if (nCompanyies == 2) {
            this.cobrar(jugador, propietari, totalDaus * 10, game);
        }
    }

    /**
     * Metode per comprovar si un jugador esta en bancarrota
     * @param {*} jugador Jugador a comprovar
     * @param {*} game Objecte del joc
     */
    comprovarBancarrota(jugador, game) {        
        if (jugador.diners < 0) {
            alert(jugador.nom + " ha caigut en bancarrota.");
            game.partidaAcabada = true;
            jugador.bancarrota = true;
        }
    }
}