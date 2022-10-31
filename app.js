const quizData = [
  {
    question: "Quem ganhou a copa de mundo de 2002?",
    a: "Brasil",
    b: "Alemanha",
    c: "França",
    d: "Inglaterra",
    correct: "a",
  },
  {
    question: "Qual oscar de melhor filme de 2008?",
    a: "Sangue Negro",
    b: "Juno",
    c: "Onde os Fracos Não Têm Vez",
    d: "Desejo e Reparação",
    correct: "c",
  },
  {
    question: "Quem ganhou a Champions 2020/2021?",
    a: "Real Madrid",
    b: "Bayern de Munique",
    c: "Liverpool",
    d: "Chelsea",
    correct: "d",
  },
  {
    question: "Em que ano o Titanic afundou?",
    a: "1911",
    b: "1912",
    c: "1910",
    d: "Nenhuma das Alternativas",
    correct: "b",
  },
];

const form = document.querySelector("form");
const answerElements = document.querySelectorAll(".answer");
const question = document.querySelector("#question");
const answerA = document.querySelector("#answer-a");
const answerB = document.querySelector("#answer-b");
const answerC = document.querySelector("#answer-c");
const answerD = document.querySelector("#answer-d");

let currentQuiz = 0;
let score = 0;

// Function para desfazer a seleção
const deselectAnswers = () => {
  answerElements.forEach((answer) => (answer.checked = false));
};

// Armazena a resposta do usuário
const getSelected = () => {
  let answer;
  answerElements.forEach((answerElement) => {
    if (answerElement.checked) {
      answer = answerElement.id;
    }
  });
  return answer;
};

// Colocar as perguntas e respostas no texto
const loadQuiz = () => {
  deselectAnswers();
  const currentQuizData = quizData[currentQuiz]; //quizData[0,1,2,3...]
  question.innerText = currentQuizData.question; //Substitui a pergunta
  answerA.innerText = currentQuizData.a;
  answerB.innerText = currentQuizData.b;
  answerC.innerText = currentQuizData.c;
  answerD.innerText = currentQuizData.d;
};
loadQuiz();

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const userAnswer = getSelected();

  if (userAnswer) {
    if (userAnswer === quizData[currentQuiz].correct) score++; //Se acertar aumenta score
    currentQuiz++; //Acertando ou errando, o valor do currentQuiz aumenta e vai para outra pergunta
    const correctAnswersPercentage = (score / quizData.length) * 100;
    if (currentQuiz < quizData.length) loadQuiz();
    else {
      form.innerHTML = `
<h2 class="text-white">Você acertou  <span class="text-warning"> ${correctAnswersPercentage}%</span>  das questões</h2>
<button class="text-white d-block border-0 w-100 pe-auto fs-4 p-4 mt-4" onclick="history.go(0)">Jogue Novamente</button>
`; // history.go(0) reinicia a form
    }
  }
});
