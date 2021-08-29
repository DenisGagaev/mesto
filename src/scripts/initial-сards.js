//Массив с фото
const kazan = new URL('../images/sasha-yudaev-kazan.jpg', import.meta.url);
const sochi = new URL('../images/dima-fedorov-sochi.jpg', import.meta.url);
const kurshkayaKosa = new URL('../images/artem-beliaikin-kurshkaya-kosa.jpg', import.meta.url);
const vladivostok = new URL('../images/pavel-anoshin-vladivostok.jpg', import.meta.url);
const saintPetersburg = new URL('../images/matvey-yelkin-saint-petersburg.jpg', import.meta.url);
const moscow = new URL('../images/nikita-karimov-lvJZhHOIJJ4-unsplash.jpg', import.meta.url);

const initialCards = [
	{
		text: 'Казань',
		link: kazan
	},
	{
		text: 'Сочи',
		link: sochi
	},
	{
		text: 'Куршская Коса',
		link: kurshkayaKosa
	},
	{
		text: 'Владивосток',
		link: vladivostok
	},
	{
		text: 'Санкт-Петербург',
		link: saintPetersburg
	},
	{
		text: 'Москва',
		link: moscow
	}
];

export { initialCards };