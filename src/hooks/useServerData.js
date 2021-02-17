import {useState, useEffect} from 'react';
import axios from 'axios'


const useServerData = ({url, isButtonClick}) => {

// const baseUrl = 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'


const [contactData, setContactData] = useState([]); /* state для данных */
const [isLoading, setisLoading] = useState(false); /* state для лоадера */
const [isLoaded, setIsLoaded] = useState(false); /* state для пагинатора и вывода данных */

const getData= () => {

}


    useEffect(() => {
        if (!isButtonClick) {
            return 
        }
        setisLoading(true)
        axios.get(url).then((res) => {
                setContactData(res.data);
                setisLoading(false)
                setIsLoaded(true)
            });
    }, [url, isButtonClick]);


    return [{contactData, isLoading, setContactData, setisLoading, isLoaded}, getData]
}

export default useServerData;