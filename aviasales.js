const link = 'https://raw.githubusercontent.com/KosyanMedia/test-tasks/master/aviasales/tickets.json';

const tickets = [];

fetch(link)
  .then(blob => blob.json())
  .then(data => {
    tickets.push(...data.tickets)
    tickets.sort((a, b) => a.price - b.price);
    render();
  });


const ticketsContainer = document.getElementById('tickets');

const render = () => {
  tickets.forEach(ticket => {
    const ticketContainer = document.createElement('div');
    ticketContainer.classList.add('ticket');
    const stopsString = ticket.stops === 0 ? '' :
      ticket.stops === 1 ? '1 пересадка' : `${ticket.stops} пересадки`;
  
    ticketContainer.innerHTML = `<div class="buy">
      <button>Купить за ${ticket.price} ₽</button>
    </div>
    <div class="info">
      <div class="departure">
        <div class="departure-time">${ticket.departure_time}</div>
        <div class="departure-point">${ticket.origin}, ${ticket.origin_name}</div>
        <div class="departure-date">${dateInFormat(ticket.departure_date)}</div>
      </div>
      <div class="stops">
        <div class="stops-count">${stopsString}</div>
      </div>
      <div class="arrival">
        <div class="arrival-time">${ticket.arrival_time}</div>
        <div class="arrival-point">${ticket.destination_name}, ${ticket.destination}</div>
        <div class="arrival-date">${dateInFormat(ticket.arrival_date)}</div>
      </div>
    </div>`;
  
    ticketsContainer.appendChild(ticketContainer);
  });
};

