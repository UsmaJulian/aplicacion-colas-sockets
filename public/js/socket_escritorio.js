//COMANDO PARA ESTABLECER LA COMUNICACIÓN


// @ts-ignore
var socket = io();


var searchParams = new URLSearchParams(window.location.search);
// console.log(searchParams.has('escritorio'));

if (!searchParams.has('escritorio')) {
    // @ts-ignore
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}
var escritorio = searchParams.get('escritorio');

console.log(escritorio);
var label = $('small');
$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function() {


    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {
        console.log(resp);
        if (resp === 'No hay tickets') {
            label.text(resp);
            alert(resp);
            return;
        }
        label.text('Ticket ' + resp.numero);
    });


});