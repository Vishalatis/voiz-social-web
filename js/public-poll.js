// Array of polls
let polls = [
  {
    question: "Do you like Travel?",
    answers: ["Yes", "No"],
    pollcount: 100,
    answerweight: [60, 40],
    selectanswer: -1,
  },
  {
    question: "Do you like Coding?",
    answers: ["Yes", "No"],
    pollcount: 50,
    answerweight: [20, 15, 5, 10],
    selectanswer: -1,
  },
  {
    question: "Do you like Web Design?",
    answers: ["Yes", "No"],
    pollcount: 80,
    answerweight: [30, 20, 20, 10],
    selectanswer: -1,
  },
];

// DOM references
let polldom = {
  question: document.querySelector(".poll .question"),
  answers: document.querySelector(".poll .answers"),
};

// Current poll index
let currentPollIndex = 0;

// Render a poll
function renderPoll(index) {
  let poll = polls[index];

  polldom.question.innerText = poll.question;
  polldom.answers.innerHTML = poll.answers
    .map(function (answer, i) {
      return `
          <div class="answer" onclick="markanswer(${index}, ${i})">
          ${answer}
          <span class="percentage_bar"></span>
          <span class="percentage_value"></span>
          </div>
        `;
    })
    .join("");
}

// Mark answer for the current poll
function markanswer(pollIndex, i) {
  let poll = polls[pollIndex];
  poll.selectanswer = +i;

  try {
    document
      .querySelector(".poll .answers .answer.selected")
      .classList.remove("selected");
  } catch (msg) {}

  document
    .querySelectorAll(".poll .answers .answer")
    [+i].classList.add("selected");

  showresults(pollIndex);
}

// Show results for the selected poll
function showresults(pollIndex) {
  let poll = polls[pollIndex];
  let answers = document.querySelectorAll(".poll .answers .answer");

  for (let i = 0; i < answers.length; i++) {
    let percentage = 0;

    if (i == poll.selectanswer) {
      percentage = Math.round(
        ((poll.answerweight[i] + 1) * 100) / (poll.pollcount + 1)
      );
    } else {
      percentage = Math.round(
        (poll.answerweight[i] * 100) / (poll.pollcount + 1)
      );
    }

    answers[i].querySelector(".percentage_bar").style.width = percentage + "%";
    answers[i].querySelector(".percentage_value").innerText = percentage + "%";
  }
}

// Navigate to the next poll
function nextPoll() {
  if (currentPollIndex < polls.length - 1) {
    currentPollIndex++;
    renderPoll(currentPollIndex);
  } else {
    alert("You have completed all the polls!");
  }
}

// Navigate to the previous poll
function previousPoll() {
  if (currentPollIndex > 0) {
    currentPollIndex--;
    renderPoll(currentPollIndex);
  }
}

// Initial render
renderPoll(currentPollIndex);
