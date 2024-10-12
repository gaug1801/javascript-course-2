let calculation = localStorage.getItem('update');
    if (!calculation) {
      calculation = '';
    }
    displayCalc();
    
    function updateCalculation(update) {
      calculation += update;
      localStorage.setItem('update', calculation);
      displayCalc();
      return calculation;
    }

    function displayCalc() {
      document.querySelector('.js-display-calc').innerHTML = calculation;
    }
    