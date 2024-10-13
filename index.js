// Your code here
// Questions array with at least five questions
var questionsArr = [
    {
      question: 'Who created JavaScript?',
      answer: 'Brendan Eich',
      options: ['Linus Torvalds', 'Brendan Eich', 'Dan Abramov', 'Douglas Crockford']
    },
    {
      question: 'In what year was JavaScript created?',
      answer: '1995',
      options: ['1999', '1975', '1995', '2005']
    },
    {
      question: 'Which company developed JavaScript?',
      answer: 'Netscape',
      options: ['Microsoft', 'Netscape', 'Sun Microsystems', 'IBM']
    },
    {
      question: 'Which of these is a JavaScript framework?',
      answer: 'React',
      options: ['Laravel', 'Django', 'React', 'Ruby on Rails']
    },
    {
      question: 'Which symbol is used for comments in JavaScript?',
      answer: '//',
      options: ['#', '//', '/* */', '<!-- -->']
    }
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  let timer;
  let timeLeft = 30;
  
  // Load the quiz on page load
  document.addEventListener('DOMContentLoaded', function () {
    const quizContainer = document.getElementById('quiz');
  
    // Check for previous score
    const previousScore = localStorage.getItem('previous-score');
    if (previousScore) {
      quizContainer.innerHTML = `<p>Previous Score: ${previousScore}%</p><button id="start-quiz">Start Quiz!</button>`;
    } else {
      quizContainer.innerHTML = `<button id="start-quiz">Start Quiz!</button>`;
    }
  
    // Start quiz event listener
    document.getElementById('start-quiz').addEventListener('click', startQuiz);
  });
  
  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 30;
    showQuestion();
  }
  
  function showQuestion() {
    const quizContainer = document.getElementById('quiz');
    const questionData = questionsArr[currentQuestionIndex];
  
    quizContainer.innerHTML = `
      <p>${questionData.question}</p>
      <div>
        ${questionData.options
          .map(option => `<button class="option">${option}</button>`)
          .join('')}
      </div>
      <p id="timer">${timeLeft}</p>
    `;
  
    // Add event listeners to each option button
    document.querySelectorAll('.option').forEach(button => {
      button.addEventListener('click', checkAnswer);
    });
  
    // Start the timer for the question
    startTimer();
  }
  
  function startTimer() {
    timer = setInterval(function () {
      timeLeft--;
      document.getElementById('timer').textContent = timeLeft;
  
      if (timeLeft <= 0) {
        clearInterval(timer);
        moveToNextQuestion();
      }
    }, 1000);
  }
  
  function checkAnswer(event) {
    clearInterval(timer);
    const userAnswer = event.target.textContent;
    const correctAnswer = questionsArr[currentQuestionIndex].answer;
  
    if (userAnswer === correctAnswer) {
      score++;
    }
  
    moveToNextQuestion();
  }
  
  function moveToNextQuestion() {
    currentQuestionIndex++;
  
    if (currentQuestionIndex < questionsArr.length) {
      timeLeft = 30;
      showQuestion();
    } else {
      endQuiz();
    }
  }
  function endQuiz() {
    const quizContainer = document.getElementById('quiz');
    const finalScore = Math.round((score / questionsArr.length) * 100);
  
    // Save the score to localStorage
    localStorage.setItem('previous-score', finalScore);
  
    quizContainer.innerHTML = `<p>Final Score: ${finalScore}%</p><button id="start-quiz">Start Quiz!</button>`;
  
    // Event listener to restart the quiz
    document.getElementById('start-quiz').addEventListener('click', startQuiz);
  }
  