import dayjs from 'dayjs';
import { AbstractComponent } from './abstract-view';

const createOffers = (offers) =>
  offers
    .map(
      (offer) => `<li class="event__offer">
  <span class="event__offer-title">${offer.title}</span>
  &plus;&euro;&nbsp;
  <span class="event__offer-price">${offer.price}</span>
</li>`
    )
    .join('');

export class Waypoint extends AbstractComponent {
  setEditClickHandler = (callback) => {
    this.editClick = callback;
    this.getElement
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.editClickHandler);
  };

  editClickHandler = (e) => {
    e.preventDefault();
    this.editClick();
  };

  setFavoriteClickHandler = (callback) => {
    this.favoriteClick = callback;
    this.getElement
      .querySelector('.event__favorite-btn')
      .addEventListener('click', this.favoriteClickHandler);
  };

  favoriteClickHandler = (e) => {
    e.preventDefault();
    this.favoriteClick(e);
  };

  get getTemplate() {
    const { type, destination, timeStart, timeEnd, price, offers, isFavorite } =
      this.state;

    const isFavoriteClass = isFavorite ? ' event__favorite-btn--active' : '';
    const offersMarkup = createOffers(offers);
    return `<li class="trip-events__item">
        <div class="event">
          <time
            class="event__date"
            datetime="${dayjs(timeStart).format('YYYY-MM-DD')}"
          >
            ${dayjs(timeStart).format(' MMM D')}
          </time>
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/${type?.toLowerCase()}.png" alt="Event type icon">
          </div>
          <h3 class="event__title">${type} ${destination.name}</h3>
          <div class="event__schedule">
            <p class="event__time">
              <time
                class="event__start-time"
                datetime="${dayjs(timeStart).format('YYYY-MM-DDThh:mm')}"
              >
                ${dayjs(timeStart).format('hh:mm')}
              </time>
              &mdash;
              <time
                class="event__end-time"
                datetime="${dayjs(timeEnd).format('YYYY-MM-DDThh:mm')}"
              >
                ${dayjs(timeEnd).format('hh:mm')}
              </time>
            </p>
            <p
              class="event__duration"
            >
              ${dayjs(timeEnd).diff(timeStart, 'minutes')}M
            </p>
          </div>
          <p class="event__price">
            &euro;&nbsp;<span class="event__price-value">${price}</span>
          </p>
          <h4 class="visually-hidden">Offers:</h4>
          <ul class="event__selected-offers">${offersMarkup}</ul>
          <button class="event__favorite-btn${isFavoriteClass}" type="button">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
            </svg>
          </button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </div>
      </li>
  `;
  }
} 
