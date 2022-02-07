var formInputEl = document.querySelector("#form-input")
var formBtnEl = document.querySelector("#form-btn")
var exerciseIdCounter = 0;
var dropdownLiEl = document.querySelector("#dropdown-li")

var exercise = [];





var formSubmitHandler = function(event) {
  event.preventDefault();
  

  //get value from input element
  var exerciseNameInput = document.querySelector("input[name='exercise-name']").value;
  var setsInput = document.querySelector("input[name='sets']").value;
  var repsInput = document.querySelector("input[name='reps']").value;
  var weightInput = document.querySelector("input[name='weight']").value;
  console.log(exerciseNameInput, setsInput, repsInput, weightInput)

  var exerciseDataInput = {
    exerciseNameInput,
    setsInput,
    repsInput,
    weightInput
  };
  savedExercisesLi(exerciseDataInput);
}


var savedExercisesLi = function(exerciseDataInput) {
var listItemEl = document.createElement("li");
listItemEl.setAttribute("data-exercise-id", exerciseIdCounter);

var exerciseInfoEl = document.createElement("div");
exerciseInfoEl.innerHTML = "<h3>" + exerciseDataInput.name +"</h3>" ;

var addBtn = document.createElement("button");
addBtn.textContent = "+";

exerciseInfoEl.appendChild(addBtn);

listItemEl.appendChild(exerciseInfoEl);

exerciseDataInput.id = exerciseIdCounter;

exercise.push(exerciseDataInput);
dropdownLiEl.append(exerciseDataInput)
}

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