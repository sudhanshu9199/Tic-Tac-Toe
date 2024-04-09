let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //playerX, playerO
let count = 0; //To Track Draw



boxes.forEach((box) => {
  box.addEventListener("touchstart", (event) => {
    // Get the touch coordinates
    // const touchX = event.touches[10].clientX;

    // Calculate the left position of the background element based on the touch position
    // const backgroundLeft = touchX - box.offsetWidth / 2;

    const touch = document.querySelector('.bg').style.left = 'calc(50% - 50%)';

    // Apply the calculated left position to the background element
    // document.querySelector('.bg').style.left = `${backgroundLeft}px`;

    // Rest of the logic to handle the turn and update the game state
  });
});



// boxes.forEach((box) => {
//   // Use touchstart event for mobile devices
//   box.addEventListener("touchstart", (event) => {
//     event.preventDefault(); // Prevent default touch behavior

//     // Get the touch coordinates relative to the box element
//     const touchX = event.touches[0].clientX - box.getBoundingClientRect().left;
//     document.querySelector('.bg').style.left = 'calc(50% - 10%)'

//     // Calculate the left position of the background element centered over the box
//     const backgroundLeft = touchX - document.querySelector('.bg').offsetWidth / 2;

//     // Ensure background stays within box boundaries
//     const boxWidth = box.offsetWidth;
//     const backgroundWidth = document.querySelector('.bg').offsetWidth;
//     // backgroundLeft = Math.max(0, Math.min(backgroundLeft, boxWidth - backgroundWidth)); // Clamp left value

//     const clampedLeft = Math.max(0, Math.main(backgroundLeft, boxWidth-backgroundWidth));//clamp left value


//     // Apply the calculated left position to the background element
//     // document.querySelector('.bg').style.left = `${backgroundLeft}px`;
//     document.querySelector('.bg').style.left = `${clampedLeft}px`;


//     // Rest of the logic to handle turn and update game state
//     if (turnO) {
//       turnO = 'O';
//       box.innerText = "X";
//       // document.querySelector('.bg').style.left = `${boxWidth / 2 - backgroundWidth / 2}px`; // Center background initially
//       turnO = false;
//     } else {
//       turnO = 'X';
//       box.innerText = "O";
//       // document.querySelector('.bg').style.left = `${boxWidth / 2 - backgroundWidth / 2}px`; // Center background initially
//     }
//     box.disabled = true;
//     count++;

//     let isWinner = checkWinner();

//     if (count === 9 && !isWinner) {
//       gameDraw();
//     }
//   });
// });



const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
  document.querySelector('.bg').style.left = 'calc(50% - 50%)'; // reset the turn for
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
        turnO = 'O';
        //playerO
        box.innerText = "X";
        document.querySelector('.bg').style.left = '85px';
      turnO = false;
    } else {
      //playerX
      turnO = 'X';
    box.innerText = "O";
      document.querySelector('.bg').style.left = '0px';
    //   turnO = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `🎉Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

// function changeTurn(){
//     if(turnO === 'X'){
//         turnO = 'O';
//         document.querySelector('.bg').style.left = '85px';
//     }
//     else{
//         turnO = 'X';
//         document.querySelector('.bg').style.left = '0';
//     }

// }