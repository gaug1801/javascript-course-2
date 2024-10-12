let score = JSON.parse(localStorage.getItem('score')) || 
  {
    wins: 0,
    losses: 0,
    ties: 0
  };

updateScoreElement();

/*
  12t. Update the 'Auto play' button so that when the game is auto playing, the text in the button is 'Stop playing'. Otherwise, the text in the button is 'Auto play'.

  Solution: Avoided using the event listener, because event listener does not do the work.
  I left it to the function by changing the innerHTML at the start of condidtion statement
*/
let isAutoPlaying = false;
let intervalId;
const autoPlayButtonElement = document.querySelector('.js-auto-play-button');

function autoPlay() {
  if (!isAutoPlaying) {
    autoPlayButtonElement.innerHTML = 'Stop playing';
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    autoPlayButtonElement.innerHTML = 'Auto play';
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

// 12s. Update the 'Auto play' button to use .addEventListener('click', ...) instead of onclick="..."
autoPlayButtonElement.addEventListener('click', ()=> {
    autoPlay();
  });
//12u. Update the code so pressing 'a' on keyboard will auto play the game.
document.body.addEventListener('keydown', (event)=> {
  if (event.key === 'a') {
    autoPlay();
  }
});

document.querySelector('.js-rock-button')
.addEventListener('click', () => {
  playGame('rock');
});

document.querySelector('.js-paper-button')
.addEventListener('click', () => {
  playGame('paper');
});

document.querySelector('.js-scissors-button')
.addEventListener('click', () => {
  playGame('scissors');
});

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if(event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  }
});

//  12v. Update the 'Reset score' button to use .addEventListener('click', ...)
//  12x. When clicking 'Reset Score' or pressing 'Backspace', instead of resetting the score immediately, display a confirmation message below the button
document.querySelector('.js-reset-score').addEventListener('click', ()=> {
  confirmResetScore();
});

function confirmResetScore() {
  let html = 
  `
  Are you sure you want to reset the score? 
  <button class="confirm-reset-button js-confirm-reset-button">Yes</button>
  <button class="cancel-reset-button js-cancel-reset-button">No</button>
  `;
  document.querySelector('.confirmation-container').innerHTML = html;
  
  document.querySelector('.js-confirm-reset-button').addEventListener('click', ()=> {
    resetScore();
    document.querySelector('.confirmation-container').innerHTML = '';
  });
  document.querySelector('.cancel-reset-button').addEventListener('click', ()=> {
    document.querySelector('.confirmation-container').innerHTML = '';
  });
}

//  12w. Update the code so pressing 'Backspace' will reset the score.
document.body.addEventListener('keydown', (event)=> {
  if(event.key === 'Backspace') {
    confirmResetScore();
  }
})

function playGame(playerMove) {
  let computerMove = pickComputerMove();
  let result = '';

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win!';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }
  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win!';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You lose.';
    }
  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else if (computerMove === 'scissors') {
      result = 'You win!';
    }
  }

  if (result === 'You win!') {
    score.wins++;
  } else if (result==='You lose.') {
    score.losses++;
  } else if (result === 'Tie.') {
    score.ties++;
  }

  localStorage.setItem('score', JSON.stringify(score));
  updateScoreElement();
  updateResultElement(result);
  updateMoveElement(playerMove, computerMove);
}

function updateScoreElement() {
  document.querySelector('.js-score')
  .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function updateResultElement(update) {
  document.querySelector('.js-result').innerHTML = update;
}

function updateMoveElement(playerMove, computerMove) {
  document.querySelector('.js-moves').innerHTML = 
  `You 
  <img src="images/${playerMove}-emoji.png" class="move-icon">  
  <img src="images/${computerMove}-emoji.png" class="move-icon"> 
  Computer`;
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;

  localStorage.removeItem('score');
  updateScoreElement();
  document.querySelector('.js-result').innerHTML = '';
  document.querySelector('.js-moves').innerHTML = '';
}

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < (1/3)) {
    computerMove = 'rock';
  } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
    computerMove = 'paper';
  } else if ( randomNumber >= 2/3 && randomNumber < 1) {
    computerMove = 'scissors';
  }
  return computerMove;
}