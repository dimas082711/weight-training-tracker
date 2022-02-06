var modalEl = document.querySelector(".modal-content")


// var workoutCont = function() {
// var workoutDiv = document.createElement("div");
// workoutDiv.classList = "" 

// var customExercise = document.createElement("div")
// customExercise.classList = "";
// customExercise.innerHTML = "<h2>'Text Here'</h2>"

// workoutDiv.appendChild(customExercise);

// var textBox = document.createElement("input")
// textBox.setAttribute("type", "text");
// textBox.placeholder = "enter"
// textBox.classList = ""


// customExercise.appendChild(textBox)

// var addBtn = document.createElement("button")
// addBtn.type = "button"
// addBtn.name = "saveBtn"
// addBtn.innerText = "add"
// addBtn.classList = "button is-success"
// customExercise.appendChild(addBtn);
// addBtn.addEventListener("click", textBox)

// modalEl.append(workoutDiv)

// }

// workoutCont();

  
    //  var savedExercises = function() {
    //      var exerciseDiv = document.createElement("li")
    //     exerciseDiv.classList = ""
    //     exerciseDiv.innerHTML = "Saved Exercises"

    //     //create dropdown for list items
     //}   
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
      console.log($target);
  
      $trigger.addEventListener('click', () => {
        openModal($target);
      });
    });

    S
  
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