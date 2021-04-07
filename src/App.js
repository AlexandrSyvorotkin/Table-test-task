import React, { useState, useEffect } from "react";
import useServerData from "./hooks/useServerData";
import Switcher from "./switcher/switcher";
import Tablebody from "./tablebody/tablebody";
import Paginator from "./paginator/paginator";

function App() {
    const [isButtonClick, setIsButtonClick] = useState(false);
    const [directionSort, setDirectionSort] = useState(true);
    const [rowItem, setrowItem] = useState("");
    const [url, setUrl] = useState("");
    const [totalCountRow, setTotalCountRow] = useState(0);
    const [totalCountPage, setTotalCountPage] = useState(0);
    const [rowIsClick, setrowIsClick] = useState(false);
    const limitCountPage = 50;
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const [buttonNextDisabled, setbuttonNextDisabled] = useState("page-item");
    const [buttonPrevDisabled, setbuttonPrevDisabled] = useState("page-item");
    const [currentPageActive, setCurrentPageActive] = useState("page-item");
    const [searchText, setSearchText] = useState("");
    const [newRow, setNewRow] = useState({});

    const [
        { contactData, isLoading, setContactData, isLoaded },
    ] = useServerData({
        url,
        isButtonClick,
    });

    const buttonHandler = (url) => {
        setUrl(url);
        setIsButtonClick(true);
    };

    const getFiltedData = () => {
        if (!searchText) {
            return contactData;
        }
        return contactData.filter((el) => {
            return (
                el["firstName"]
                    .toLowerCase()
                    .includes(searchText.toLowerCase()) ||
                el["lastName"]
                    .toLowerCase()
                    .includes(searchText.toLowerCase()) ||
                el["email"].toLowerCase().includes(searchText.toLowerCase())
            );
        });
    };

    const filtedData = getFiltedData();

    const lastBlockRow = currentPageNumber * limitCountPage;
    const firstBlockRow = lastBlockRow - limitCountPage + 1;
    const currentBlockRows = filtedData.slice(firstBlockRow, lastBlockRow);

    const getInputFormData = ({ id, firstName, lastName, email, phone }) => {
        setNewRow({ id, firstName, lastName, email, phone });
    };

    currentBlockRows.unshift(newRow);

    const currentPage = (pg) => {
        setCurrentPageNumber(pg);
        setbuttonPrevDisabled("");
        setbuttonNextDisabled("");
        setCurrentPageActive("active");
    };

    useEffect(() => {
        if (!isLoaded) {
            return;
        }

        setTotalCountRow(filtedData.length);
        const getTotalCountPage = Math.ceil(totalCountRow / limitCountPage);
        setTotalCountPage(getTotalCountPage);
    }, [isLoaded, setTotalCountRow, filtedData.length, totalCountRow]);

    let pages = [];
    for (let i = 1; i <= totalCountPage; i++) {
        pages.push(i);
    }

    const onSearchSend = (text) => {
        setSearchText(text);
    };

    const sortData = (field) => {
        const copyData = contactData.concat();
        let sortData;
        if (directionSort) {
            sortData = copyData.sort((a, b) => {
                return a[field] > b[field] ? 1 : -1;
            });
        }
        sortData = copyData.reverse((a, b) => {
            return a[field] > b[field] ? 1 : -1;
        });
        setContactData(sortData);
        setDirectionSort(!directionSort);
    };

    const detailRow = (row) => {
        setrowIsClick(true);
        setrowItem(row);
    };

    const onNextClick = () => {
        if (currentPageNumber > totalCountPage - 1) {
            setbuttonNextDisabled("disabled");
            return;
        }
        setCurrentPageNumber(currentPageNumber + 1);
    };

    const onPrevClick = () => {
        if (currentPageNumber < 2) {
            setbuttonPrevDisabled("disabled");
            return;
        }
        setCurrentPageNumber(currentPageNumber - 1);
    };

    return (
        <div className='container'>
            {!isButtonClick ? (
                <Switcher buttonHandler={buttonHandler} />
            ) : (
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
            )}
            {isLoaded && totalCountRow > limitCountPage && (
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
            )}
        </div>
    );
}

export default App;
