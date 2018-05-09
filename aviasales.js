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
        <span class="departure-time">${ticket.departure_time}</span>
        <span class="departure-point">${ticket.origin}, ${ticket.origin_name}</span>
        <span class="departure-date">${ticket.departure_date}</span>
      </div>
      <div class="stops">
        <span class="stops-count">${stopsString}</span>
      </div>
      <div class="arrival">
        <span class="arrival-time">${ticket.arrival_time}</span>
        <span class="arrival-point">${ticket.destination}, ${ticket.destination_name}</span>
        <span class="arrival-date">${ticket.arrival_date}</span>
      </div>
    </div>`;
  
    ticketsContainer.appendChild(ticketContainer);
  });
};

