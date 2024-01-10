const state = {
  view:{
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    lives: document.querySelector("#lives"),
  },

  values: {
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    currentTime: 60,
    lives: 3,
  },
  
  actions:{
    timerId: setInterval(randomSquare, 1000),
    countDowTimerId: setInterval(countDown, 1000),
  }
  
};


function playSound(audioName){
  let audio = new Audio(`./src/audios/${audioName}.m4a`);
  audio.volume = 0.2;
  audio.play();
}

function restartGame() {
  state.values.lives = 3; // Reinicia o número de vidas
  state.values.result = 0; // Reinicia a pontuação
  state.values.currentTime = 60; // Reinicia o tempo
  state.view.score.textContent = state.values.result; // Atualiza a exibição da pontuação
  state.view.timeLeft.textContent = state.values.currentTime; // Atualiza a exibição do tempo
  state.view.lives.textContent = state.values.lives;

  // Limpa os intervalos de tempo antigos, se existirem
  clearInterval(state.actions.timerId);
  clearInterval(state.actions.countDowTimerId);

  state.actions.timerId = setInterval(randomSquare, 1000); // Inicia o temporizador de quadrados
  state.actions.countDowTimerId = setInterval(countDown, 1000); // Inicia o temporizador de contagem regressiva
}

function countDown(){
  state.values.currentTime --;
  state.view.timeLeft.textContent = state.values.currentTime;

  if(state.values.currentTime <= 0){
    clearInterval(state.actions.countDowTimerId);
    clearInterval(state.actions.timerId);
    playSound("gameOver");
    alert("Game Over! A sua pontuação foi: " + state.values.result);
    restartGame()
  }
}

function randomSquare(){
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  })

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}

function decreaseLives(){
  state.values.lives--;
  state.view.lives.textContent = state.values.lives;
  
  clearInterval(state.actions.countDowTimerId);
  playSound("loosing");
  alert("Você errou! 💔");
  
  if(state.values.lives === 0){
  restartGame()
  }
}

function addListenerHitBox(){
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if(square.id === state.values.hitPosition){
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
         playSound("hit");
      } else {
        decreaseLives();
      }
    });
  });
}

function init(){
  addListenerHitBox();
}

init();