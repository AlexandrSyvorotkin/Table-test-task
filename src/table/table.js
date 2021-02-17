import React, {useState} from 'react';
import ArrowUp from '../svg arrows/arrowUp';
import ArrowDown from '../svg arrows/arrowDown';
import DetailedItem from './../detailItem/detailitem';
import Search from '../search/seacrh'

const Table = ({sortData, contactData, directionSort, detailRow, detailItemData, rowIsClick, onSearchSend}) => {

	const [fieldData, setFieldData] = useState(''); /* Используем хук useState чтобы решить проблему сортировки в стобцах используя поле field */


	const Arrow = () => {
		return (
			directionSort ? <ArrowDown/> : <ArrowUp/>
		)
	}

	const fieldSortData = (field) => {
		sortData(field)
		setFieldData(field)
	} 

    return (
        <div>
			<Search onSearchSend={onSearchSend}/>
			<table className="table">
				<thead>
					<tr>
						<th 
							onClick={()=> {fieldSortData('id')}}>
							id { fieldData==='id' ? <Arrow/> : null}
						</th>
						<th onClick={()=> {fieldSortData('firstName')}}>
							FirstName { fieldData==='firstName' ? <Arrow/> : null}
						</th>
						<th onClick={()=> {fieldSortData('lastName')}}>
							LastName  { fieldData==='lastName' ? <Arrow/> : null}
						</th>
						<th onClick={()=> {fieldSortData('email')}}>
							email  { fieldData==='email' ? <Arrow/> : null}
						</th>
						<th onClick={()=> {fieldSortData('phone')}}>
							Phone  { fieldData==='phone' ? <Arrow/> : null}
						</th>
					</tr>
				</thead>

				<tbody>
					{contactData.map(
					item=> (
					<tr key={item.id+ item.email} onClick={() => detailRow(item)}>
					<td>{item.id}</td>
					<td>{item.firstName}</td>
					<td>{item.lastName}</td>
					<td>{item.email}</td>
					<td>{item.phone}</td>
					</tr>
				))}
				</tbody>
			</table>
			{rowIsClick ? <DetailedItem 
				detailItemData={detailItemData}/> : null}
		</div>
    );
}

export default Table;