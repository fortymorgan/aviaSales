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

const dateInFormat = dateString => {
  const dateArray = dateString.split('.');
  const date = new Date(`20${dateArray[2]}`, dateArray[1], dateArray[0]);
  const day = date.getDate();
  const daysOfWeek = {
    0: 'Вс',
    1: 'Пн',
    2: 'Вт',
    3: 'Ср',
    4: 'Чт',
    5: 'Пт',
    6: 'Сб',
  };
  const dayOfWeek = daysOfWeek[date.getDay()];
  const months = {
    1: 'янв',
    2: 'фев',
    3: 'мар',
    4: 'апр',
    5: 'май',
    6: 'июнь',
    7: 'июль',
    8: 'авг',
    9: 'сен',
    10: 'окт',
    11: 'ноя',
    12: 'дек',
  };
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year},${dayOfWeek}`;
};

const airLogos = {
  TK: 'logos/TK.png',
  S7: 'logos/S7.png',
  BA: 'logos/BA.png',
  SU: 'logos/SU.png',
};

const render = () => {
  tickets.forEach(ticket => {
    const ticketContainer = document.createElement('div');
    ticketContainer.classList.add('ticket');
    const stopsString = ticket.stops === 0 ? '' :
      ticket.stops === 1 ? '1 пересадка' : `${ticket.stops} пересадки`;
  
    ticketContainer.innerHTML = `<div class="logo-buy">
      <div class="logo">
        <img class="logo-img" src="${airLogos[ticket.carrier]}">
      </div>
      <button class="buy-button">Купить</br>за ${ticket.price.toLocaleString()}₽</button>
    </div>
    <div class="ticket-info">
      <div class="time-stops">
        <div class="departure-time">${ticket.departure_time}</div>
        <div class="stops">
          <div class="stops-count">${stopsString}</div>
        </div>
        <div class="arrival-time">${ticket.arrival_time}</div>
      </div>
      <div class="point-date">
        <div class="departure-point-date">
          <div class="departure-point">${ticket.origin}, ${ticket.origin_name}</div>
          <div class="departure-date">${dateInFormat(ticket.departure_date)}</div>
        </div>
        <div class="arrival-point-date">
          <div class="arrival-point">${ticket.destination_name}, ${ticket.destination}</div>
          <div class="arrival-date">${dateInFormat(ticket.arrival_date)}</div>
        </div>
      </div>
    </div>`;
  
    ticketsContainer.appendChild(ticketContainer);
  });
};

