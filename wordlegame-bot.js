/*
  Bot developed by vanflux
  Repository: https://github.com/vanflux/wordle-similar-hacks
  Game: https://wordlegame.org/
*/

(() => {
  function doAnswerHooks(cb) {
    const founds = new Set();
    const tlcOriginal = String.prototype.toLowerCase;
    const tlcRequests = new Set();
    String.prototype.toLowerCase = function push(...args) {
      const str = this + '';
      if (str.length === lettersCount()) {
        tlcRequests.add(str);
        setTimeout(() => tlcRequests.delete(str), 50);
      }
      return tlcOriginal.call(str, ...args);
    };
    const rOriginal = String.prototype.replace;
    String.prototype.replace = function replace(...args) {
      const str = this + '';
      if (str.length === lettersCount()) {
        if (tlcRequests.has(str)) {
          tlcRequests.delete(str);
          if (!founds.has(str)) {
            founds.add(str);
            cb(str);
          }
        }
      }
      return rOriginal.call(str, ...args);
    };
  }

  function lettersCount() {
    return document.querySelectorAll('.game_rows > .Row:first-child > .Row-letter').length;
  }

  function press(keyName) {
    const elem = Array.from(document.querySelectorAll('.Game-keyboard-button')).find(x => x.innerHTML.toUpperCase() == keyName.toUpperCase());
    if (!elem) return console.log('Key not found, keyName =', keyName);
    elem.click();
  }

  function clear() {
    for (let i = 0; i < lettersCount(); i++) {
      const elem = document.querySelector('.Game-keyboard-button > svg');
      if (!elem) return console.log('Clear key not found');
      elem.parentElement.click();
    }
  }

  function write(word) {
    for (let i = 0; i < word.length; i++) {
      press(word[i]);
    }
  }

  function send() {
    press('enter');
  }

  function sleep(ms) {
    return new Promise(x => setTimeout(x, ms));
  }

  function run() {
    doAnswerHooks(async answer => {
      console.log('Answer', answer);
      clear();
      await sleep(100);
      write(answer);
      await sleep(100);
      send();
      console.log('Finished');
    });
  }

  run();
})();
