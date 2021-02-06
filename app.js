const selectFrom = document.querySelector('.select-from');
const selectTo = document.querySelector('.select-to');
const fromOptions = document.querySelector('.from-options');
const toOptions = document.querySelector('.to-options');

const input = document.querySelector('input');
const output = document.querySelector('.output');

const currencies = ['USD','EUR','JPY','GBP','AUD','CAD','CHF','CNH','RUB'];

// Feed the currency options
(function() {
  // focus on input
  input.focus();
  // Feed currencies from the array
  currencies.forEach(item => {
    selectFrom.nextElementSibling.innerHTML += `<div>${item}</div>`
    selectTo.nextElementSibling.innerHTML += `<div>${item}</div>`
  });
  // Add click listener for all the options
  [...selectFrom.nextElementSibling.children].forEach(item => {
    item.addEventListener('click', (e) => {
      selectFrom.firstElementChild.textContent = e.target.innerHTML;
      fromOptions.classList.toggle('active');
    })
  });
  [...selectTo.nextElementSibling.children].forEach(item => {
    item.addEventListener('click', (e) => {
      selectTo.firstElementChild.textContent = e.target.innerHTML;
      toOptions.classList.toggle('active');
    })
  });
})()

// MAIN CONVERSION FUNCTION
const APIcall = (from, to, amount) => {
  fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`)
    .then(res => res.json())
    .then(data => {
      output.innerHTML = data.result;
    })
    .catch(error => console.log(error))
}

// LISTENERS
// Input listener
input.addEventListener('keyup', () => {
  let from = selectFrom.firstElementChild.textContent;
  let to = selectTo.firstElementChild.textContent;
  let amount = input.value;
  // Call function if value is typed in
  amount ? APIcall(from,to,amount) : output.innerHTML = '';
  // If any currency selection is still open close it
  [fromOptions,toOptions].forEach(e=>e.classList.remove('active'));
});

// Listeners to show currency options
selectFrom.addEventListener('click', () => {
  fromOptions.classList.toggle('active');
});

selectTo.addEventListener('click', () => {
  toOptions.classList.toggle('active');
})


