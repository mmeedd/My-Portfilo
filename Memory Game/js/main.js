let nameGamer = document.querySelector(".info-container .name span");
let startButton = document.querySelector(".control-buttons");
let blocksContainer = document.querySelector(".memory-game-blocks");
let flip = document.querySelector(".memory-game-blocks .game-block");
let traiesElement = document.querySelector(".info-container .tries span");
let audioSucess = document.getElementById("success");
let audioFail = document.getElementById("fail");

// console.log(flip);
document.querySelector(".control-buttons span").onclick = function () {
  let askName = prompt("Whats Your Name?");

  if (askName == "" || askName == null) {
    nameGamer.innerHTML = "Unknow Name";
  } else {
    nameGamer.innerHTML = askName;
  }
  startButton.remove();
};

let duration = 1000;

let blocks = Array.from(blocksContainer.children);

let orderRange = [...Array(blocks.length).keys()];

shuffle(orderRange);

blocks.forEach((block, index) => {
  block.style.order = orderRange[index];
  block.addEventListener("click", function () {
    flipBlock(block);
  });
});

function flipBlock(selectBlock) {
  selectBlock.classList.add("is-flipped");
  let allFlippedBlocks = blocks.filter((flipBlock) =>
    flipBlock.classList.contains("is-flipped")
  );
  if (allFlippedBlocks.length === 2) {
    //stop clicking function

    stopClicking();
    checkMatchBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}
//stop clicking function
function stopClicking() {
  blocksContainer.classList.add("no-clicking");
  setTimeout(() => {
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}
// check match
function checkMatchBlocks(fristBlock, secendBlock) {
  if (fristBlock.dataset.technology === secendBlock.dataset.technology) {
    fristBlock.classList.remove("is-flipped");
    secendBlock.classList.remove("is-flipped");

    fristBlock.classList.add("has-match");
    secendBlock.classList.add("has-match");
    audioSucess.play();
  } else {
    traiesElement.innerHTML = parseInt(traiesElement.innerHTML) + 1;
    setTimeout(() => {
      fristBlock.classList.remove("is-flipped");
      secendBlock.classList.remove("is-flipped");
    }, duration);
    audioFail.play();
  }
}

function shuffle(array) {
  let current = array.length,
    temp,
    random;

  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;

    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
  }
  return array;
}
