let value1 = window.localStorage.getItem('timestamp')
let value2 = window.localStorage.getItem('hallId')
let value3 = window.localStorage.getItem('seanceId')
let value4 = window.localStorage.getItem('hallConfig')


sendRequest(`event=sale_add&timestamp=${value1}&hallId=${value2}&seanceId=${value3}&hallConfiguration=${value4}`, (data) => {
     console.log(data)
     if(data !== null){
     	showTickets() 
     }
});

function showTickets(){

	const main = document.querySelector('main')

	const section = document.createElement('section')
	section.className = 'ticket'
	main.append(section)

	const header = document.createElement('header')
	header.className = 'tichet__check'
	header.innerHTML = '<h2 class="ticket__check-title">Вы выбрали билеты:</h2>'
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

	const ticketInfoCost = document.createElement('p')
	ticketInfoCost.className = 'ticket__info'
	ticketInfoCost.innerHTML = `Стоимость: <span class="ticket__details ticket__cost">${window.localStorage.getItem('choiceChairsSum')}</span> рублей`
	ticketInfoWrapper.append(ticketInfoCost)

	const button = document.createElement('button')
	button.className = 'acceptin-button'
	button.setAttribute('onclick', "location.href='ticket.html'")
	button.innerText = 'Получить код бронирования'
	ticketInfoWrapper.append(button)

	const ticketHint1 = document.createElement('p')
	ticketHint1.className = 'ticket__hint'
	ticketHint1.innerText = 'После оплаты билет будет доступен в этом окне, а также придёт вам на почту. Покажите QR-код нашему контроллёру у входа в зал.'
	ticketInfoWrapper.append(ticketHint1)

	const ticketHint2 = document.createElement('p')
	ticketHint2.className = 'ticket__hint'
	ticketHint2.innerText = 'Приятного просмотра!'
	ticketInfoWrapper.append(ticketHint2)
}