const OLLAMA_API_URL = "http://localhost:11434/api/generate";
let isLoading = true;
let sentence = isLoading ? "Loading..." : getNewSentence();
let sentenceArr = [];
let counter = 0;
const root = document.getElementById("root");
let keysArr = [];
const resetButton = document.createElement("button");
resetButton.textContent = "Reset";
resetButton.onclick = handleReset;
root.after(resetButton);

initializeSentence(sentence);

async function getNewSentence() {
  try {
    isLoading = true;
    const response = await fetch(OLLAMA_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3.1:8b",
        prompt: "Respond only with a totally unique, unformatted sentence according to these parameters: 15 words. Use the word \"Greg.\" ",
        stream: false
      }),
    });

    if (!response.ok) {
      throw new Error("HTTP Error!");
    }

    const data = await response.json();
    const newSentence = data.response.trim();
    isLoading = false;
    initializeSentence(newSentence);
  } catch (err) {
    console.error("Error fetching data: ", err);
    alert("Failed to fetch a new sentence. Please try again.");
  }
}

function initializeSentence(newSentence) {
  // Clear existing sentence and reset counter
  root.innerHTML = "";
  sentence = newSentence;
  sentenceArr = sentence.split("").map((item) => ({
    letter: item,
    status: 0,
  }));
  counter = 0;

  // Create spans for each letter
  for (let i = 0; i < sentenceArr.length; i++) {
    const letterSpan = document.createElement("span");
    letterSpan.id = `letter-${i}`;
    letterSpan.style.opacity = ".5";
    if (i === 0) {
      letterSpan.style.textDecoration = "underline";
    }
    letterSpan.textContent = sentenceArr[i].letter;
    root.appendChild(letterSpan);
  }

  // Re-add keypress listener
  document.addEventListener("keydown", handleKeyPress, { once: false });
}

function logger() {
  console.log(keysArr);
}

function handleKeyPress(e) {
  if (e.key === sentenceArr[counter]?.letter) {
    const letter = document.getElementById(`letter-${counter}`);
    letter.style.opacity = "1";
    letter.style.textDecoration = "none";
    counter++;

    if (counter < sentenceArr.length) {
      const nextLetter = document.getElementById(`letter-${counter}`);
      nextLetter.style.textDecoration = "underline";
    }
  }

  if (counter === sentenceArr.length) {
    console.log("Finished typing!");
    document.removeEventListener("keydown", handleKeyPress);
    alert("Great job! You've completed the sentence!");
  }

  keysArr.push({ key: e.key, time: `${Math.round(e.timeStamp / 1000)}` });
}

function handleReset() {
  getNewSentence();
  keysArr = [];
}
