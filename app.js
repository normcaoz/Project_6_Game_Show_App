document.addEventListener('DOMContentLoaded', () => {
  const qwerty = document.getElementById('qwerty');
  const ul = document.getElementById('phrase');
  var missed = 0;
  const resetBtn = document.querySelector('.btn__reset');
  const overlay = document.getElementById('overlay');
  var ans;
  var gameover = false;
  title = document.querySelector('.title');
  const scoreboard = document.getElementById('scoreboard');

  // phrase pool string array
    let phrases = [
                      'BE PRESENT',
                      'GO WITH THE FLOW',
                      'TAKE IT EASY',
                      'FORGIVE AND FORGET',
                      'SHARING IS CARING',
                      'PERMISSION TO BE HUMAN',
                      'BETTER LATE THAN NEVER',
                      'A BLESSING IN DISGUISE',
                      'PERFECTLY IMPERFECT',
                      'I FEEL YOUR PAIN',
                    ];

// reset letter buttons fxn
  function reset_Letters(){
    buttons = qwerty.querySelectorAll('button');
    for (i = 0; i < buttons.length; i++){
      buttons[i].disabled = false;
      buttons[i].className = '';
    }
  }

// clear the previous phrase
  function clear_phrase(){
    let li = ul.querySelectorAll('li');

    for(i = 0; i < li.length; i++){
      ul.removeChild(li[i]);
    }
  }

  resetBtn.style.cursor = 'pointer'; //visualizes as a button for users to click

  resetBtn.addEventListener('click', (e) => {
    if (e.target.className === 'btn__reset') {
      if(gameover === true){

        let clearWin = document.querySelectorAll('.winText'); //clear the previous win message
        for(i=0; i < clearWin.length; i++){
          overlay.removeChild(clearWin[i]);
        }

        let clearLost = document.querySelectorAll('.loseText'); //clear the previous win message
        for(i=0; i < clearLost.length; i++){
          overlay.removeChild(clearLost[i]);
        }

        title.style.display = 'block'; //show the title

        missed = 0;

        //reseting to 4 hearts
        let remaining = document.querySelectorAll('.tries');
        for (let i = remaining.length; i < 5; i++) {
          hearts = document.createElement('li');

          var img = document.createElement('img');
          img.src = "images/liveheart.png"; //
          img.width = 30;
          img.height = 35;

          hearts.appendChild(img);
          hearts.className = 'tries';
          ol = scoreboard.querySelector('ol');
          ol.appendChild(hearts);
        }

        clear_phrase(); // clear the previous phrase
        reset_Letters(); //enable the key buttons

        // getRandomPhraseAsArray(phrases);
        // addPhraseToDisplay(phraseArray);
      }
      //call the fxn getRandomPhraseAsArray
      const phraseArray = getRandomPhraseAsArray(phrases);
      addPhraseToDisplay(phraseArray);
      overlay.style.display = 'none';
    }
  });


// get random array and create an instance of char array
  function getRandomPhraseAsArray(phrases){
    let randomPhrase = phrases[Math.floor(Math.random() * Math.floor(phrases.length))];
    ans = randomPhrase;
    let abc = Array.from(randomPhrase);
    return abc;
  }

  //addPhraseToDisplay(phraseArray);

  function addPhraseToDisplay(phraseArray){
    for (let i = 0; i < phraseArray.length; i++) {
    let li = document.createElement('li');
    li.textContent = phraseArray[i];
    ul.appendChild(li).style.whiteSpace = 'pre-wrap';
      if (phraseArray[i] != '&nbsp' && phraseArray[i] != ' '){
        li.className += 'letter';
      } else if (phraseArray[i] === '&nbsp' || phraseArray[i] === ' '){
        li.className += 'space';
      }
    }
  }

  function checkLetter(key){
    const letter = document.querySelectorAll('.letter');
    let match = null;
    for (let i = 0; i < letter.length; i++) {
      var checking = letter[i];
      if(key === checking.textContent){
        checking.classList.add('show');
        match = key;
      }
    }
    return match;
  }

  qwerty.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
     const button = e.target;
     button.className += 'chosen';
     const key = button.textContent.toUpperCase();
     button.disabled = true;
     letterFound = checkLetter(key);
     if (letterFound === null) {
      missed += 1;
      let heart = document.querySelector('.tries');
      ol = heart.parentNode;
      ol.removeChild(heart);
     }
    }
    checkWin();
  });

  function checkWin(){
    const letter = document.querySelectorAll('.letter');
    let show = document.querySelectorAll('.show');
    if (show.length === letter.length){
      gameover = true;

      title.style.display = 'none';

      overlay.className = 'win';
      var winText = document.createElement('h1'); //win message
      winText.innerHTML = 'You won!';
      winText.className += 'winText';

      var answer = document.createElement('h1'); //answer
      answer.innerHTML = 'The answer is ' + ans;
      answer.className += 'winText';

      overlay.appendChild(winText);
      overlay.appendChild(answer);
      overlay.style.display = 'flex';

    } else if (missed > 4){
      gameover = true;

      title.style.display = 'none';
      overlay.className = 'lose';

      var loseText = document.createElement('h1');
      loseText.innerHTML = 'Sorry, you lost.';
      loseText.className += 'loseText';

      var answer = document.createElement('h1'); //answer
      answer.innerHTML = 'The answer is ' + ans;
      answer.className += 'loseText';

      overlay.appendChild(loseText);
      overlay.appendChild(answer);

      overlay.style.display = 'flex';

    }
  }


});
