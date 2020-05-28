//COMANDO PARA ESTABLECER LA COMUNICACIÓN

// @ts-ignore
var socket = io();

var label = $('#lblNuevoTicket');
//ESCUCHAR SUCESOS
socket.on('connect', function() {
    console.log('Conectado al servidor');
});
socket.on('diconnect', function() {
    console.log('Perdimos la conexion con el servidor');
});

//ESCUCHAR INFORMACIÓN
socket.on('estadoActual', function(data) {
    console.log('Actual: ', data);
    label.text(data.actual);
});


$('button').on('click', function() {
    // console.log('click');
    socket.emit('siguienteTicket', null, function(siguienteTicket) {


        label.text(siguienteTicket);

    });
})