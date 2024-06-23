const createContainer = () => {
  const div = document.createElement("div");
  div.classList.add("container");
  div.classList.add("flex-center");
  document.body.appendChild(div);
  return div;
};
const container = createContainer();

const createButton = () => {
  const button = document.createElement("button");
  button.id = "getCurrencies";
  button.innerText = "Pobierz waluty";
  button.classList.add("margin");
  button.classList.add("padding");
  container.appendChild(button);
  return button;
};
let currencies = {};
const getCurrencyList = createButton();
const errorInfo = document.createElement("p");
errorInfo.innerText = "Wystąpił błąd podczas pobierania danych. Spróbuj ponownie później.";

getCurrencyList.addEventListener("click", () => {
  const apiURL = "https://api.frankfurter.app/latest?from=PLN";
  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      const rates = data?.rates;
      if (rates) {
        currencies = rates;
        getCurrencyList.disabled = true;
        const label = document.createElement("label");
        label.setAttribute("for", "currency-select");
        label.innerText = "Wybierz walutę";
        label.classList.add("margin");
        container.appendChild(label);
        
        const select = document.createElement("select");
        select.id = "currency-select";
        for (const [currency] of Object.entries(rates)) {
          const option = document.createElement("option");
          option.value = currency;
          option.innerText = currency;
          option.classList.add("padding");
          select.appendChild(option);
        }
        container.appendChild(select);

        const rateInfo = document.createElement("h1");
        rateInfo.id = "rate-info";
        rateInfo.setAttribute("data-test", "currency-value");
        container.appendChild(rateInfo);

        select.addEventListener("change", (event) => {
          const selectedCurrency = event.target.value;
          const selectedRate = rates[selectedCurrency];
          rateInfo.innerText = `1 PLN kosztuje ${selectedRate} ${selectedCurrency}.`;
        });
      } else {
        container.appendChild(errorInfo);
      }
    })
    .catch((err) => {
      console.error(err);
      container.appendChild(errorInfo);
    });
});
