var formInputEl = document.querySelector("#form-input")
var formBtnEl = document.querySelector("#form-btn")
var selectedExrcEl = document.querySelector("#selected-exercise")
var dropdownLiEl = document.querySelector("#list-item")
var selectedListEl = document.querySelector("#selected-list")
var exercise = [];





var formSubmitHandler = function(event) {
  event.preventDefault();
  

  //get value from input element
  var exerciseNameInput = document.querySelector("input[name='exercise-name']").value.trim();
  var setsInput = document.querySelector("input[name='sets']").value;
  var repsInput = document.querySelector("input[name='reps']").value;
  var weightInput = document.querySelector("input[name='weight']").value;
  


  // reset form fields for next exercise to be entered
  document.querySelector("input[name='exercise-name']").value = "";
  document.querySelector("input[name='sets']").value = "";
  document.querySelector("input[name='reps']").value = "";
  document.querySelector("input[name='weight']").value = "";
  
  // check for inputs are empty(validate)
if (exerciseNameInput === "" || setsInput ==="" || repsInput === "" || weightInput === ""){
  return false;
};

  var exerciseDataInput = {
    name: exerciseNameInput,
    sets: setsInput,
    reps: repsInput,
    weight: weightInput
  };
  
  
  savedExercisesLi(exerciseDataInput);
  console.log(exerciseDataInput)
}


var savedExercisesLi = function(exerciseDataInput) {

 var listItemEl = document.querySelector("#list-item")
 listItemEl = document.createElement("li");
listItemEl.classList = ""


var exerciseInfoEl = document.createElement("div");
exerciseInfoEl.classList = "p-2"
 exerciseInfoEl.innerHTML = "<h2>" + exerciseDataInput.name + "</h2><p>" + 'Sets: ' + exerciseDataInput.sets + "</p><p>" + 'Reps: '+ exerciseDataInput.reps + "</p><p>" + 'Weight:' + exerciseDataInput.weight + "</p>" 

var addBtn = document.createElement("button");
addBtn.type = "button";
addBtn.name = "addBtn"
addBtn.innerText = "+";

exerciseInfoEl.appendChild(addBtn);

listItemEl.appendChild(exerciseInfoEl);
 dropdownLiEl.appendChild(listItemEl)


exercise.push(exerciseDataInput);

//addBtn.addEventListener("click", selectedExercise)

selectedExercise(exerciseDataInput);
};

var selectedExercise = function(exerciseDataInput) {
var selectedList = document.createElement("li");
var selectedBtn = document.createElement("button");
selectedBtn.type = "button";
selectedBtn.name = "selectedBtn";
selectedBtn.innerText = "-";

var selectedExerciseList = document.createElement("div");
 //selectedExerciseList.innerHTML = "<h2>" + exerciseDataInput.name + "</h2><p>" + 'Sets: ' + exerciseDataInput.sets + "</p><p>" + 'Reps: '+ exerciseDataInput.reps + "</p><p>" + 'Weight:' + exerciseDataInput.weight + "</p>"

selectedList.append(selectedBtn, selectedExerciseList);

selectedListEl.appendChild(selectedList);


}

selectedExercise();






formBtnEl.addEventListener("click", formSubmitHandler) 
  










     




// MODAL 
document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
      $el.classList.add('is-active');
    }
  
    function closeModal($el) {
      
      $el.classList.remove('is-active');
    }
  
    function closeAllModals() {
      (document.querySelectorAll('.modal') || []).forEach(($modal) => {
        closeModal($modal);
      });
    }
  
    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);
      //console.log($target);
  
      $trigger.addEventListener('click', () => {
        openModal($target);
      });
    });

  
    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
      const $target = $close.closest('.modal');
  
      $close.addEventListener('click', () => {
        closeModal($target);
      });
    });
  
    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
      const e = event || window.event;
  
      if (e.keyCode === 27) { // Escape key
        closeAllModals();
      }
    });
  });