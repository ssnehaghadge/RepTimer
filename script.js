let exercises = [
  { name: 'Jumping Jacks',duration: 30 },
  {name:'Push-ups', duration: 45},
  {name: 'Squats',duration: 40},
  { name: 'Plank', duration: 60 },
  {name: 'Lunges', duration: 50},
  {name:'High Knees',duration: 30 },
  {name: 'Burpees',duration: 45}
];

const exerciseList =document.getElementById('exerciseList') ;
const addExerciseForm= document.getElementById('addExerciseForm');
const exerciseNameInput=document.getElementById('exerciseNameInput')  ;
const exerciseDurationInput=document.getElementById('exerciseDurationInput');
const dailyProgress =document.getElementById('dailyProgress') ;

function getTodayKey(){
  const now = new Date();
  return 'fitness_routine_progress_' + now.toISOString().slice(0,10);
}

function loadDailyCompleted(){
  const key = getTodayKey();
  const stored = localStorage.getItem(key);
  if (stored){
    try{
      return new Set(JSON.parse(stored));
    } catch {
      return new Set();

    }
  }
  return new Set();
}


function saveDailyCompleted(completedSet){
  const key = getTodayKey();
  localStorage.setItem(key, JSON.stringify(Array.from(completedSet)));

}


function updateDailyProgress(completedSet){
  dailyProgress.textContent = `Today's Progress: ${completedSet.size} / ${exercises.length} completed`   ;
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}` ;
}

let dailyCompletedSet = loadDailyCompleted();


function createExerciseItem(exercise){
  let timerValue = exercise.duration;
  let intervalId = null;
  let running = false;

  const li = document.createElement('li');
  li.className = 'exercise';

  const topRow = document.createElement('div');

  topRow.className = 'top-row';
  li.appendChild(topRow);

  const label = document.createElement('label');

  label.className = 'exercise-name' ;

  const checkbox = document.createElement('input') ;
  checkbox.type = 'checkbox';
  checkbox.setAttribute('aria-label', `Mark ${exercise.name} complete`)  ;
  label.appendChild(checkbox);

  const nameSpan = document.createElement('span')  ;
  nameSpan.textContent = exercise.name;
  label.appendChild(nameSpan);

  topRow.appendChild(label);

  const timerSpan = document.createElement('span');
  timerSpan.className = 'timer';
  timerSpan.textContent = formatTime(timerValue);
  topRow.appendChild(timerSpan);

  const controls = document.createElement('div');
  controls.className = 'controls'  ;

  li.appendChild(controls);

  const startBtn = document.createElement('button');
  startBtn.className = 'control-btn';

  startBtn.textContent = 'Start';

  const pauseBtn = document.createElement('button');
  pauseBtn.className = 'control-btn';
  pauseBtn.textContent = 'Pause';

  pauseBtn.disabled = true;

  const resetBtn = document.createElement('button');
  resetBtn.className = 'control-btn';
  resetBtn.textContent = 'Reset';
  resetBtn.disabled = true;

  const removeBtn = document.createElement('button');
  removeBtn.className = 'control-btn remove-btn';
  removeBtn.textContent = 'Remove';
  removeBtn.setAttribute('aria-label', `Remove ${exercise.name} from routine`)  ;

  controls.appendChild(startBtn);
  controls.appendChild(pauseBtn);
  controls.appendChild(resetBtn);
  controls.appendChild(removeBtn);

 
  if (dailyCompletedSet.has(exercise.name)){
    checkbox.checked = true;
    checkbox.disabled = true;
    timerValue = 0;
    timerSpan.textContent = formatTime(timerValue);

    li.classList.add('completed');

    startBtn.disabled = true;
    pauseBtn.disabled = true;
    resetBtn.disabled = false;

  }

  function updateTimerDisplay(){
    timerSpan.textContent = formatTime(timerValue);
  }

  function tick(){
    if (timerValue > 0) {
      timerValue--;
      updateTimerDisplay();
    }else{
      clearInterval(intervalId);
      running = false;
      startBtn.disabled = true;
      pauseBtn.disabled = true;
      resetBtn.disabled = false;
      li.classList.add('completed');

      checkbox.checked = true;
      checkbox.disabled = true;

      dailyCompletedSet.add(exercise.name);
      saveDailyCompleted(dailyCompletedSet);
      updateDailyProgress(dailyCompletedSet);

    }
  }

  startBtn.addEventListener('click', () => {
    if (!running && timerValue > 0){
      intervalId = setInterval(tick, 1000);

      running = true;
      startBtn.disabled = true;
      pauseBtn.disabled = false;
      resetBtn.disabled = false;
      checkbox.disabled = true;
      li.classList.remove('completed');
    }
  });

  pauseBtn.addEventListener('click', () =>{
    if (running) {
      clearInterval(intervalId);
      running = false;
      startBtn.disabled = false;
      pauseBtn.disabled = true;
      resetBtn.disabled = false;

    }
  });

  resetBtn.addEventListener('click', () => {
    clearInterval(intervalId);
    running = false;
    timerValue = exercise.duration;
    updateTimerDisplay();
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
    checkbox.disabled = false;
    checkbox.checked = false;
    li.classList.remove('completed');

    
    if (dailyCompletedSet.delete(exercise.name)){
      saveDailyCompleted(dailyCompletedSet);
      updateDailyProgress(dailyCompletedSet);
    }
  });

  checkbox.addEventListener('change', () => {
    if (checkbox.checked){
      clearInterval(intervalId);
      running = false;
      startBtn.disabled = true;
      pauseBtn.disabled = true;
      resetBtn.disabled = false;
      timerValue = 0;

      updateTimerDisplay();

      li.classList.add('completed');
      checkbox.disabled = true;

      dailyCompletedSet.add(exercise.name);

      saveDailyCompleted(dailyCompletedSet);
      updateDailyProgress(dailyCompletedSet);

    }else {
      timerValue = exercise.duration;

      updateTimerDisplay();

      startBtn.disabled = false;
      pauseBtn.disabled = true;
      resetBtn.disabled = true;
      checkbox.disabled = false;
      li.classList.remove('completed');

      dailyCompletedSet.delete(exercise.name);
      saveDailyCompleted(dailyCompletedSet);
      updateDailyProgress(dailyCompletedSet);
    }
  });

  removeBtn.addEventListener('click', () => {
    if (running) {
      clearInterval(intervalId);
    }
    li.remove();
   
    exercises = exercises.filter(ex => ex.name !== exercise.name);
    if (dailyCompletedSet.delete(exercise.name)) {
      saveDailyCompleted(dailyCompletedSet);
    }
    updateDailyProgress(dailyCompletedSet);
  });

  return li;
}

function renderExercises(){
  exerciseList.innerHTML = '';
  exercises.forEach(ex => {
    exerciseList.appendChild(createExerciseItem(ex));
  });
  updateDailyProgress(dailyCompletedSet);
}


addExerciseForm.addEventListener('submit', (e) =>{
  e.preventDefault();
  const name = exerciseNameInput.value.trim();
  const duration = parseInt(exerciseDurationInput.value, 10);
  if (!name) {
    alert('Please enter a valid exercise name.');
    return;
  }

  if (isNaN(duration) || duration < 5 || duration > 600){
    alert('Please enter a duration between 5 and 600 seconds.');
    return;
  }

  
  if (exercises.some(ex => ex.name.toLowerCase() === name.toLowerCase())) {
    alert('Exercise name already exists in the list.');
    return;

  }

  const newExercise = { name, duration };
  exercises.push(newExercise);

  const newExerciseItem = createExerciseItem(newExercise);
  exerciseList.appendChild(newExerciseItem);

  updateDailyProgress(dailyCompletedSet);

  addExerciseForm.reset();
  exerciseDurationInput.value = 30;
  exerciseNameInput.focus();
  
});


renderExercises();
