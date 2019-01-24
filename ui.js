class UI {
   constructor() {
      this.init();
   }

   init() {
      this.populateCurrencies();
   }

   populateCurrencies() {
      api.getCurrenciesList().then(data => {
         // console.log(data);
         const currencies = data.currencies[0].rates;
         // console.log(currencies);

         const select = document.getElementById('currency');

         currencies.forEach(currency => {
            const option = document.createElement('option');
            option.value = currency.code;
            option.appendChild(document.createTextNode(currency.currency));
            // option.style.textAlign = 'center';
            select.appendChild(option);
         });

         //€ selected as default
         document.querySelector("#currency option[value='EUR']").selected = true;
      });
   }

   showFeedback(info, className) {
      const div = document.createElement('div');
      div.className = className;
      div.appendChild(document.createTextNode(info));

      const feedbackDiv = document.querySelector('#feedback');
      feedbackDiv.appendChild(div);

      setTimeout(() => {
         document.querySelector('#feedback div').remove();
      }, 1800);
   }

   displayResult(amount, currency, result) {
      // console.log(result);

      //rocket science calculations
      let calcAmount = amount / result.mid;
      calcAmount = Math.round(calcAmount * 100) / 100;

      const time = new Date();
      const hours = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
      const minutes = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
      const seconds = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();

      let insertHTML = '';
      insertHTML += `
      <div class="notification is-info ">
         <p class="is-size-2">${amount} PLN = ${calcAmount} ${currency}</p>
         <hr/>
         <div class="columns">
            <div class="column"><i class="far fa-calendar-check"></i> ${result.effectiveDate}</div>
            <div class="column">Rate: ${result.mid}</div>
            <div class="column"><i class="far fa-clock"></i> ${hours}:${minutes}:${seconds}</div>
         </div>
      </div>
      `;

      const resultList = document.querySelector('#result');
      resultList.innerHTML = insertHTML;
   }
}
