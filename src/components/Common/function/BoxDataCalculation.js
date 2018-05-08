import {connect} from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

export function boxDataCalculation(data) {

    let subscriptions = 0;
    let redemptions = 0;
    let netFlow = 0;
    let cashSells = 0;
    let cashBuys = 0;
    var boxData = [];

    console.log('data cash:' + data[0].cash);
    if (data.length) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].cash && data[i].cash.length) {
                for (var j = 0; j < data[i].cash.length; j++) {
                    if (data[i].cash[j] >= 0) {
                        cashBuys = parseFloat(cashBuys) + parseFloat(data[i].cash[j]);
                    }
                    else {
                        cashSells = parseFloat(cashSells) + parseFloat(data[i].cash[j]);
                    }
                }
            }
            //cashSells=cashSells*(-1);
            console.log(cashSells);
            subscriptions = cashBuys + parseFloat(subscriptions) + parseFloat(data[i].unitsPurchased) * parseFloat(data[i].roundedPrice);
            redemptions = cashSells + parseFloat(redemptions) + parseFloat(data[i].unitsSold) * parseFloat(data[i].roundedPrice);
            netFlow = parseFloat(subscriptions) + parseFloat(redemptions);
            console.log('box:subscriptions:' + subscriptions + 'redemptions:' + redemptions + 'netFlow:' + netFlow);
            subscriptions = parseFloat(subscriptions).toFixed(4);
            redemptions = parseFloat(redemptions).toFixed(4);
            netFlow = parseFloat(netFlow).toFixed(4);
            // subscriptions = parseFloat(10000).toFixed(4);
            // redemptions = parseFloat(15000).toFixed(4);
            // netFlow=subscriptions-redemptions;
            netFlow = parseFloat(netFlow).toFixed(4);

        }
    }
    boxData.push({
        "subscriptions": subscriptions,
        "redemptions": redemptions,
        "netFlow": netFlow
    })
    //console.log(boxData);
    return boxData
}


export function convertCurrency(currency) {
    return (
        <label className="">
    {new Intl.NumberFormat('en-GB', {
      style: 'currency',
        currency: 'GBP'
    }).format(currency)}
    </label>
    )
}
