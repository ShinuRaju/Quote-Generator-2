let quoteArray = [];
let p = document.querySelector(".quote p");
let author = document.querySelector(".author");
let nxtButton = document.querySelector(".next");
let loader = document.querySelector(".loader");
let qContainer = document.querySelector(".quote-container");
let tweetButton = document.querySelector(".tweet-button");

let loaderStart = () => {
  loader.hidden = false;
  qContainer.hidden = true;
};

let loaderComplete = () => {
  loader.hidden = true;
  qContainer.hidden = false;
};

let randomNumberBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

let newQuote = () => {
  loaderStart();
  let numb = randomNumberBetween(0, quoteArray.length);
  p.textContent = quoteArray[numb].text;

  if (p.textContent.length > 80) {
    p.style.fontSize = "1.9rem";
  } else {
    p.style.fontSize = "2.5rem";
  }

  author.textContent =
    quoteArray[numb].author === null ? "unknown" : quoteArray[numb].author;
  loaderComplete();
};

async function getQuotes() {
  loaderStart();
  let url = "https://type.fit/api/quotes";

  try {
    let res = await fetch(url);

    quoteArray = await res.json();
    newQuote();
  } catch (error) {
    console.log(error);
  }
}

let tweety = () => {
  let url = `https://twitter.com/intent/tweet?text=${p.textContent} - ${author.textContent}`;
  window.open(url, "_blank");
};

// getQuotes();

nxtButton.addEventListener("click", () => {
  newQuote();
});

tweetButton.addEventListener("click", () => {
  tweety();
});

getQuotes();
