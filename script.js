const quoteEl = document.getElementById('quote');
const speakerEl = document.getElementById('speaker');
const quoteBtn = document.getElementById('quoteBtn');
const dropdown = document.getElementById('tags');

generateQuote();

quoteBtn.addEventListener('click', generateQuote);

async function generateQuote() {
  const res = await fetch('https://api.quotable.io/random');
  // Don't forget the () for the .json()- it's a method
  const data = await res.json();
  quoteEl.textContent = data.content;
  speakerEl.textContent = data.author;
}

const tags = [];

async function listTags() {
  const res = await fetch('https://api.quotable.io/tags');
  const data = await res.json();
  data.map((value) => {
    tags.push(value.name);
  });
  addTags();
}

listTags();

function addTags() {
  for (let i = 0; i < tags.length; i++) {
    const option = document.createElement('option');
    option.value = tags[i];
    option.textContent = tags[i];
    dropdown.appendChild(option);
  }
}
