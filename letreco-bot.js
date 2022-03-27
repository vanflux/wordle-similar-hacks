/*
  Bot developed by vanflux
  Repository: https://github.com/vanflux/wordle-similar-hacks
  Game: https://www.gabtoschi.com/letreco/
*/

(async () => {
  async function getAnswer() {
    const script = Array.from(document.getElementsByTagName('script')).find(x => x && x.src && x.src.includes('main'));
    if (!script) console.log('Script not found');
    const code = await (await fetch(script.src)).text();
    if (!code) console.log('Code download failed');
    const cur = new Date(new Date().valueOf() - 6e4 * new Date().getTimezoneOffset()).toISOString().split("T")[0];
    const match = code.match(new RegExp(`${cur}\\":[^w]+word:\\"([^"]+)`));
    if (!match) console.log('Match not found');
    const answer = match[1];
    return answer;
  }

  function writeChar(char) {
    const elem = Array.from(document.querySelectorAll('button.keyboard-button > span')).find(x => x.innerHTML.toUpperCase() === char.toUpperCase());
    if (!elem) console.log('Write char failed on', char);
    elem.click();
  }

  function write(word) {
    for (let i = 0; i < word.length; i++) {
      writeChar(word[i]);
    }
  }

  function send() {
    const elem = Array.from(document.querySelectorAll('div > div.justify-content-center > button.keyboard-button.action-button'))[1];
    if (!elem) console.log('Send failed');
    elem.click();
  }

  async function run() {
    const answer = await getAnswer();
    if (!answer) console.log('Answer not found');
    console.log('Answer:', answer);
    write(answer);
    send();
    console.log('Finish');
  }

  run();
})();
