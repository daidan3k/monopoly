class Casilla {
    /**
     * Constructor de l'objecte de Casella
     * @param {*} preu Preu de la casella
     * @param {*} alquiler Alquiler a pagar cuan un jugador cau a la casella
     * @param {*} casella Numero de casella
     * @param {*} color Color de la casella
     * @param {*} tipus Tipus de casella
     * @param {*} nom Nom de la casella
     */
    constructor (preu, alquiler, casella, color, tipus, nom) {
        this.propietari = null;
        this.preu = preu;
        this.alquiler = alquiler;
        this.casella = casella;
        this.color = color;
        this.tipus = tipus;
        this.nom = nom;
    }
}