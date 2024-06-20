
let ticketCounter = 0;
let cantidadAtendido = 0;

const socketController = (socket) => {

  console.log('Cliente conectado', socket.id);

  socket.on('aumentar', (Ticket, callback) => {
      ticketCounter++;
      console.log('Ticket incrementado a:', ticketCounter);
      callback(ticketCounter);
      socket.broadcast.emit('ticketIncrementado', ticketCounter);
  });

socket.on("Atender", (callback) => {
    if(ticketCounter > 0) {
      ticketCounter=ticketCounter-1
        console.log('Tickets en espera:', ticketCounter);
        callback(ticketCounter);
        socket.broadcast.emit("TicketDisminuye", ticketCounter);
    } else {
        console.log("No hay más tickets por atender.");
    }
});


  socket.on("Atendidos", (cantidadAtendidos, callback) => {
      cantidadAtendido++;
      console.log(`Cantidad de tickets atendidos: ${cantidadAtendido}`);
      callback(`${cantidadAtendido}`);
  });

  socket.on("escritorio", (nombre) => {
      console.log(`Nombre del escritorio recibido desde el cliente: ${nombre}`);
      socket.broadcast.emit("nameUsuario", nombre);
  });
};

export { socketController };
