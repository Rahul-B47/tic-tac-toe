document.addEventListener("DOMContentLoaded", () => {
  const boxes = document.querySelectorAll(".box");
  const resetBtn = document.querySelector("#reset-btn");
  const newGameBtn = document.querySelector("#new-btn");
  const msgContainer = document.querySelector(".msg-container");
  const msg = document.querySelector("#msg");

  let turnO = true;

  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const disableBoxes = () => {
    boxes.forEach((box) => box.disabled = true);
  };

  const enableBoxes = () => {
    boxes.forEach((box) => {
      box.disabled = false;
      box.innerText = "";
      box.classList.remove("o-color");
      box.style.backgroundColor = "transparent";
      box.style.transform = "scale(1)";
    });
  };

  const showWinner = (winner) => {
    msg.innerText = `🎉 ${winner} Wins the Game! 🎮`;
    msgContainer.classList.remove("hide");
    msgContainer.style.display = "block";
    disableBoxes();
  };

  const checkWinner = () => {
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      const val1 = boxes[a].innerText;
      const val2 = boxes[b].innerText;
      const val3 = boxes[c].innerText;

      if (val1 !== "" && val1 === val2 && val2 === val3) {
        showWinner(val1);
        highlightWinner(a, b, c);
        return;
      }
    }

    // Draw
    const allFilled = [...boxes].every((box) => box.innerText !== "");
    if (allFilled) {
      msg.innerText = `😅 It's a Draw!`;
      msgContainer.classList.remove("hide");
      msgContainer.style.display = "block";
    }
  };

  const highlightWinner = (a, b, c) => {
    [a, b, c].forEach((i) => {
      boxes[i].style.backgroundColor = "rgba(0, 255, 255, 0.2)";
      boxes[i].style.transform = "scale(1.2)";
    });
  };

  const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    msgContainer.style.display = "none";
  };

  boxes.forEach((box) => {
    box.addEventListener("click", () => {
      if (box.innerText !== "") return;

      if (turnO) {
        box.innerText = "O";
        box.classList.add("o-color");
      } else {
        box.innerText = "X";
      }
      turnO = !turnO;
      box.disabled = true;
      checkWinner();
    });
  });

  resetBtn.addEventListener("click", resetGame);
  newGameBtn.addEventListener("click", resetGame);
});
