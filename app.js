const fetch = require('node-fetch');
const axios = require('axios');

const USER_ID = 'dhruvampatel';
const DESTINATION_POINTER = "dhruvampatel33@gmail.com";
const TOKEN = 'OWI2Y2ViY2EtMzZhNS00NzhlLTk5YmQtZmY3NjUyOWU2ZGY0';

const getBalance = async (msg) => {
    console.log(msg);

    const response = await axios.get(`https://ripplex.io/portal/ilp/hermes/accounts/${USER_ID}/balance`, {
        headers: {
            'Authorization': `Bearer ${TOKEN}`
        }
    });

    console.log(`Balance of sender ${USER_ID}: ${response.data.accountBalance.netBalance}`);
}

const sendMoney = async (amount) => {
    const response = await axios.post(`https://ripplex.io/portal/ilp/hermes/accounts/${USER_ID}/pay`, {
        amount: amount,
        destinationPaymentPointer: `$rafiki.money/p/${DESTINATION_POINTER}`
    }, {
        headers: {
            'Authorization': `Bearer ${TOKEN}`
        }
    });

    console.log(`\nAmount sent to ${DESTINATION_POINTER}: ${response.data.originalAmount}`);

    getBalance(`\nBalance after sending\n---------------------`);
}

getBalance(`Balance before sending\n----------------------`);
sendMoney(10000);
