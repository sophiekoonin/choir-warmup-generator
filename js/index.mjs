import { parse } from "./csv.min.js";
const _templateObject = _taggedTemplateLiteral([""], [""]);

function _taggedTemplateLiteral(strings, raw) {
  return Object.freeze(
    Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })
  );
}

let warmups = [];

const urlToCsv =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQsFfNZELMnMKIOvSAu-df0ilaf83VKW4VxEQ3IjktxVcgUqiFA4EeIOiaKxylI0ktutbQ1cOBgyUev/pub?gid=0&single=true&output=csv";

async function getWarmups() {
  const response = await fetch(urlToCsv);
  const text = await response.text();
  const data = parse(text, { header: true });
  warmups = data.slice(1).reduce((acc, curr) => {
    return [
      ...acc,
      {
        type: curr[0],
        activity: curr[1],
        link: curr[2],
      },
    ];
  });
  console.log(warmups);
}

getWarmups();
document.getElementById("shuffle").onclick = render;
const target = document.getElementById("target");
function renderSection(type, number) {
  target.innerHTML +=
    "\n    <h2>" +
    type +
    "</h2>\n    " +
    listify(pickSome(type, number)) +
    "\n  ";
}

function render() {
  target.innerHTML = "";
  if (warmups.length === 0) {
    getWarmups().then(() => {
      render();
    });
  } else {
    // render a section with 3 physicals including the heading
    renderSection("Physical", 3);
    renderSection("Breathing", 3);
    renderSection("Sounds", 3);
    renderSection("Vocal", 3);
    renderSection("Song", 1);
  }
}

function listify(list) {
  return (
    "\n  <ul>\n    " +
    list
      .map(function (item) {
        return `<li>${item}</li>`;
      })
      .join(_templateObject) +
    "\n  </ul>\n  <hr/>"
  );
}

function pickSome(type, count) {
  const howmany = count != null ? count : 1;

  const filteredWarmups = warmups.filter((e) => e.type === type);
  return shuffle(filteredWarmups.length)
    .slice(0, howmany)
    .map((e) => {
      const item = filteredWarmups[e];
      return `${item.activity}${
        item.link
          ? ` <a href="${item.link}" target="_blank" rel="noopener noreferrer">(link)</a>`
          : ""
      }`;
    });
}

// source: BetonMAN : https://gist.github.com/guilhermepontes/17ae0cc71fa2b13ea8c20c94c5c35dc4
function shuffle(limit) {
  return Array.from({ length: limit }, function (e, i) {
    return i;
  })
    .map(function (a) {
      return [Math.random(), a];
    })
    .sort(function (a, b) {
      return a[0] - b[0];
    })
    .map(function (a) {
      return a[1];
    });
}

// set console log list to render it as a list on the page
