let value1 = window.localStorage.getItem('timestamp')
let value2 = window.localStorage.getItem('hallId')
let value3 = window.localStorage.getItem('seanceId')


sendRequest(`event=get_hallConfig&timestamp=${value1}&hallId=${value2}&seanceId=${value3}`, (data) => {
    showInfo(data) 
});

function showInfo(data){
	const main = document.querySelector('main')

	let section = document.createElement('section')
	section.className = 'buying'
	main.append(section)

	let buyingInfo = document.createElement('div')
	buyingInfo.className = 'buying__info'
	section.append(buyingInfo)

	let buyingInfoDescription = document.createElement('div')
	buyingInfoDescription.className = 'buying__info-description'
	buyingInfo.append(buyingInfoDescription)

	let buyingInfoTitle = document.createElement('h2')
	buyingInfoTitle.className = 'buying__info-title'
	buyingInfoTitle.innerHTML = window.localStorage.getItem('filmName')
	buyingInfoDescription.append(buyingInfoTitle)

	let buyingInfoStart = document.createElement('p')
	buyingInfoStart.className = 'buying__info-start'
	buyingInfoStart.innerHTML = `Начало сеанса: ${window.localStorage.getItem('seanceTime')}`
	buyingInfoDescription.append(buyingInfoStart)

	let buyingInfoHall = document.createElement('p')
	buyingInfoHall.className = 'buying__info-hall'
	buyingInfoHall.innerHTML = window.localStorage.getItem('hallName')
	buyingInfoDescription.append(buyingInfoHall)

	let buyingInfoHint = document.createElement('div')
	buyingInfoHint.className = 'buying__info-hint'
	buyingInfo.append(buyingInfoHint)

	// block zoom
	let buyingInfoHintText = document.createElement('p')
	buyingInfoHintText.innerHTML = 'Тапните дважды, <br> чтобы увеличить'
	buyingInfoHint.append(buyingInfoHintText)

	// block with conf
	let confStep = document.createElement('div')
	confStep.className = 'conf-step'
	section.append(confStep)

	let confStepWrapper = document.createElement('div')
	confStepWrapper.className = 'conf-step__wrapper'
	confStep.append(confStepWrapper)

	if(data !== null) {
		confStepWrapper.innerHTML = data
	} else {
		confStepWrapper.innerHTML = window.localStorage.getItem('hallConfig')
	}

	// block legend
	let confStepLegend = document.createElement('div')
	confStepLegend.className = 'conf-step__legend'
	confStep.append(confStepLegend)

	let colLeft = document.createElement('div')
	colLeft.className = 'col'
	colLeft.innerHTML = `<p class="conf-step__legend-price"><span class="conf-step__chair conf-step__chair_standart"></span> Свободно (<span class="conf-step__legend-value price-standart">${window.localStorage.getItem('hallPriceStandart')}</span>руб)</p><p class="conf-step__legend-price"><span class="conf-step__chair conf-step__chair_vip"></span> Свободно VIP (<span class="conf-step__legend-value price-vip">${window.localStorage.getItem('hallPriceVip')}</span>руб)</p>`
	confStepLegend.append(colLeft)

	let colRight = document.createElement('div')
	colRight.className = 'col'
	colRight.innerHTML = '<p class="conf-step__legend-price"><span class="conf-step__chair conf-step__chair_taken"></span> Занято</p><p class="conf-step__legend-price"><span class="conf-step__chair conf-step__chair_selected"></span> Выбрано</p>'
	confStepLegend.append(colRight)

	// button
	let btn = document.createElement('button')
	btn.className = 'acceptin-button'
	btn.innerText = 'Забронировать'
	section.append(btn)

	// listener button booking
	btn.addEventListener('click', () => {
		if(writeChoiceChairs()){
			window.open('payment.html', '_self')
		}
	})

	// listener chairs
	const chairs = document.querySelectorAll('.conf-step .conf-step__wrapper span.conf-step__chair')

	for(let chair of chairs){
		chair.addEventListener('click', (e) => {
			if(!e.target.classList.contains('conf-step__chair_taken')){
				e.target.classList.toggle('conf-step__chair_selected')
			}
		})
	}
	//console.log(data)
}

function writeChoiceChairs(){
	const choiceChairs = []
	let choiceChairsSum = 0

	const rows = document.querySelectorAll('.conf-step .conf-step__wrapper .conf-step__row')
	rows.forEach((row, i) => {
		const columns = row.querySelectorAll('.conf-step__chair')
		columns.forEach((column, j) => {
			if(column.classList.contains('conf-step__chair_selected')){
				choiceChairs.push(`${i + 1}/${j + 1}`)
				if(column.classList.contains('conf-step__chair_standart')){
					choiceChairsSum += Number(window.localStorage.getItem('hallPriceStandart'))
				} else {
					choiceChairsSum += Number(window.localStorage.getItem('hallPriceVip'))
				}
			}
		})
		
	})
	window.localStorage.setItem('choiceChairs', choiceChairs.join(', '))
	window.localStorage.setItem('choiceChairsSum', choiceChairsSum)

	// write hallConfig in localStorage
	const hallConfig =  document.querySelector('.conf-step__wrapper')
	window.localStorage.setItem('hallConfig', hallConfig.innerHTML)
	if(choiceChairs.length > 0){
		return true
	} else {
		return false
	}
}
