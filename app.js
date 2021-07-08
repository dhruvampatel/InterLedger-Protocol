const fetch = require('node-fetch');
const axios = require('axios');

const SENDER_POINTER = 'dhruvampatel';
const SENDER_BEARER = 'OWI2Y2ViY2EtMzZhNS00NzhlLTk5YmQtZmY3NjUyOWU2ZGY0';
const DESTINATION_POINTER = "dhruvampatel33@gmail.com";
const DESTINATION_BEARER = 'Zwq8Po9L3stWamj3pCyIPJ_JbT8_86A7fqvhQ45DpBA.yJYrSLenMi1uvK5tUxDqAId5ht_EvwUTRJdxUWvIavs';

const getBalance = async (msg) => {
    console.log(msg);

    const response = await axios.get(`https://ripplex.io/portal/ilp/hermes/accounts/${SENDER_POINTER}/balance`, {
        headers: {
            'Authorization': `Bearer ${SENDER_BEARER}`
        }
    });

    console.log(`Balance of sender ${SENDER_POINTER}: ${response.data.accountBalance.netBalance}`);
}

const sendMoney = async (amount) => {
    const response = await axios.post(`https://ripplex.io/portal/ilp/hermes/accounts/${SENDER_POINTER}/pay`, {
        amount: amount,
        destinationPaymentPointer: `$rafiki.money/p/${DESTINATION_POINTER}`
    }, {
        headers: {
            'Authorization': `Bearer ${SENDER_BEARER}`
        }
    });

    console.log(`\nAmount sent to ${DESTINATION_POINTER}: ${response.data.originalAmount}`);

    getBalance(`\nBalance after sending\n---------------------`);

    receiveMoney();
}

const receiveMoney = async () => {
    const response = await axios.post("https://rafiki.money/api//payments/peer", {
        accountId: 1222,
        amount: "1000000",
        receiverPaymentPointer: `$ripplex.money/${SENDER_POINTER}`,
        type: "spsp"
    }, {
            headers: { 'Authorization': `Bearer ${DESTINATION_BEARER}` }
        }
    );

    console.log(response.data.sent);
}

getBalance(`Balance before sending\n----------------------`);
sendMoney(10000);
