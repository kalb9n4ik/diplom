const navMenu = document.querySelector('nav.page-nav')
const main = document.querySelector('main')

const dayOfWeek = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
let dateIsNow = new Date()

const apiAnswer = null

let films = null;
let halls = null;
let seances = null;

let dateWithoutTime =  new Date()
dateWithoutTime.setHours(0, 0, 0, 0)
//let minutesFromStartDay = (dateIsNow - dateWithoutTime) / 60000

createNavMenu()

function createNavMenu() {
	for(let i = 0; i < 7; i++){
		let nextDay = new Date(dateWithoutTime.getTime() + (i * 24 * 60 * 60 * 1000))
		let nextDayOfWeek = dayOfWeek[nextDay.getDay()]
		let a = document.createElement('a')
		a.className = 'page-nav__day'
		a.setAttribute('href', '#')
		a.setAttribute('data-time', nextDay.getTime() / 1000)
		if(i === 0){
			a.classList.add('page-nav__day_today')
			a.classList.add('page-nav__day_chosen')
		}

		if(nextDayOfWeek === 'Сб' || nextDayOfWeek === 'Вс'){
			a.classList.add('page-nav__day_weekend')
		}

		let spanDayWeek = document.createElement('span')
		spanDayWeek.className = 'page-nav__day-week'
		spanDayWeek.innerHTML = nextDayOfWeek


		let spanNumberday = document.createElement('span')
		spanNumberday.className = 'page-nav__day-number'
		spanNumberday.innerHTML = nextDay.getDate()

		a.append(spanDayWeek)
		a.append(spanNumberday)
		navMenu.append(a)

		a.addEventListener("click", (e) => {
			e.preventDefault()
			const linkChosen = document.querySelector('a.page-nav__day_chosen')

			if(event.currentTarget !== linkChosen){
				linkChosen.classList.toggle('page-nav__day_chosen')
				event.currentTarget.classList.toggle('page-nav__day_chosen')
				showFilms(films, halls, seances)
			}			
		})
	}
}

