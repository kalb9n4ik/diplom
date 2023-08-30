const qrcode1 = QRCreator(`На фильм: ${window.localStorage.getItem('filmName')}; Ряд/Место: ${window.localStorage.getItem('choiceChairs')}; В зале: ${window.localStorage.getItem('hallName').slice(3)}; Начало сеанса: ${window.localStorage.getItem('seanceTime')}; Билет действителен строго на свой сеанс.`,
	{ mode: 4,
	eccl: -1,
	version: -1,
	mask: -1,
	image: 'svg',
	modsize: -1,
	margin: 0
});

const content = (qrcode) =>{
	return qrcode.error ?
	`недопустимые исходные данные ${qrcode.error}`:
	qrcode.result;
};

showTicket()

function showTicket() {
	const main = document.querySelector('main')

	const section = document.createElement('section')
	section.className = 'ticket'
	main.append(section)

	const header = document.createElement('header')
	header.className = 'tichet__check'
	header.innerHTML = '<h2 class="ticket__check-title">Электронный билет</h2>'
	section.append(header)

	const ticketInfoWrapper = document.createElement('div')
	ticketInfoWrapper.className = 'ticket__info-wrapper'
	section.append(ticketInfoWrapper)

	const ticketInfoFilmName = document.createElement('p')
	ticketInfoFilmName.className = 'ticket__info'
	ticketInfoFilmName.innerHTML = `На фильм: <span class="ticket__details ticket__title">${window.localStorage.getItem('filmName')}</span>`
	ticketInfoWrapper.append(ticketInfoFilmName)

	const ticketInfoChoicesChairs = document.createElement('p')
	ticketInfoChoicesChairs.className = 'ticket__info'
	ticketInfoChoicesChairs.innerHTML = `Ряд/Место: <span class="ticket__details ticket__chairs">${window.localStorage.getItem('choiceChairs')}</span>`
	ticketInfoWrapper.append(ticketInfoChoicesChairs)

	const ticketInfoHall = document.createElement('p')
	ticketInfoHall.className = 'ticket__info'
	ticketInfoHall.innerHTML = `В зале: <span class="ticket__details ticket__hall">${window.localStorage.getItem('hallName').slice(3)}</span>`
	ticketInfoWrapper.append(ticketInfoHall)

	const ticketInfoStart = document.createElement('p')
	ticketInfoStart.className = 'ticket__info'
	ticketInfoStart.innerHTML = `Начало сеанса: <span class="ticket__details ticket__start">${window.localStorage.getItem('seanceTime')}</span>`
	ticketInfoWrapper.append(ticketInfoStart)

	const imgQR = document.createElement('div')
	imgQR.className = 'ticket__info-qr'
	imgQR.innerHTML = content(qrcode1).outerHTML
	ticketInfoWrapper.append(imgQR)

	const ticketHint1 = document.createElement('p')
	ticketHint1.className = 'ticket__hint'
	ticketHint1.innerText = 'Покажите QR-код нашему контроллеру для подтверждения бронирования.'
	ticketInfoWrapper.append(ticketHint1)

	const ticketHint2 = document.createElement('p')
	ticketHint2.className = 'ticket__hint'
	ticketHint2.innerText = 'Приятного просмотра!'
	ticketInfoWrapper.append(ticketHint2)
}	

