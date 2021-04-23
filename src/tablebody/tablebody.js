import React, {Fragment} from 'react';
import Table from './../table/table';
import Loader from './../loader/loader';
import InputFrom from '../inputFrom/inputForm';


const tableBody = ({contactData, sortData, directionSort, detailRow, detailItemData, isLoading, rowIsClick, onSearchSend, getInputFormData}) => {
    return (
        
            isLoading ? <Loader/> :
        <Fragment>
            <InputFrom getInputFormData={getInputFormData}/>
            <Table 
                contactData={contactData} 
                sortData={sortData} 
                directionSort={directionSort}
                detailRow={detailRow}
                detailItemData={detailItemData}
                rowIsClick={rowIsClick}
                onSearchSend={onSearchSend}
                />
                
        </Fragment>
            
    )
}

export default tableBody
