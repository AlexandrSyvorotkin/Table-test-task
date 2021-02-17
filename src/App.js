import React, {useState, useEffect} from 'react'
import useServerData from './hooks/useServerData';
import Switcher from './switcher/switcher';
import Tablebody from './tablebody/tablebody';
import Paginator from './paginator/paginator'

function App() {

// const [contactData, setcontactData] = useState([]); /* Хук для данных */
// const [isLoading, setisLoading] = useState(true); /* Хук для лоадера */
const [isButtonClick, setIsButtonClick] = useState(false) /* state для переключения загрузки данных */
const [directionSort, setDirectionSort] = useState(true); /* state для сортировки */
const [rowItem, setrowItem] = useState(''); /* state для вывода данных json по клику на строку с id */
const [url, setUrl] = useState('') /* state для передачи url из компонента для вывода либо больших данных либо маленьких*/
const [totalCountRow, setTotalCountRow] = useState(0) /* state для пагинации страниц */
const [totalCountPage, setTotalCountPage] = useState(0) /* state для пагинации страниц */
const [rowIsClick, setrowIsClick] = useState(false) /* state для вывода детализированого состояния строки в отдельный отображающийся блок */
const limitCountPage = 50 /* Переменная для пагинации страниц */
const [currentPageNumber, setCurrentPageNumber] = useState(1) /* state для работы плагинации (перемотки страниц) */
const [buttonNextDisabled, setbuttonNextDisabled] = useState('page-item') /* state для нумерации страниц при плагинации 'вперед' */
const [buttonPrevDisabled, setbuttonPrevDisabled] = useState('page-item') /* state для нумерации страниц при плагинации 'назад' */
const [currentPageActive, setCurrentPageActive] = useState('page-item') /* state для отображения активного класса в плагинации */
const [searchText, setSearchText] = useState('') /* state для фильтрации данных введенных в форму */
const [newRow, setNewRow] = useState({})/* state для добавления данных из формы в общую таблицу */

const [{contactData, isLoading, setContactData, isLoaded}, ] = useServerData ({url, isButtonClick}); /* кастомный хук для изоляции логики отвественной за запрос данных*/



const buttonHandler = (url) => {  /* Обработчик события на клик для вывода большого или малого кол-ва данных */
	setUrl(url)
	setIsButtonClick(true)
}

const getFiltedData = () => {
	if (!searchText) {
		return contactData
	}
	return contactData.filter(
		el=> {
		return el['firstName'].toLowerCase().includes(searchText.toLowerCase())
		|| el['lastName'].toLowerCase().includes(searchText.toLowerCase())
		|| el['email'].toLowerCase().includes(searchText.toLowerCase())
		}
	)
}

const filtedData = getFiltedData()

const lastBlockRow = currentPageNumber*limitCountPage
const firstBlockRow = lastBlockRow - limitCountPage+1    /* Обработка массива данных для пагинации страниц */
const currentBlockRows = filtedData.slice(firstBlockRow, lastBlockRow)

const getInputFormData = ({id, firstName, lastName , email, phone}) => {
	setNewRow({id, firstName, lastName , email, phone})
}

currentBlockRows.unshift(newRow)


const currentPage = (pg) => {
	setCurrentPageNumber(pg)
	setbuttonPrevDisabled('')
	setbuttonNextDisabled('')
	setCurrentPageActive('active')
}

useEffect(() => { /* хук для пагинации страниц */
	if (!isLoaded) {
		return
	}
	
	setTotalCountRow(filtedData.length)
	const getTotalCountPage = Math.ceil(totalCountRow/limitCountPage)
	setTotalCountPage(getTotalCountPage)

}, [isLoaded, setTotalCountRow, filtedData.length, totalCountRow])

let pages = []
for (let i=1; i<=totalCountPage; i++) {
	pages.push(i)
}

const onSearchSend = (text) => {
	setSearchText(text)
}

const sortData = (field) => { /* Сортировка строк */
	
	const copyData = contactData.concat(); 
	let sortData;
	if (directionSort) {
	sortData = copyData.sort(
		(a, b) => {return a[field] > b[field] ? 1 : -1 }
	)
	} sortData = copyData.reverse(
	(a, b) => {return a[field] > b[field] ? 1 : -1 }
	)			
	setContactData(sortData);   /* функция из хука которая обновляет данные согласно сортировке */
	setDirectionSort(!directionSort);
}

	
const detailRow = (row) => {
	setrowIsClick(true)
	setrowItem(row);
}

const onNextClick = () => {
	if (currentPageNumber>totalCountPage-1) {
		setbuttonNextDisabled('disabled')
		return 
	}
	setCurrentPageNumber(currentPageNumber+1)
}

const onPrevClick = () => {
	if (currentPageNumber<2) {
		setbuttonPrevDisabled('disabled')
		return 
	}
	setCurrentPageNumber(currentPageNumber-1)
}




	return (
		<div className="container">
			{
				!isButtonClick ? <Switcher buttonHandler={buttonHandler}/> :
				<Tablebody
					getInputFormData={getInputFormData}
					contactData={currentBlockRows}
					sortData={sortData}
					rowItem={rowItem}
					directionSort={directionSort}
					detailItemData={rowItem}
					detailRow={detailRow}
					isLoading={isLoading}
					rowIsClick={rowIsClick}
					onSearchSend={onSearchSend}
				/>
			}
			{ isLoaded && (totalCountRow>limitCountPage) &&
				<Paginator 
				pages={pages}
				currentPage={currentPage}
				onNextClick={onNextClick}
				onPrevClick={onPrevClick}
				buttonNextDisabled={buttonNextDisabled}
				buttonPrevDisabled={buttonPrevDisabled}
				currentPageActive={currentPageActive}
				currentPageNumber={currentPageNumber}
			/>
			}
		</div>
	);
}

export default App;

