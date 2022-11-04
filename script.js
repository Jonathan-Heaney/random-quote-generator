const quoteEl = document.getElementById('quote');
const speakerEl = document.getElementById('speaker');
const quoteBtn = document.getElementById('quoteBtn');
const dropdown = document.getElementById('tags');

// Generate the quote upon loading the page
generateQuote();

// Generate a new quote every time you click the 'New Quote' button
quoteBtn.addEventListener('click', generateQuote);

// Generate a new quote- if no tags are selected (default), then a random quote of any type will be shown. If a tag is selected, only quotes of that tag will be shown
async function generateQuote() {
  const value = dropdown.options[dropdown.selectedIndex].value;
  if (value === 'none') {
    const res = await fetch(`https://api.quotable.io/random`);
    const data = await res.json();
    quoteEl.textContent = data.content;
    speakerEl.textContent = `- ${data.author}`;
  } else {
    // You can use template literals with URLs
    const res = await fetch(`https://api.quotable.io/random?tags=${value}`);
    const data = await res.json();
    quoteEl.textContent = data.content;
    speakerEl.textContent = `- ${data.author}`;
  }
}

const tags = [];

// Function to get a full list of tags from the API and display them
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
