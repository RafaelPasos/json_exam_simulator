// --- DOM Elements ---
const views = {
  setup: document.getElementById('view-setup'),
  exam: document.getElementById('view-exam'),
  results: document.getElementById('view-results')
};

// Setup View
const fileInput = document.getElementById('exam-file');
const fileNameDisplay = document.getElementById('file-name-display');
const timerInput = document.getElementById('timer-input');
const btnStart = document.getElementById('btn-start');
const btnLoadEn = document.getElementById('btn-load-en');
const btnLoadEs = document.getElementById('btn-load-es');

const fileIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`;

// Exam View
const examTitleDisplay = document.getElementById('active-exam-title');
const timerDisplay = document.getElementById('timer-display');
const btnPauseResume = document.getElementById('btn-pause-resume');

// About Modal Elements
const btnAbout = document.getElementById('btn-about');
const btnCloseAbout = document.getElementById('btn-close-about');
const aboutModal = document.getElementById('about-modal');
const btnResetExam = document.getElementById('btn-reset-exam');
const progressBar = document.getElementById('progress-bar');
const questionNumberDisplay = document.getElementById('question-number');
const questionTextDisplay = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const btnSubmit = document.getElementById('btn-submit');

// Results View
const scorePercentageDisplay = document.getElementById('score-percentage');
const scoreTextDisplay = document.getElementById('score-text');
const reviewList = document.getElementById('review-list');
const btnRestart = document.getElementById('btn-restart');
const scoreCircle = document.querySelector('.score-circle');

// --- State & i18n ---
const i18n = {
  en: {
    subtitle: "Upload a question bank to begin.",
    btnLoadEn: "CTFL English",
    btnLoadEs: "CTFL Español",
    orDivider: "— OR —",
    dropzoneText: "Click to browse or drag custom JSON here",
    noFileSelected: "No file selected",
    maxQuestionsLabel: "Max Questions:",
    timeLimitLabel: "Time Limit (minutes):",
    btnStart: "Start Exam",
    btnReset: "Reset",
    btnPrev: "Previous",
    btnNext: "Next",
    btnSubmit: "Submit Exam",
    examPaused: "Exam Paused",
    resultsHeader: "Exam Results",
    scoreSubtitle: "Score",
    btnRestart: "Take Another Exam",
    btnHelp: "Help",
    yourAnswer: "Your Answer:",
    scoreText: (correct, total) => `You got ${correct} out of ${total} correct.`,
    aboutTitle: "About JSON Exam Simulator",
    aboutIntro: "This is a lightweight web app designed to simulate certification exams using custom JSON files. Your data never leaves your browser.",
    aboutHowToTitle: "How to Use",
    aboutHowToDesc: "Click a preloaded exam or drag-and-drop your own JSON file. Adjust the settings, and click Start Exam.",
    aboutJsonFormat: "JSON Format Example",
    aboutPromptTitle: "Generate Exams using AI",
    aboutPromptDesc: "Copy and paste these tailored prompts into an AI (like ChatGPT, Claude, or Gemini) to easily generate your own custom exam files.",
    promptTopicTitle: "Prompt 1: Generate from a Certification Topic",
    promptTopicText: "Act as an expert in [INSERT CERTIFICATION/TOPIC]. Create a 60-question multiple-choice practice exam simulating real-world scenarios. Output the result as a downloadable JSON file matching this exact schema: {\"title\": \"[Exam Title]\", \"questions\": [{\"id\": 1, \"question\": \"...\", \"options\": [\"...\", \"...\", \"...\", \"...\"], \"answer\": 0, \"justification\": \"...\"}]}. The 'answer' field must be a 0-based integer representing the correct option. Do not include markdown formatting or any text outside the JSON.",
    promptDocTitle: "Prompt 2: Extract from a PDF/Word Document",
    promptDocText: "I have attached a study guide document. Please extract the key concepts and generate a 60-question multiple-choice practice exam based strictly on the contents of this document. Output the result as a downloadable JSON file matching this exact schema: {\"title\": \"[Exam Title]\", \"questions\": [{\"id\": 1, \"question\": \"...\", \"options\": [\"...\", \"...\", \"...\", \"...\"], \"answer\": 0, \"justification\": \"...\"}]}. The 'answer' field must be a 0-based integer representing the correct option. Do not include markdown formatting or any text outside the JSON.",
    btnCopy: "Copy"
  },
  es: {
    subtitle: "Sube un banco de preguntas para comenzar.",
    btnLoadEn: "CTFL English",
    btnLoadEs: "CTFL Español",
    orDivider: "— O —",
    dropzoneText: "Haz clic o arrastra un JSON aquí",
    noFileSelected: "Ningún archivo seleccionado",
    maxQuestionsLabel: "Preguntas Máximas:",
    timeLimitLabel: "Tiempo Límite (minutos):",
    btnStart: "Iniciar Examen",
    btnReset: "Reiniciar",
    btnPrev: "Anterior",
    btnNext: "Siguiente",
    btnSubmit: "Entregar Examen",
    examPaused: "Examen Pausado",
    resultsHeader: "Resultados del Examen",
    scoreSubtitle: "Puntuación",
    btnRestart: "Tomar Otro Examen",
    btnHelp: "Ayuda",
    yourAnswer: "Tu Respuesta:",
    scoreText: (correct, total) => `Obtuviste ${correct} de ${total} correctas.`,
    aboutTitle: "Acerca del Simulador",
    aboutIntro: "Esta es una aplicación web ligera diseñada para simular exámenes de certificación usando archivos JSON personalizados. Tus datos nunca salen del navegador.",
    aboutHowToTitle: "Cómo usar",
    aboutHowToDesc: "Haz clic en un examen precargado o arrastra tu propio archivo JSON. Ajusta la configuración y haz clic en Comenzar Examen.",
    aboutJsonFormat: "Ejemplo de Formato JSON",
    aboutPromptTitle: "Generar Exámenes con IA",
    aboutPromptDesc: "Copia y pega estos prompts adaptados en una IA (como ChatGPT, Claude o Gemini) para generar fácilmente tus propios archivos de examen.",
    promptTopicTitle: "Prompt 1: Generar desde un Tema de Certificación",
    promptTopicText: "Actúa como un experto en [INSERTAR CERTIFICACIÓN/TEMA]. Crea un examen de práctica de 60 preguntas de opción múltiple simulando escenarios del mundo real. Genera el resultado como un archivo JSON descargable que coincida con este esquema exacto: {\"title\": \"[Título del Examen]\", \"questions\": [{\"id\": 1, \"question\": \"...\", \"options\": [\"...\", \"...\", \"...\", \"...\"], \"answer\": 0, \"justification\": \"...\"}]}. El campo 'answer' debe ser un número entero basado en 0 que represente la opción correcta. No incluyas formato markdown ni texto fuera del JSON.",
    promptDocTitle: "Prompt 2: Extraer de un Documento PDF/Word",
    promptDocText: "He adjuntado un documento de guía de estudio. Por favor, extrae los conceptos clave y genera un examen de práctica de 60 preguntas de opción múltiple basado estrictamente en el contenido de este documento. Genera el resultado como un archivo JSON descargable que coincida con este esquema exacto: {\"title\": \"[Título del Examen]\", \"questions\": [{\"id\": 1, \"question\": \"...\", \"options\": [\"...\", \"...\", \"...\", \"...\"], \"answer\": 0, \"justification\": \"...\"}]}. El campo 'answer' debe ser un número entero basado en 0 que represente la opción correcta. No incluyas formato markdown ni texto fuera del JSON.",
    btnCopy: "Copiar"
  }
};
let currentLang = 'en';

let state = {
  status: 'setup',
  examData: null,
  answers: {},
  timeRemaining: 0,
  currentQuestionIndex: 0
};

let timerInterval = null;

function updateLanguage() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (i18n[currentLang] && i18n[currentLang][key]) {
      if (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT') {
        el.value = i18n[currentLang][key];
      } else {
        el.textContent = i18n[currentLang][key];
      }
    }
  });
}

function setLanguage(lang) {
  currentLang = lang;
  updateLanguage();
  
  const btnLangEn = document.getElementById('btn-lang-en');
  const btnLangEs = document.getElementById('btn-lang-es');
  if (btnLangEn && btnLangEs) {
    if (lang === 'en') {
      btnLangEn.classList.add('active');
      btnLangEs.classList.remove('active');
    } else {
      btnLangEs.classList.add('active');
      btnLangEn.classList.remove('active');
    }
  }
}

// --- Initialization ---
function init() {
  loadState();
  setLanguage(currentLang);
  
  if (state.status === 'active' || state.status === 'paused') {
    renderExamView();
    if (state.status === 'active') startTimer();
  } else if (state.status === 'finished') {
    renderResultsView();
  } else {
    showView('setup');
  }

  attachEventListeners();
}

function loadState() {
  const savedState = localStorage.getItem('examSimulatorState');
  if (savedState) {
    try {
      state = JSON.parse(savedState);
    } catch (e) {
      console.error("Failed to parse state", e);
    }
  }
}

function saveState() {
  localStorage.setItem('examSimulatorState', JSON.stringify(state));
}

function showView(viewName) {
  const switchView = () => {
    Object.values(views).forEach(v => v.classList.remove('active'));
    views[viewName].classList.add('active');
  };

  if (document.startViewTransition) {
    document.startViewTransition(switchView);
  } else {
    switchView();
  }
}

// --- Event Listeners ---
function attachEventListeners() {
  // Setup
  fileInput.addEventListener('change', handleFileUpload);
  const btnLangEn = document.getElementById('btn-lang-en');
  const btnLangEs = document.getElementById('btn-lang-es');
  
  if (btnLangEn && btnLangEs) {
    btnLangEn.addEventListener('click', () => setLanguage('en'));
    btnLangEs.addEventListener('click', () => setLanguage('es'));
  }

  btnLoadEn.addEventListener('click', () => fetchExam('CTFL_EN.json'));
  btnLoadEs.addEventListener('click', () => fetchExam('CTFL_ES.json'));
  btnStart.addEventListener('click', startExam);

  // Exam Navigation
  btnPrev.addEventListener('click', () => navigate(-1));
  btnNext.addEventListener('click', () => navigate(1));
  btnSubmit.addEventListener('click', submitExam);
  
  // Timer Pause/Resume
  btnPauseResume.addEventListener('click', togglePause);
  
  btnResetExam.addEventListener('click', () => {
    if (confirm("Are you sure you want to reset the exam? All progress will be lost.")) {
      clearInterval(timerInterval);
      resetApp();
    }
  });

  // Restart
  btnRestart.addEventListener('click', resetApp);
  
  if (btnAbout && btnCloseAbout && aboutModal) {
    btnAbout.addEventListener('click', () => {
      aboutModal.classList.remove('hide');
    });

    btnCloseAbout.addEventListener('click', () => {
      aboutModal.classList.add('hide');
    });

    aboutModal.addEventListener('click', (e) => {
      if (e.target === aboutModal) {
        aboutModal.classList.add('hide');
      }
    });
  }

  // Copy Buttons
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const targetId = e.currentTarget.getAttribute('data-target');
      const textarea = document.getElementById(targetId);
      if (textarea) {
        try {
          // Use modern clipboard API if available
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(textarea.value);
          } else {
            // Fallback for non-secure contexts
            textarea.select();
            document.execCommand('copy');
          }
          
          const originalText = e.currentTarget.innerHTML;
          const copiedText = currentLang === 'es' ? '¡Copiado!' : 'Copied!';
          
          e.currentTarget.innerHTML = `<svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> <span>${copiedText}</span>`;
          e.currentTarget.classList.add('copied');
          
          setTimeout(() => {
            e.currentTarget.innerHTML = originalText;
            e.currentTarget.classList.remove('copied');
          }, 2000);
        } catch (err) {
          console.error("Failed to copy", err);
        }
      }
    });
  });
}

// --- File Handling ---
function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  btnLoadEn.classList.remove('preloaded-selected');
  btnLoadEs.classList.remove('preloaded-selected');

  fileNameDisplay.innerHTML = `${fileIcon} <span>${file.name}</span>`;
  fileNameDisplay.classList.add('loaded');
  
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const json = JSON.parse(e.target.result);
      if (validateExamData(json)) {
        if (json.questions) {
          // Fisher-Yates shuffle all questions
          for (let i = json.questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [json.questions[i], json.questions[j]] = [json.questions[j], json.questions[i]];
          }
        }
        window.fullExamData = json;
        btnStart.disabled = false;
      } else {
        alert("Invalid exam JSON format.");
        btnStart.disabled = true;
      }
    } catch (err) {
      alert("Error parsing JSON.");
      btnStart.disabled = true;
    }
  };
  reader.readAsText(file);
}

async function fetchExam(filename) {
  try {
    fileInput.value = ''; // Clear manual upload
    
    // Clear the custom dropzone badge since the button is the visual indicator
    fileNameDisplay.textContent = i18n[currentLang].noFileSelected;
    fileNameDisplay.classList.remove('loaded');
    const response = await fetch(filename);
    if (!response.ok) throw new Error('Network response was not ok');
    
    const json = await response.json();
    if (validateExamData(json)) {
      if (json.questions) {
        // Fisher-Yates shuffle all questions
        for (let i = json.questions.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [json.questions[i], json.questions[j]] = [json.questions[j], json.questions[i]];
        }
      }
      
      if (filename === 'CTFL_ES.json') {
        setLanguage('es');
        btnLoadEs.classList.add('preloaded-selected');
        btnLoadEn.classList.remove('preloaded-selected');
      } else {
        setLanguage('en');
        btnLoadEn.classList.add('preloaded-selected');
        btnLoadEs.classList.remove('preloaded-selected');
      }
      
      window.fullExamData = json;
      btnStart.disabled = false;
    } else {
      alert("Invalid exam JSON format.");
      btnStart.disabled = true;
    }
  } catch (error) {
    alert(`Error loading ${filename}. Make sure the file exists on the server.`);
    btnStart.disabled = true;
  }
}

function validateExamData(data) {
  return data && data.title && Array.isArray(data.questions) && data.questions.length > 0;
}

// --- Exam Flow ---
function startExam() {
  if (!window.fullExamData) return;
  
  const minutes = parseInt(timerInput.value, 10) || 60;
  const maxQ = parseInt(document.getElementById('max-questions-input').value, 10) || 30;
  
  state.status = 'active';
  state.timeRemaining = minutes * 60;
  state.currentQuestionIndex = 0;
  state.answers = {};
  
  // Clone data and slice questions array
  state.examData = {
    ...window.fullExamData,
    questions: window.fullExamData.questions.slice(0, maxQ)
  };
  
  saveState();
  renderExamView();
  startTimer();
}

function renderExamView() {
  showView('exam');
  examTitleDisplay.textContent = state.examData.title || "Exam";
  updateTimerDisplay();
  
  if (state.status === 'paused') {
    btnPauseResume.textContent = '▶';
    questionTextDisplay.textContent = "Exam Paused";
    optionsContainer.innerHTML = '';
    btnPrev.disabled = true;
    btnNext.disabled = true;
    return;
  }
  
  btnPauseResume.textContent = '⏸';
  btnPrev.disabled = false;
  btnNext.disabled = false;
  
  renderCurrentQuestion();
}

function renderCurrentQuestion() {
  const total = state.examData.questions.length;
  const index = state.currentQuestionIndex;
  const q = state.examData.questions[index];
  
  // Progress
  questionNumberDisplay.textContent = `Question ${index + 1} of ${total}`;
  progressBar.style.width = `${((index + 1) / total) * 100}%`;
  
  // Content
  questionTextDisplay.textContent = q.text;
  
  optionsContainer.innerHTML = '';
  q.options.forEach(opt => {
    const label = document.createElement('label');
    label.className = 'option-label';
    if (state.answers[q.id] === opt.id) {
      label.classList.add('selected');
    }
    
    label.innerHTML = `
      <input type="radio" name="question_option" value="${opt.id}" class="option-input" 
             ${state.answers[q.id] === opt.id ? 'checked' : ''}>
      <div class="option-indicator"></div>
      <div class="option-text">${opt.text}</div>
    `;
    
    label.addEventListener('click', () => {
      // visual update
      document.querySelectorAll('.option-label').forEach(l => l.classList.remove('selected'));
      label.classList.add('selected');
      // state update
      state.answers[q.id] = opt.id;
      saveState();
    });
    
    label.addEventListener('dblclick', () => {
      navigate(1);
    });
    
    optionsContainer.appendChild(label);
  });
  
  // Buttons
  btnPrev.classList.toggle('hide', index === 0);
  
  if (index === total - 1) {
    btnNext.classList.add('hide');
    btnSubmit.classList.remove('hide');
  } else {
    btnNext.classList.remove('hide');
    btnSubmit.classList.add('hide');
  }
}

function navigate(direction) {
  const newIndex = state.currentQuestionIndex + direction;
  if (newIndex >= 0 && newIndex < state.examData.questions.length) {
    state.currentQuestionIndex = newIndex;
    saveState();
    
    if (document.startViewTransition) {
      document.startViewTransition(() => renderCurrentQuestion());
    } else {
      renderCurrentQuestion();
    }
  }
}

// --- Timer ---
function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    if (state.status !== 'active') return;
    
    state.timeRemaining--;
    saveState();
    updateTimerDisplay();
    
    if (state.timeRemaining <= 0) {
      submitExam();
    }
  }, 1000);
}

function togglePause() {
  if (state.status === 'active') {
    state.status = 'paused';
    saveState();
    renderExamView();
  } else if (state.status === 'paused') {
    state.status = 'active';
    saveState();
    renderExamView();
  }
}

function updateTimerDisplay() {
  const totalSeconds = Math.max(0, state.timeRemaining);
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  timerDisplay.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

// --- Results Flow ---
function submitExam() {
  clearInterval(timerInterval);
  state.status = 'finished';
  saveState();
  renderResultsView();
}

function renderResultsView() {
  showView('results');
  
  const questions = state.examData.questions;
  let correctCount = 0;
  
  reviewList.innerHTML = '';
  
  questions.forEach((q, idx) => {
    const userAnsId = state.answers[q.id];
    const isCorrect = userAnsId === q.correctOptionId;
    if (isCorrect) correctCount++;
    
    const item = document.createElement('div');
    item.className = `review-item ${isCorrect ? 'correct' : 'incorrect'}`;
    
    let optionsHtml = '';
    const correctOpt = q.options.find(o => o.id === q.correctOptionId);
    const userOpt = q.options.find(o => o.id === userAnsId);
    
    if (!isCorrect && userOpt) {
      optionsHtml += `<div class="review-option user-wrong">
        ${i18n[currentLang].yourAnswer} ${userOpt.text}
      </div>`;
    }
    
    if (correctOpt) {
      optionsHtml += `<div class="review-option correct-answer">
        ${correctOpt.text}
      </div>`;
    }
    
    item.innerHTML = `
      <div class="review-q-text">${idx + 1}. ${q.text}</div>
      <div class="review-options">${optionsHtml}</div>
    `;
    
    if (q.justification) {
      item.innerHTML += `
        <div class="review-justification" style="display: flex; align-items: flex-start; gap: 0.5rem;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0; margin-top: 2px; color: var(--text-main);"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
          <div>${q.justification}</div>
        </div>
      `;
    }
    
    reviewList.appendChild(item);
  });
  
  const scorePercentage = Math.round((correctCount / questions.length) * 100);
  const scorePercentageEl = document.getElementById('score-percentage');
  const scoreTextEl = document.getElementById('score-text');
  const scoreCircle = document.querySelector('.score-circle');
  
  scoreTextEl.textContent = i18n[currentLang].scoreText(correctCount, questions.length);
  
  // Animate score from 0 to final
  const duration = 1500;
  const startTime = performance.now();
  
  function animateScore(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOutProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease-out
    
    const currentPercent = Math.round(easeOutProgress * scorePercentage);
    
    scorePercentageEl.textContent = `${currentPercent}%`;
    scoreCircle.style.background = `conic-gradient(var(--primary) ${currentPercent}%, var(--panel-border) ${currentPercent}%)`;
    
    if (progress < 1) {
      requestAnimationFrame(animateScore);
    }
  }
  
  requestAnimationFrame(animateScore);
}

function resetApp() {
  state = {
    status: 'setup',
    examData: null,
    answers: {},
    timeRemaining: 0,
    currentQuestionIndex: 0
  };
  saveState();
  window.fullExamData = null;
  setLanguage('en');
  
  btnLoadEn.classList.remove('preloaded-selected');
  btnLoadEs.classList.remove('preloaded-selected');
  
  fileInput.value = '';
  fileNameDisplay.textContent = i18n['en'].noFileSelected;
  fileNameDisplay.classList.remove('loaded');
  btnStart.disabled = true;
  
  showView('setup');
}

// Boot
init();

// --- Title Animation ---
const canvas = document.getElementById('title-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

const resultsCanvas = document.getElementById('results-title-canvas');
const resultsCtx = resultsCanvas.getContext('2d');
let resultsParticles = [];

const numTitleParticles = 150; // Increased for larger area
const numResultsParticles = 80;
const connectionDistance = 40;

const btnCanvas = document.getElementById('btn-canvas');
const btnCtx = btnCanvas.getContext('2d');
const restartBtnCanvas = document.getElementById('restart-btn-canvas');
const restartBtnCtx = restartBtnCanvas.getContext('2d');
let btnParticles = [];
const numBtnParticles = 30;

function initTitleAnimation() {
  particles = [];
  for (let i = 0; i < numTitleParticles; i++) {
    particles.push({
      x: Math.random() * 500,
      y: Math.random() * 140, // Increased height for two lines
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      size: Math.random() * 1.5 + 0.5
    });
  }
  
  btnParticles = [];
  for (let i = 0; i < numBtnParticles; i++) {
    btnParticles.push({
      x: Math.random() * 260,
      y: Math.random() * 50,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      size: Math.random() * 1.5 + 0.5
    });
  }
  
  resultsParticles = [];
  for (let i = 0; i < numResultsParticles; i++) {
    resultsParticles.push({
      x: Math.random() * 500,
      y: Math.random() * 60,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      size: Math.random() * 1.5 + 0.5
    });
  }
  
  const dpr = window.devicePixelRatio || 1;
  canvas.width = 500 * dpr;
  canvas.height = 140 * dpr; // Increased height
  ctx.scale(dpr, dpr);
  
  resultsCanvas.width = 500 * dpr;
  resultsCanvas.height = 60 * dpr;
  resultsCtx.scale(dpr, dpr);
  
  btnCanvas.width = 260 * dpr;
  btnCanvas.height = 50 * dpr;
  btnCtx.scale(dpr, dpr);
  
  restartBtnCanvas.width = 260 * dpr;
  restartBtnCanvas.height = 50 * dpr;
  restartBtnCtx.scale(dpr, dpr);
  
  requestAnimationFrame(drawTitleAnimation);
}

function drawTitleAnimation() {
  if (state.status === 'setup') {
    ctx.clearRect(0, 0, 500, 140);
    
    // Draw base text
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = '#0f172a';
    ctx.textBaseline = 'top';
    
    // JSON line (2x size)
    ctx.font = '800 88px Inter, sans-serif'; 
    ctx.fillText('JSON', 0, 0);
    
    // Exam Simulator line
    ctx.font = '800 44px Inter, sans-serif'; 
    ctx.fillText('Exam Simulator', 0, 85);
    
    // Draw particles clipped to text
    ctx.globalCompositeOperation = 'source-atop';
    ctx.fillStyle = '#4da4c9'; 
    ctx.lineWidth = 1;
    
    for (let i = 0; i < numTitleParticles; i++) {
      let p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      
      // Bounce off edges
      if (p.x < 0 || p.x > 500) p.vx *= -1;
      if (p.y < 0 || p.y > 140) p.vy *= -1;
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw connecting lines
      for (let j = i + 1; j < numTitleParticles; j++) {
        let p2 = particles[j];
        let dx = p.x - p2.x;
        let dy = p.y - p2.y;
        let dist = Math.sqrt(dx*dx + dy*dy);
        
        if (dist < connectionDistance) {
          let opacity = 1 - (dist / connectionDistance);
          ctx.strokeStyle = `rgba(77, 164, 201, ${opacity * 0.8})`;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }
  } else if (state.status === 'finished') {
    resultsCtx.clearRect(0, 0, 500, 60);
    
    resultsCtx.globalCompositeOperation = 'source-over';
    resultsCtx.fillStyle = '#0f172a';
    resultsCtx.font = '800 44px Inter, sans-serif'; 
    resultsCtx.textBaseline = 'middle';
    resultsCtx.fillText(i18n[currentLang].examResultsTitle, 0, 32);
    
    resultsCtx.globalCompositeOperation = 'source-atop';
    resultsCtx.fillStyle = '#4da4c9'; 
    resultsCtx.lineWidth = 1;
    
    for (let i = 0; i < numResultsParticles; i++) {
      let p = resultsParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      
      if (p.x < 0 || p.x > 500) p.vx *= -1;
      if (p.y < 0 || p.y > 60) p.vy *= -1;
      
      resultsCtx.beginPath();
      resultsCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      resultsCtx.fill();
      
      for (let j = i + 1; j < numResultsParticles; j++) {
        let p2 = resultsParticles[j];
        let dx = p.x - p2.x;
        let dy = p.y - p2.y;
        let dist = Math.sqrt(dx*dx + dy*dy);
        
        if (dist < connectionDistance) {
          let opacity = 1 - (dist / connectionDistance);
          resultsCtx.strokeStyle = `rgba(77, 164, 201, ${opacity * 0.8})`;
          resultsCtx.beginPath();
          resultsCtx.moveTo(p.x, p.y);
          resultsCtx.lineTo(p2.x, p2.y);
          resultsCtx.stroke();
        }
      }
    }
    
    // Draw restart button animation
    restartBtnCtx.clearRect(0, 0, 260, 50);
    restartBtnCtx.fillStyle = '#4da4c9'; 
    restartBtnCtx.lineWidth = 1;
    
    for (let i = 0; i < numBtnParticles; i++) {
      let p = btnParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      
      if (p.x < 0 || p.x > 260) p.vx *= -1;
      if (p.y < 0 || p.y > 50) p.vy *= -1;
      
      restartBtnCtx.beginPath();
      restartBtnCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      restartBtnCtx.fill();
      
      for (let j = i + 1; j < numBtnParticles; j++) {
        let p2 = btnParticles[j];
        let dx = p.x - p2.x;
        let dy = p.y - p2.y;
        let dist = Math.sqrt(dx*dx + dy*dy);
        
        if (dist < 30) {
          let opacity = 1 - (dist / 30);
          restartBtnCtx.strokeStyle = `rgba(77, 164, 201, ${opacity * 0.8})`;
          restartBtnCtx.beginPath();
          restartBtnCtx.moveTo(p.x, p.y);
          restartBtnCtx.lineTo(p2.x, p2.y);
          restartBtnCtx.stroke();
        }
      }
    }
  }
  
  // Draw button animation if enabled
  if (!btnStart.disabled) {
    btnCtx.clearRect(0, 0, 260, 50);
    btnCtx.fillStyle = '#4da4c9'; // Blue particles
    btnCtx.lineWidth = 1;
    
    for (let i = 0; i < numBtnParticles; i++) {
      let p = btnParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      
      if (p.x < 0 || p.x > 260) p.vx *= -1;
      if (p.y < 0 || p.y > 50) p.vy *= -1;
      
      btnCtx.beginPath();
      btnCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      btnCtx.fill();
      
      for (let j = i + 1; j < numBtnParticles; j++) {
        let p2 = btnParticles[j];
        let dx = p.x - p2.x;
        let dy = p.y - p2.y;
        let dist = Math.sqrt(dx*dx + dy*dy);
        
        if (dist < 30) {
          let opacity = 1 - (dist / 30);
          btnCtx.strokeStyle = `rgba(77, 164, 201, ${opacity * 0.8})`; // Blue lines
          btnCtx.beginPath();
          btnCtx.moveTo(p.x, p.y);
          btnCtx.lineTo(p2.x, p2.y);
          btnCtx.stroke();
        }
      }
    }
  }
  
  requestAnimationFrame(drawTitleAnimation);
}

document.fonts.ready.then(() => {
  initTitleAnimation();
});
