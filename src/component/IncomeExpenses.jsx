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

const IncomeExpenses = () => {

    {/**Uses the useContext hook to access the transactions property from the GlobalContext.
 This allows the IncomeExpenses component to access the global state containing the transaction data. */}

    const { transactions } = useContext(GlobalContext);

    {/**Checks if transactions is defined (not null or undefined) and then maps over the transactions to create an array of amounts. */ }

    const amounts = transactions && transactions.map(transaction => transaction.amount);

    {/**Checks if amounts is defined and then filters the amounts array to get only positive values (income). It then reduces the filtered array to calculate the total income. */ }
    const income = amounts && amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0);

    {/**Checks if amounts is defined and then filters the amounts array to get only negative values (expenses). 
    It then reduces the filtered array to calculate the total expenses. The total expenses are multiplied by -1 
to make it a positive value. */}

    const expense = amounts && (
        amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
        -1
    );

    {/**Renders the component UI, displaying the total income and total expenses using the moneyFormatter function to format the values. */ }
    return (
        <div className="inc-exp-container">
            <div>
                <h4>Income</h4>
                <p className="money plus">{moneyFormatter(income)}</p>
            </div>
            <div>
                <h4>Expense</h4>
                <p className="money minus">{moneyFormatter(expense)}</p>
            </div>
        </div>
    )
}

export default IncomeExpenses
