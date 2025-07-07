const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const historyList = document.createElement('div');
historyList.classList.add('history');
document.body.appendChild(historyList);

let expression = '';
let history = [];

buttons.forEach(button => {
  button.addEventListener('click', () => handleInput(button.dataset.key));
});

document.addEventListener('keydown', e => {
  if (
    '0123456789+-*/.=BackspaceEnterCc'.includes(e.key) ||
    e.key === 'Enter'
  ) {
    handleInput(e.key);
  }
});

function handleInput(key) {
  if (key === 'C' || key === 'c') {
    expression = '';
  } else if (key === 'Backspace') {
    expression = expression.slice(0, -1);
  } else if (key === '=' || key === 'Enter') {
    try {
      const result = eval(expression).toString();
      addToHistory(expression + ' = ' + result);
      expression = result;
    } catch {
      expression = 'Error';
    }
  } else {
    if (expression === 'Error') expression = '';
    expression += key;
  }
  display.value = expression;
}

function addToHistory(entry) {
  const item = document.createElement('div');
  item.textContent = entry;
  item.classList.add('history-item');
  historyList.prepend(item);
  item.classList.add('fade-in');
  if (historyList.children.length > 10) {
    historyList.removeChild(historyList.lastChild);
  }
}