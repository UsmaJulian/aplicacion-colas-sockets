const fs = require('fs');


class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}



class TicketControl {
    constructor() {

        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];


        let data = require('../data/data.json');
        // console.log(data);
        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {
            this.reiniciarConteo();
        }
    }
    siguienteTicket() {
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.grabarArchivo();
        return ` Ticket ${ this.ultimo }`;
    }

    getUltimoTicket() {
        return ` Ticket ${ this.ultimo }`;
    }
    getUltimos4() {
        return this.ultimos4;
    }

    atenderTicket(escritorio) {
        //VERIFICO SI HAY TICKETS PENDIENTES DE ATENDER
        if (this.tickets.length === 0) {
            return 'No hay tickets';

        }
        //EXTRAER EL NUMERO PARA NO PASAR POR REFERENCIA
        let numeroTicket = this.tickets[0].numero;

        this.tickets.shift(); //ELIMINO LA PRIMERA POSICION DE EL ARREGLO
        //CREO UN NUEVO TICKET QUE SE VA A ATENDER
        let atenderTicket = new Ticket(numeroTicket, escritorio);
        this.ultimos4.unshift(atenderTicket); //AGREGO EL TICKET A ATENDER AL INICO DEL ARREGLO
        //VERIFICO QUE SOLO EXISTAN 4 TICKETS EN EL ARREGLO
        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1); // Borra el último elemento
        }
        console.log('Ultimos 4 elementos');
        console.log(this.ultimos4);
        this.grabarArchivo();
        return atenderTicket; // REGRESO EL TICKET QUE QUIERO ATENDER
    }


    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];
        console.log('Se ha inicializado el sistema');
        this.grabarArchivo();
    }
    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4,
        };
        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);

    }
}
module.exports = {
    TicketControl
}