var formInputEl = document.querySelector("#form-input")
var formBtnEl = document.querySelector("#form-btn")

var dropdownLiEl = document.querySelector("#dropdown-li")

var exercise = [];





var formSubmitHandler = function(event) {
  event.preventDefault();
  

  //get value from input element
  var exerciseNameInput = document.querySelector("input[name='exercise-name']").value;
  var setsInput = document.querySelector("input[name='sets']").value;
  var repsInput = document.querySelector("input[name='reps']").value;
  var weightInput = document.querySelector("input[name='weight']").value;
  


  // reset form fields for next exercise to be entered
  document.querySelector("input[name='exercise-name']").value = "";
  document.querySelector("input[name='sets']").value = "";
  document.querySelector("input[name='reps']").value = "";
  document.querySelector("input[name='weight']").value = "";
  

  var exerciseDataInput = {
    name: exerciseNameInput,
    sets: setsInput,
    reps: repsInput,
    weight: weightInput
  };
  // let exerciseString = JSON.stringify(exerciseDataInput)
  savedExercisesLi(exerciseDataInput);
  console.log(setsInput, repsInput)
}


var savedExercisesLi = function(exerciseDataInput) {
 var listItemEl = document.querySelector("#list-item")
 listItemEl = document.createElement("div");
listItemEl.classList = "columns"
// listItemEl.setAttribute("data-exercise-id");

var exerciseInfoEl = document.createElement("li");
exerciseInfoEl.classList = "column is-half"
 exerciseInfoEl.innerHTML = "<p>" + exerciseDataInput.name + "</p><p>" + 'Sets: ' + exerciseDataInput.sets + "</p><p>" + 'Reps: '+ exerciseDataInput.reps + "</p><p>" + 'Weight:' + exerciseDataInput.weight + "</p>" 

var addBtn = document.createElement("button");
addBtn.type = "button";
addBtn.name = "addBtn"
addBtn.innerText = "+";

exerciseInfoEl.appendChild(addBtn);

listItemEl.appendChild(exerciseInfoEl);
 dropdownLiEl.append(exerciseInfoEl)


exercise.push(exerciseDataInput);


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