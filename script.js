(function(){
    //UI varibales
    const balance = document.getElementById('balance');
    const money_plus = document.getElementById('money-plus');
    const money_minus = document.getElementById('money-minus');
    const list = document.getElementById('list');
    const form = document.getElementById('form');
    const text = document.getElementById('text');
    const amount = document.getElementById('amount');


    const dummyTransactions = [
        {id: 1, text: 'Flower', amount: -20},
        {id: 2, text: 'Camera', amount: 300},
        {id: 3, text: 'Iphone', amount: -50},
        {id: 4, text: 'Car', amount: 150},
    ];

    let transactions = dummyTransactions;

    //add Transaction to DOM
    function addTranscationDOM(transaction) {
        //getSign
        const sign = transaction.amount < 0 ? '-': '+';

        //creat the li
        const item = document.createElement('li');
        
        //add class based on value;
        item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

        item.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}
        </span> <button class="delete-btn">X</button>
        `;

        list.appendChild(item);
    }

    //Add a Transaction
    function addTranscation(e){
        if(text.value.trim() === '' || amount.value.trim() === ''){
            alert('Please enter a Transcation and Amount');
        } else {
            const transaction = {
                id: generateID,
                text: text.value,
                amount: +amount.value
            };

            transactions.push(transaction)
            addTranscationDOM(transaction);
            updateValues();
            text.value = '';
            amount.value = '';
        }


        e.preventDefault();
    }

    function generateID(){
        return Math.floor(Math.random() * 1000000000)
    }

    //Init App
    init()
    function init(){
        list.innerHTML = '';
        transactions.forEach(addTranscationDOM);
        updateValues();
    }

    //Update the balance
    function updateValues(){
        const amounts = transactions.map(transaction => transaction.amount);
        const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
        
        const income = amounts
                        .filter(item => item > 0)
                        .reduce((acc, item) => (acc += item), 0)
                        .toFixed(2);

        const expense = (amounts
                         .filter(item => item < 0)
                         .reduce((acc, item) => (acc += item), 0) * -1)
                         .toFixed(2);

        balance.innerHTML = ` £ ${total}`;
        money_plus.innerHTML = ` ${income}`;
        money_minus.innerHTML = ` ${expense}`;
    }

    form.addEventListener('submit', addTranscation);


})()