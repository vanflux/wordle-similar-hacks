/*
  Bot developed by vanflux
  Repository: https://github.com/vanflux/wordle-similar-hacks
  Game: https://palavra-do-dia.pt/
*/

(() => {
  function getAnswer() {
    try {
      return JSON.parse(localStorage.getItem('gameState')).solution
    } catch (exc) { };
  }

  function press(keyName) {
    const elem = Array.from(document.querySelector('game-app').shadowRoot.querySelector('game-keyboard').shadowRoot.querySelectorAll('button')).find(x => x.innerHTML.toUpperCase().trim() == keyName.toUpperCase().trim());
    if (!elem) return console.log('Key not found, keyName =', keyName);
    elem.click();
  }

  function write(word) {
    for (let i = 0; i < word.length; i++) {
      press(word[i]);
    }
  }

  function send() {
    press('enter');
  }

  function run() {
    const answer = getAnswer();
    if (!answer) return console.log('Answer not found');
    console.log('Answer', answer);
    write(answer);
    send();
    console.log('Finished');
  }

  run();
})();
