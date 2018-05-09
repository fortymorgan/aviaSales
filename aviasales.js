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
  
    ticketContainer.innerHTML = `<div>
      <span>Купить за ${ticket.price} ₽</span>
    </div>`;
  
    ticketsContainer.appendChild(ticketContainer);
  });
};

