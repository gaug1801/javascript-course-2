let score = JSON.parse(localStorage.getItem('score')) || 
      {
        wins: 0,
        losses: 0,
        ties: 0
      };

      updateScoreElement();

      /*
        How does autoPlay() function work?
        - isAutoPlaying is false by default, so the game starts to play 
        - isAutoPlaying is now true.
        - When we click the Auto Play button, it checks isAutoPlaying
        - Since it is now true, it jumps to the else statement
        - This stops the interval and turns isAutoPlaying false.
      */

      let isAutoPlaying = false;
      let intervalId; //we move this to the outside so we can save the id from the last time the function was run

      function autoPlay() {
        if (!isAutoPlaying) {
          intervalId = setInterval(() => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
          }, 1000);
          isAutoPlaying = true;
        } else {
          clearInterval(intervalId);
          isAutoPlaying = false;
        }
      }

      /*
        Lesson 12 Part 2 - Take the autoPlay() function and rewrite
        it using arrow functions. 
        - In this situation is better to keep the original function
        because the original allows for HOISTING, AND it is easier
        to read.
      */

      // const autoPlay = () => {

      // };

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

      //  keydown still provides the event object, which contains which key was pressed.
      //  only that here eventListener provides it as a parameter to the callback function.
      document.body.addEventListener('keydown', (event) => {
        if (event.key === 'r') {
          playGame('rock');
        } else if(event.key === 'p') {
          playGame('paper');
        } else if (event.key === 's') {
          playGame('scissors');
        }
      });

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
        console.log('after'); //This code will not execute because it jumps back to the line where the function was called.
      }