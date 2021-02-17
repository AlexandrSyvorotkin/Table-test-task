import React from 'react';


const DetailedItem = ({detailItemData}) => {

    const AddressCity = detailItemData && detailItemData.address ? detailItemData.address.city : null  
    const AddressstreetAddres = detailItemData && detailItemData.address ? detailItemData.address.streetAddress : null  // Решение проблемы доступа до вложенных элементов обьекта 
    const AddressState = detailItemData && detailItemData.address ? detailItemData.address.state : null
    const AddressZip = detailItemData && detailItemData.address ? detailItemData.address.zip : null

    return (
        <div> 
            <div>
                id: <b>{detailItemData.id}</b>
            </div>
            <div>
                firstname: <b>{detailItemData.firstName}</b>
            </div>
            <div>
                lastname: <b>{detailItemData.lastName}</b>
            </div>
            <div>
                email: <b>{detailItemData.email}</b>
            </div>
            <div>
                phone: <b>{detailItemData.phone}</b>
            </div>
            <div>
                streetAddress: <b>{AddressstreetAddres}</b>
            </div>
            <div>
                city: <b>{AddressCity}</b>
            </div>
            <div>
                state: <b>{AddressState}</b>
            </div>
            <div>
                zip: <b>{AddressZip}</b>
            </div>
            <div>
                description: <p><b>{detailItemData.description}</b></p>
            </div>
            
        </div>
    )
}

export default DetailedItem;