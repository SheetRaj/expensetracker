import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState';

//Money formatter function
function moneyFormatter(num) {
    if (typeof num !== 'number') {
        return ''; // or handle the error in an appropriate way
    }
    let p = num.toFixed(2).split('.');
    return (
        '₹ ' + (p[0].split('')[0] === '-' ? '-' : '') +
        p[0]
            .split('')
            .reverse()
            .reduce(function (acc, num, i, orig) {
                return num === '-' ? acc : num + (i && !(i % 3) ? ',' : '') + acc;
            }, '') +
        '.' +
        p[1]
    );
}


const Balance = () => {
    const { transactions } = useContext(GlobalContext);
    const amounts = transactions && transactions.map(transaction => transaction.amount);

    const total = amounts && amounts.reduce((acc, item) => (acc += item), 0);
    const totalColor = total < 0 ? "red" : "green";
    return (
        <>
            <h4>Your Balance</h4>
            <h1 style={{ color: totalColor }}>{moneyFormatter(total)}</h1>
        </>
    )
}

export default Balance
