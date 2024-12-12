const sentence =
  "Lowkey sipping tea while the rizz is immaculate, but this whole situationship? Big sus, no cap."
const sentenceArr = sentence.split("").map((item) => ({
  letter: item,
  status: 0,
}))
let counter = 0
const root = document.getElementById("root")
let keysArr = []
const resetButton = document.createElement("button");
resetButton.textContent = "Reset";
resetButton.onclick = handleReset;
root.after(resetButton);

for (var i = 0; i < sentenceArr.length; i++) {
  var letterSpan = document.createElement("span")
  letterSpan.id = `letter-${i}`
  letterSpan.style.opacity = ".5"
  if (i === 0) {
    letterSpan.style.textDecoration = "underline"
  }
  letterSpan.innerHTML = sentenceArr[i].letter
  root.appendChild(letterSpan)
}

function logger() {
  console.log(keysArr)
}

function handleKeyPress(e) {
  if (e.key === sentenceArr[counter].letter) {
    var letter = document.getElementById(`letter-${counter}`)
    letter.style.opacity = "1"
    letter.style.textDecoration = "none"
    counter++

    letter = document.getElementById(`letter-${counter}`)
    if (counter < sentenceArr.length) {
      letter.style.textDecoration = "underline"
    }
  }
  keysArr.push({ key: `${e.key}`, time: `${Math.round(e.timeStamp / 1000)}` })
}

function handleReset() {
  counter = 0;
  for (let i = 0; i < sentenceArr.length; i++) {
    var letterSpan = document.getElementById(`letter-${i}`)
    if (i === 0) {
      letterSpan.style.textDecoration = "underline"
    } else {
      letterSpan.style.textDecoration = ""
    }
    letterSpan.style.opacity = ".5"
    letterSpan.innerHTML = sentenceArr[i].letter
  }
  keysArr = []
}

document.addEventListener("keydown", handleKeyPress)