function showFilms(film, halls, seances){
	// clear main 
	const main = document.querySelector('main')
	main.innerHTML = ''


	for(let film of films){
		let section = document.createElement('section')
		section.className = 'movie'

		let movieInfo = document.createElement('div')
		movieInfo.className = 'movie__info'

		let moviePoster = document.createElement('div')
		moviePoster.className = 'movie__poster'

		let imgMoviePoster = document.createElement('img')
		imgMoviePoster.className = 'movie__poster-image'
		imgMoviePoster.setAttribute('alt', `${film.film_name} постер`)
		imgMoviePoster.setAttribute('src', film.film_poster)

		let movieDescription = document.createElement('div')
		movieDescription.className = 'movie__description'

		let movieTitle = document.createElement('h2')
		movieTitle.className = 'movie__title'
		movieTitle.innerHTML = film.film_name

		let movieSynopsis = document.createElement('p')
		movieSynopsis.className = 'movie__synopsis'
		movieSynopsis.innerHTML = film.film_description

		let movieData = document.createElement('p')
		movieData.className = 'movie__data'

		let movieDataDuration = document.createElement('span')
		movieDataDuration.className = 'movie__data-duration'
		movieDataDuration.innerHTML = `${film.film_duration} минут `

		let movieDataOrigin = document.createElement('span')
		movieDataOrigin.className = 'movie__data-origin'
		movieDataOrigin.innerHTML = film.film_origin

		movieData.append(movieDataDuration)
		movieData.append(movieDataOrigin)

		movieDescription.append(movieTitle)
		movieDescription.append(movieSynopsis)
		movieDescription.append(movieData)

		movieInfo.append(moviePoster)
		moviePoster.append(imgMoviePoster)

		movieInfo.append(movieDescription)

		section.append(movieInfo)
		main.append(section)

		// фильтрация залов
		for(let hall of halls){
			  // фильтр сеансов
			let seancesFilm = seances.filter((n, index) => {
				if(n.seance_filmid === film.film_id && hall.hall_id === n.seance_hallid){
					return true
				}
			})

		 // отображение залов
		if(seancesFilm.length > 0){
			let movieSeanceHall = document.createElement('div')
			movieSeanceHall.className = 'movie-seances__hall'
			section.append(movieSeanceHall)

			let movieSeanceHallTitle = document.createElement('h3')
			movieSeanceHallTitle.className = 'movie-seances__hall-title'
			movieSeanceHallTitle.innerHTML = hall.hall_name.slice(0, 3) + ' ' + hall.hall_name.slice(3)
			movieSeanceHall.append(movieSeanceHallTitle)

			let movieSeancesList = document.createElement('ul')
			movieSeancesList.className = 'movie-seances__list'
			movieSeanceHall.append(movieSeancesList)

		  // отображение сеанса
			for(let seanceFilm of seancesFilm){

				let movieSeancesTimeBlock = document.createElement('li')
				movieSeancesTimeBlock.className = 'movie-seances__time-block'

				let movieSeancesTime = document.createElement('a')
				movieSeancesTime.className = 'movie-seances__time'
				movieSeancesTime.setAttribute('href', 'hall.html')
				//movieSeancesTime.setAttribute('data-timestamp', `${seanceFilm.seance_start}`)
				movieSeancesTime.setAttribute('data-hallId', `${seanceFilm.seance_hallid}`)
				movieSeancesTime.setAttribute('data-seanceId', `${seanceFilm.seance_id}`)
				movieSeancesTime.setAttribute('data-seance_start', `${seanceFilm.seance_start}`)
				movieSeancesTime.setAttribute('data-seance_time', `${seanceFilm.seance_time}`)
				movieSeancesTime.setAttribute('data-filmName', `${film.film_name}`)
				movieSeancesTime.setAttribute('data-hallName', `${hall.hall_name.slice(0, 3) + ' ' + hall.hall_name.slice(3)}`)
				movieSeancesTime.setAttribute('data-hallConfig', `${hall.hall_config}`)
				movieSeancesTime.setAttribute('data-hallPriceStandart', `${hall.hall_price_standart}`)
				movieSeancesTime.setAttribute('data-hallPriceVip', `${hall.hall_price_vip}`)

				movieSeancesTime.innerHTML = seanceFilm.seance_time


				const timeDay = document.querySelector('.page-nav__day_chosen').getAttribute('data-time')
				if(dateIsNow.getTime() / 1000 < Number(timeDay) + Number(seanceFilm.seance_start)*60){
					movieSeancesTime.addEventListener('click', (e) => {
						window.localStorage.setItem('timestamp', Number(timeDay) + Number(seanceFilm.seance_start)*60)
						saveDataInLocalSrorage(e.target)
					})
				} else {
					movieSeancesTime.classList.add('movie-seances__time-disabled')
					movieSeancesTime.removeAttribute('href')
					
				}

				movieSeancesTimeBlock.append(movieSeancesTime)
				movieSeancesList.append(movieSeancesTimeBlock)
			}
		}
	}
	}
}

function saveDataInLocalSrorage(click){
	window.localStorage.setItem('filmName', click.getAttribute('data-filmName'))
	window.localStorage.setItem('seanceTime', click.getAttribute('data-seance_time'))
	window.localStorage.setItem('hallName', click.getAttribute('data-hallName'))

	window.localStorage.setItem('seanceStart', click.getAttribute('data-seance_start'))
	window.localStorage.setItem('hallId', click.getAttribute('data-hallId'))
	window.localStorage.setItem('seanceId', click.getAttribute('data-seanceId'))
	window.localStorage.setItem('hallConfig', click.getAttribute('data-hallConfig'))

	window.localStorage.setItem('hallPriceStandart', click.getAttribute('data-hallPriceStandart'))
	window.localStorage.setItem('hallPriceVip', click.getAttribute('data-hallPriceVip'))

	//const timestamp = 
	
}

sendRequest('event=update', (data) => {

	halls = data.halls.result.filter((n, index) => {
		if(n.hall_open === '1') {
			return true
		}
	})
	films = data.films.result
	seances = data.seances.result
	showFilms(films, halls, seances)
});