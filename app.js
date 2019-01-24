const api = new Api();
const ui = new UI();

const form = document.getElementById('form');

form.addEventListener('click', () => {
   const amount = document.getElementById('amount').value;
   const currency = document.getElementById('currency').value;

   if (amount === '' || currency === '') {
      ui.showFeedback('type amount properly & choose currency', 'notification is-warning');
      const resultList = document.querySelector('#result');
      resultList.innerHTML = '';
   } else {
      api.queryApi(currency).then(data => {
         // console.log(data.result.rates[0]);
         ui.displayResult(amount, currency, data.result.rates[0]);
      });
   }
});
