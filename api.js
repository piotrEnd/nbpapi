// http://api.nbp.pl/en.html

class Api {
   async queryApi(currency) {
      const url = await fetch(`http://api.nbp.pl/api/exchangerates/rates/a/${currency}/`);

      const result = await url.json();
      return {
         result
      };
   }

   async getCurrenciesList() {
      // delay until downloaded
      const url = await fetch('http://api.nbp.pl/api/exchangerates/tables/a/');

      const currencies = await url.json();
      return {
         currencies
      };
   }
}
