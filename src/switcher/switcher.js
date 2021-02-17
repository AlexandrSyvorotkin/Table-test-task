import React from 'react';
import './switcher.css'

const Switcher = ({buttonHandler}) => {
    const bigUrl = 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'
    const smallUrl = 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'
    return (
        <div className="ButtonsBlock">
            <button className="btn btn-danger" onClick={()=> (buttonHandler(smallUrl))}>SmallData</button>
            <button className="btn btn-warning" onClick={()=> (buttonHandler(bigUrl))}>BigData</button>
        </div>
    )
}

export default Switcher
