// app.js

function startLesson(lessonType) {
  const lessonSection = document.getElementById(`${lessonType}-exercises`);
  lessonSection.classList.remove('hidden');
  generateExercises(lessonType);
}

function generateExercises(lessonType) {
  const exerciseContainer = document.getElementById(`${lessonType}-exercises`);
  exerciseContainer.innerHTML = ''; // Clear previous exercises

  let difficulty = 1; // Start with easy exercises
  let exerciseCount = 5; // Number of exercises to generate

  for (let i = 0; i < exerciseCount; i++) {
    const exerciseElement = document.createElement('div');
    exerciseElement.classList.add('exercise-item');
    
    const exercise = generateExercise(lessonType, difficulty);
    exerciseElement.innerHTML = `<p>${exercise.question}</p><input type="text" id="answer-${i}" placeholder="Votre réponse">`;
    
    exerciseContainer.appendChild(exerciseElement);

    difficulty++; // Increase difficulty with each exercise
  }

  // Add a submit button
  const submitButton = document.createElement('button');
  submitButton.textContent = 'Soumettre';
  submitButton.onclick = () => checkAnswers(lessonType, exerciseCount);
  exerciseContainer.appendChild(submitButton);
}

function generateExercise(lessonType, difficulty) {
  if (lessonType === 'ensembles') {
    return generateEnsembleExercise(difficulty);
  } else if (lessonType === 'inequations') {
    return generateInequationExercise(difficulty);
  }
}

function generateEnsembleExercise(difficulty) {
  // Example: categorize a number into an ensemble based on difficulty
  const numbers = [1, -2, 3.5, -4.2, 7];
  const number = numbers[Math.floor(Math.random() * numbers.length)];
  const question = `Dans quel ensemble se trouve le nombre ${number} ?`;

  // Difficulty could vary the range of numbers and type (N, Z, Q, R)
  return { question, answer: determineEnsemble(number) };
}

function determineEnsemble(number) {
  if (Number.isInteger(number) && number >= 0) return 'N'; // Natural
  if (Number.isInteger(number)) return 'Z'; // Integer
  if (Number.isFinite(number)) return 'Q'; // Rational
  return 'R'; // Real
}

function generateInequationExercise(difficulty) {
  // Example: generate a random linear inequation
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10);
  const question = `Résoudre l'inéquation : ${a}x + ${b} <= 10`;
  
  return { question, answer: `x <= ${(10 - b) / a}` };
}

function checkAnswers(lessonType, count) {
  let correct = 0;

  for (let i = 0; i < count; i++) {
    const userAnswer = document.getElementById(`answer-${i}`).value;
    const correctAnswer = generateExercise(lessonType, i + 1).answer;
    
    if (userAnswer === correctAnswer) {
      correct++;
    }
  }

  alert(`Vous avez ${correct}/${count} bonnes réponses !`);
}
