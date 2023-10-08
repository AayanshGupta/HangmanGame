const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");
const audio = document.getElementById("audio1");
const audio2 = document.getElementById("audio2");

//Options
let options = {
  States: [
    "Rajasthan",
    "Haryana",
    "Bihar",
    "Maharashtra",
    "Gujarat",
    "Punjab",
    "Kerala",
    "Sikkim",
    "Odisha",
    "Manipur"
  ],
  Animes: [
    "DeathNote",
    "Onepiece",
    "DragonBall",
    "Naruto",
    "Bleach",
    "AttackOnTitan",
    "Gintama",
    "Fate",
    "DemonSlayer",
    "JujutsuKaisen",
    "Haikyuu"
  ],
  Sports: [
    "Archery",
    "Athletics",
    "Badminton",
    "Cricket",
    "Football", 
    "Boxing",
    "Golf",
    "Gymnastics", 
    "Kabaddi",
    "Chess"
  ],
  Festivals:[
    "Diwali",
    "Holi",
    "Dusshera",
    "Lodhi",
    "Rakhshabandhan",
    "Navratri",
  ],
};

//word choice count
let winCount = 0;
let count = 0;
let Word = "";

//Display buttons
const displayOptions = () => {
  optionsContainer.innerHTML += `<h3>Please Select An Option</h3>`;
  let buttonCon = document.createElement("div");
  for (let value in options) {
    buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
  }
  optionsContainer.appendChild(buttonCon);
};

function playaudio(){
    audio.currentTime=0;
    audio.play();
}

function playaudio2(){
    audio2.currentTime=0;
    audio2.play();
}


//Used for blocking the buttons not in use
const blocker = () => {
  let optButtons = document.querySelectorAll(".options");
  let letButtons = document.querySelectorAll(".letters");
  //disable all other options
  optButtons.forEach((button) => {
    button.disabled = true;
  });

  //disable the letters used
  letButtons.forEach((button) => {
    button.disabled.true;
  });
  newGameContainer.classList.remove("hide");
};

//Word chosen is then converted into equal number of dashes
const generateWord = (optionValue) => {
  let optButtons = document.querySelectorAll(".options");
  //If optionValue matches the button innerText then highlight the button
  optButtons.forEach((button) => {
    if (button.innerText.toLowerCase() === optionValue) {
      button.classList.add("active");
    }
    button.disabled = true;
  });

  //initially hide letters, clear previous word
  letterContainer.classList.remove("hide");
  userInputSection.innerText = "";

  let optionArray = options[optionValue];
  //choose random word
  Word = optionArray[Math.floor(Math.random() * optionArray.length)];
  Word = Word.toUpperCase();

  //replace every letter with span containing dash
  let displayItem = Word.replace(/./g, '<span class="dashes">_</span>');

  //Display each element as span
  userInputSection.innerHTML = displayItem;
};

//Initial Function (Called when page loads/user presses new game)
const initializer = () => {
  winCount = 0;
  count = 0;

  //Initially erase all content and hide letteres and new game button
  userInputSection.innerHTML = "";
  optionsContainer.innerHTML = "";
  letterContainer.classList.add("hide");
  newGameContainer.classList.add("hide");
  letterContainer.innerHTML = "";

  //For creating letter buttons
  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
    //Number to ASCII[A-Z]
    button.innerText = String.fromCharCode(i);
    //character button click
    button.addEventListener("click", () => {
      let charArray = Word.split("");
      let dashes = document.getElementsByClassName("dashes");
      //if array contains clciked value replace the matched dash with letter else dram on canvas
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          //if character in array is same as clicked button
          if (char === button.innerText) {
            //replace dash with letter
            dashes[index].innerText = char;
            //increment counter
            winCount += 1;
            //if winCount equals word length
            if (winCount == charArray.length) {
              resultText.innerHTML = `<h2 class='win-msg'>You Win!!</h2><p>The word was <span>${Word}</span></p>`;
              //block all buttons
              playaudio();
              blocker();
            }
          }
        });
      } else {
        //lose count
        count += 1;
        //for drawing man
        drawMan(count);
        //Count==6 because head,body,left arm, right arm,left leg,right leg
        if (count == 6) {
            
          resultText.innerHTML = `<h2 class='lose-msg'>You Lose!!</h2><p>The word was <span>${Word}</span></p>`;
          playaudio2();
          blocker();
        }
      }
      //disable clicked button
      button.disabled = true;
    });
    letterContainer.append(button);
  }

  displayOptions();
  //Call to canvasCreator (for clearing previous canvas and creating initial canvas)
  let { initialDrawing } = canvasCreator();
  //initialDrawing would draw the frame
  initialDrawing();
};


//Canvas
const canvasCreator = () => {
  let context = canvas.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#000";
  context.lineWidth = 2;

  //For drawing lines
  const drawLine = (fromX, fromY, toX, toY) => {
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
  };

  const head = () => {
    context.beginPath();
    context.arc(70, 30, 10, 0, Math.PI * 2, true);
    context.stroke();
  };

  const body = () => {
    drawLine(70, 40, 70, 80);
  };

  const leftArm = () => {
    drawLine(70, 50, 50, 70);
  };

  const rightArm = () => {
    drawLine(70, 50, 90, 70);
  };

  const leftLeg = () => {
    drawLine(70, 80, 50, 110);
  };

  const rightLeg = () => {
    drawLine(70, 80, 90, 110);
  };

  //initial frame
  const initialDrawing = () => {
    //clear canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    //bottom line
    drawLine(10, 130, 130, 130);
    //left line
    drawLine(10, 10, 10, 131);
    //top line
    drawLine(10, 10, 70, 10);
    //small top line
    drawLine(70, 10, 70, 20);
  };

  return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
};

//draw the man
const drawMan = (count) => {
  let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
  switch (count) {
    case 1:
      head();
      break;
    case 2:
      body();
      break;
    case 3:
      leftArm();
      break;
    case 4:
      rightArm();
      break;
    case 5:
      leftLeg();
      break;
    case 6:
      rightLeg();
      break;
    default:
      break;
  }
};

//New Game
newGameButton.addEventListener("click", initializer);
window.onload = initializer;