
let currentOp = '0';

// Update display and operation
Array.from(document.querySelectorAll(`.val-btn, .op-btn:not([data-value="res"])`)).forEach(el => {
  el.addEventListener('click', function (e) {

    let elValue = this.getAttribute('data-value');

    if (elValue == 'sum') elValue = '+';
    if (elValue == 'sub') elValue = '-';
    if (elValue == 'mul') elValue = '*';
    if (elValue == 'div') elValue = '/';
    if (elValue == 'dot') elValue = '.';

    if (currentOp == '0' && !isNaN(elValue)) {
      currentOp = elValue
    } else {
      currentOp += elValue
    }

    updateDisplay()
  })
})

// Calculate and show result
document.querySelector(`.op-btn[data-value="res"]`).addEventListener('click', function (e) {

  let result = calc(currentOp)

  currentOp = result.toString()

  updateDisplay()
})

// Reset (AC)
document.querySelector(`#ac-button > button`).addEventListener('click', function (e) {
  currentOp = '0'

  updateDisplay()
})

// Calculate the expression recursively
function calc(input) {

  let items = null;
  let result = 0;

  // If has sum operator
  if (input.indexOf('+') >= 0) {
    items = input.split('+')

    return items.reduce((carry, el) => carry + calc(el), 0)
  }
  // If has subtraction operator
  else if (input.indexOf('-') >= 0) {
    items = input.split('-')

    return items.reduce((carry, el) => carry - calc(el), 0)
  }
  // If has multiply operator
  else if (input.indexOf('*') >= 0) {
    items = input.split('*')

    return items.reduce((carry, el) => carry * calc(el), 1)
  }
  // If has divide operator
  else if (input.indexOf('/') >= 0) {
    items = input.split('/')

    const first = items[0]  // Initial value in reduce
    return items.splice(1).reduce((carry, el) => carry / calc(el), first)
  }
  // Negative numbers
  else if (input == '') {
    return 0
  }
  // NaN
  else if (isNaN(input)) {
    return 0
  }
  // Number
  else {
    return parseFloat(input)
  }
}


function updateDisplay() {

  let result = currentOp;

  if (currentOp.indexOf('*') >= 0) {
    result = result.replaceAll('*', 'x');
  }
  if (currentOp.indexOf('/') >= 0) {
    result = result.replaceAll('/', '÷');
  }
  document.getElementById('display').innerHTML = result
}


/* Layout changes ----------------------- */
Array.from(document.querySelectorAll(`.layout-preview`)).forEach(el => {
  el.addEventListener('click', function (e) {

    // Clear layout classes first
    Array.from(document.querySelectorAll(`.layout-preview`)).forEach(item => {
      document.querySelector(`main`).classList.remove(`${item.getAttribute('data-value')}-mode`)
    })

    const mode = this.getAttribute('data-value')

    localStorage.setItem('layout', mode)

    // Add layout class
    document.querySelector(`main`).classList.add(`${mode}-mode`)
  })
})


// Load layout
window.onload = function () {
  const mode = localStorage.getItem('layout')

  // Add layout class
  document.querySelector(`main`).classList.add(`${mode}-mode`)
}
