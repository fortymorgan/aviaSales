const ticketsLink = 'https://raw.githubusercontent.com/KosyanMedia/test-tasks/master/aviasales/tickets.json';
const currencyLink = 'https://www.cbr-xml-daily.ru/daily_json.js';

const tickets = [];
const state = {
  filter: [],
  currency: 'RUB',
};

let currencyDaily = {};

fetch(currencyLink)
  .then(blob => blob.json())
  .then(data => currencyDaily = {...data.Valute});

fetch(ticketsLink)
  .then(blob => blob.json())
  .then(data => {
    tickets.push(...data.tickets)
    tickets.sort((a, b) => a.price - b.price);
    filtersRender();
    render();
  });


const ticketsContainer = document.getElementById('tickets');
const filtersContainer = document.getElementById('filters');
const toggleAllCheckbox = document.getElementById('all');
const currencySelectors = document.querySelectorAll('input[type="radio"]');

const numberWithSpaces = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

const priceObj = {
  RUB: price => `${numberWithSpaces(price)}₽`,
  EUR: price => {
    const inEuro = Math.round(price / currencyDaily.EUR.Value * 100) / 100;
    return `${numberWithSpaces(inEuro)}€`
  },
  USD: price => {
    inDollar = Math.round(price / currencyDaily.USD.Value * 100) / 100
    return `${numberWithSpaces(inDollar)}$`
  },
};

toggleAllCheckbox.addEventListener('click', event => {
  const otherCheckboxes = document.querySelectorAll('input[id^=stops]');
  event.target.checked ? fillFilter() : state.filter.splice(0);
  otherCheckboxes.forEach(checkbox => checkbox.checked = event.target.checked);
  render();
});

currencySelectors.forEach(selector => selector.addEventListener('click', event => {
  state.currency = event.target.value;
  render();
}));

const fillFilter = () => {
  tickets.forEach(ticket => {
    if (!state.filter.includes(ticket.stops)) {
      state.filter.push(ticket.stops);
    }
  });
};

const airLogos = {
  TK: 'logos/TK.png',
  S7: 'logos/S7.png',
  BA: 'logos/BA.png',
  SU: 'logos/SU.png',
};

const timeToString = time => moment(time, 'HH:mm').format('HH:mm');

const dateToString = date => moment(date, 'DD.MM.YY').locale('ru').format('DD MMM YYYY,dd');

const render = () => {
  toggleAllCheckbox.checked = [...document.querySelectorAll('input[id^=stops]')]
    .every(checkbox => checkbox.checked);

  ticketsContainer.innerHTML = '';

  const ticketsToShow = tickets.filter(ticket => state.filter.includes(ticket.stops));
  
  ticketsToShow.forEach(ticket => {
    const ticketContainer = document.createElement('div');
    ticketContainer.classList.add('ticket');
    const stopsString = ticket.stops === 0 ? '' :
      ticket.stops === 1 ? '1 пересадка' : `${ticket.stops} пересадки`;
  
    ticketContainer.innerHTML = `<div class="logo-buy">
      <div class="logo">
        <img class="logo-img" src="${airLogos[ticket.carrier]}">
      </div>
      <button class="buy-button">Купить</br>за ${priceObj[state.currency](ticket.price)}</button>
    </div>
    <div class="ticket-info">
      <div class="time-stops">
        <div class="departure-time">${timeToString(ticket.departure_time)}</div>
        <div class="stops">
          <div class="stops-count">${stopsString}</div>
        </div>
        <div class="arrival-time">${timeToString(ticket.arrival_time)}</div>
      </div>
      <div class="point-date">
        <div class="departure-point-date">
          <div class="departure-point">${ticket.origin}, ${ticket.origin_name}</div>
          <div class="departure-date">${dateToString(ticket.departure_date)}</div>
        </div>
        <div class="arrival-point-date">
          <div class="arrival-point">${ticket.destination_name}, ${ticket.destination}</div>
          <div class="arrival-date">${dateToString(ticket.arrival_date)}</div>
        </div>
      </div>
    </div>`;
  
    ticketsContainer.appendChild(ticketContainer);
  });
};

const filtersRender = () => {
  fillFilter();
  state.filter.sort();

  state.filter.forEach(count => {
    const checkbox = document.createElement('label');
    checkbox.classList.add('for-checkbox-custom');

    const labelString = count === 0 ? 'Без пересадок' :
      count === 1 ? '1 пересадка' : `${count} пересадки`;

    checkbox.innerHTML = `<input type="checkbox" id="stops-${count}" value="${count}" checked>
    <span class="checkbox-custom"></span>
    <span class="label">${labelString}</span>
    <button class="only" value="${count}">Только</button>`;

    filtersContainer.appendChild(checkbox);

    checkbox.querySelector('input').addEventListener('click', event => {
      event.target.checked ? state.filter.push(+event.target.value) :
        state.filter.splice(state.filter.indexOf(+event.target.value), 1);
      render();
    });

    checkbox.querySelector('.only').addEventListener('click', event => {
      state.filter.splice(0);
      state.filter.push(+event.target.value);
      const otherCheckboxes = document.querySelectorAll('input[id^=stops]');
      otherCheckboxes.forEach(checkbox => checkbox.checked = checkbox.id.includes(event.target.value));
      render();
    });
  });
}
