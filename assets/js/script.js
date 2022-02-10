var selectedExrcEl = document.querySelector("#selected-exercises")
var dropdownLiEl = document.querySelector("#list-item")
var selectedListEl = document.querySelector("#selected-list")
var savedExercises = document.getElementById("saved-exercises");

// Default exercises - will load more from localStorage if they exist
var exercises = ['Bench Press','Squat','Deadlift','Row','Plank','Push-Up'];

// Workouts - pulled from localStorage if they exist
var workouts = [];

function addWorkout(){
    console.log("add workout to localStorage")
    
    var exerciseItems = document.getElementsByClassName("ex-row");

    for(var a=0;a<exerciseItems.length;a++){
        var date = document.getElementById("ex-date").value;
        var name = exerciseItems[a].childNodes[1].childNodes[0].value;
        var sets = exerciseItems[a].childNodes[2].childNodes[1].value;
        var reps = exerciseItems[a].childNodes[3].childNodes[1].value;
        var weight = exerciseItems[a].childNodes[4].childNodes[1].value;
        
        workouts.push({
            date: date,
            name: name,
            sets: sets,
            reps: reps,
            weight: weight
        });
    }

    // Close Modal
    document.querySelector(".modal").classList.remove('is-active');

    //Clear everything for next workout to be added
    document.getElementById("ex-date").value = "";
    document.getElementById("saved-exercises").selectedIndex = 0;
    document.getElementById("ex-name").value = "";
    document.getElementById("selected-exercises-wrapper").style.visibility = "hidden";

    for(var a=0;a<exerciseItems.length;a++){
        exerciseItems[a].remove();
    }

    localStorage.setItem("workouts", JSON.stringify(workouts));
}

function addExercise(name) {
    var str = "";
    var capitalName = capitalize(name);
    
    // Check for duplicate exercise
    var bigText = document.getElementsByClassName("big-text");
    for(var a=0;a<bigText.length;a++){
        if(bigText[a].value == capitalName){
            alert("Exercise already entered!");
            
            // Reset dropdown and text box
            document.getElementById("saved-exercises").selectedIndex = 0;
            document.getElementById("random-exercises").selectedIndex = 0;
            document.getElementById("ex-name").value = "";

            return;
        }
    }

    document.getElementById("selected-exercises-wrapper").style.visibility = "visible";
    
    str += "<div class='ex-row'>"
    str += "<div class='ex-col'><button class='delete-exercise'>-</button></div>"
    str += "<div class='ex-col'><input type='text' class='big-text' value='" + capitalName + "'></div>";
    str += "<div class='ex-col'>Sets <input type='text' class='small-text' max-length='2'></div>";
    str += "<div class='ex-col'>Reps <input type='text' class='small-text' max-length='3'></div>";
    str += "<div class='ex-col'>Weight <input type='text' class='small-text' max-length='4'></div>";
    str += "</div>";
    
    // Reset dropdown and text box
    document.getElementById("saved-exercises").selectedIndex = 0;
    document.getElementById("random-exercises").selectedIndex = 0;
    document.getElementById("ex-name").value = "";

    selectedExrcEl.innerHTML += str;

    // Add to exercises array if it doesn't exist
    var exists = false;
    for(var a=0;a<exercises.length;a++){
        if(exercises[a] == capitalName){
            exists = true;
        }
    }

    if(!exists){
        exercises.push(capitalName);

        var opt = document.createElement("option");
        opt.text = capitalName;
        savedExercises.add(opt);
    }

    //Add to localStorage
    localStorage.setItem("exercises", JSON.stringify(exercises));

};

// Add workout button
document.getElementById("add-workout").addEventListener("click", function(){
    var exerciseItems = document.getElementsByClassName("ex-row");
    
    if(exerciseItems.length == 0){
        alert("No exercises to add!");
        return;
    }

    var bigText = document.getElementsByClassName("big-text");
    var smallText = document.getElementsByClassName("small-text");

    // Remove red outlines on new submittal
    document.getElementById("ex-date").style.border = "1px solid #CCC";
    
    for(var a=0;a<bigText.length;a++){
        bigText[a].style.border = "1px solid #CCC";
    }

    for(var a=0;a<smallText.length;a++){
        smallText[a].style.border = "1px solid #CCC";
    }

    
    // Check for empty text boxes in exercise info
    var cont = true;
    var enteredDate = document.getElementById("ex-date").value;
    
    if(!isValidDate(enteredDate)){
        cont = false;
        document.getElementById("ex-date").style.border = "1px solid red";
    }

    for(var a=0;a<bigText.length;a++){
        if(bigText[a].value == ""){
            bigText[a].style.border = "1px solid red";
            cont = false;
        }
    }

    for(var a=0;a<smallText.length;a++){
        if(smallText[a].value == ""){
            smallText[a].style.border = "1px solid red";
            cont = false;
        }
    }

    if(cont){
        addWorkout();
    }else{
        alert("Missing or invalid data entered");
    }
    // Check for empty text boxes
});

// Remove exercise from selected exercises area
document.getElementById("selected-exercises").addEventListener("click", function(e){
    if(e.target.className == 'delete-exercise'){
        e.target.parentNode.parentNode.remove();
    }
});

// Add exercise from saved dropdown
document.getElementById("add-saved-exercise").addEventListener("click", function(){
    var savedOptions = document.getElementById("saved-exercises").options;
    var index = document.getElementById("saved-exercises").selectedIndex;
    
    if(index != 0){
        addExercise(savedOptions[index].text);
    }
});

// Add exercise from random dropdown
document.getElementById("add-random-exercise").addEventListener("click", function(){
    var randomOptions = document.getElementById("random-exercises").options;
    var index = document.getElementById("random-exercises").selectedIndex;
    
    if(index != 0){
        addExercise(randomOptions[index].text);
    }
});

// Add exercise from custom entry
document.getElementById("add-custom-exercise").addEventListener("click", function(){
    var value = document.getElementById("ex-name").value;
    if(value != ""){
        addExercise(value);
    }
});

var selectedExercise = function(exerciseDataInput) {
    var selectedList = document.createElement("li");
    var selectedBtn = document.createElement("button");
    selectedBtn.type = "button";
    selectedBtn.name = "selectedBtn";
    selectedBtn.innerText = "-";

    var selectedExerciseList = document.createElement("div");
    selectedExerciseList.innerHTML = "<h2>" + exerciseDataInput.name + "</h2><p>" + 'Sets: ' + exerciseDataInput.sets + "</p><p>" + 'Reps: '+ exerciseDataInput.reps + "</p><p>" + 'Weight:' + exerciseDataInput.weight + "</p>"

    selectedList.append(selectedBtn, selectedExerciseList);

    selectedListEl.appendChild(selectedList);
}

document.addEventListener('DOMContentLoaded', () => {
    // Bring in exercises from localStorage if they exist into local array
    if(localStorage.getItem("exercises") != null){
        var newArr = JSON.parse(localStorage.getItem("exercises"));
        for(var a=0;a<newArr.length;a++){
            exercises[a] = newArr[a];
        }
        console.log(exercises);
    }

    // Load the saved exercise dropdown
    for(var a=0;a<exercises.length;a++){
        var opt = document.createElement("option");
        opt.text = exercises[a];
        savedExercises.add(opt);
    }

    // Bring in workouts if they exist in localStorage
    if(localStorage.getItem("workouts") != null){
        var newArr = JSON.parse(localStorage.getItem("workouts"));
        workouts = newArr;
    }

    getQuote();
    
    displayWorkouts();
    
    // Functions to open and close a modal
    function openModal($el) {
        $el.classList.add('is-active');
        // Load the random exercises dropdown when modal opens
        loadSuggested();
    
    }
  
    function closeModal($el) {
      
      $el.classList.remove('is-active');

      // Reset everything for next workout to be added
      var exerciseItems = document.getElementsByClassName("ex-row");

      document.getElementById("ex-date").value = "";
      document.getElementById("saved-exercises").selectedIndex = 0;
      document.getElementById("random-exercises").selectedIndex = 0;
      document.getElementById("ex-name").value = "";
      document.getElementById("selected-exercises-wrapper").style.visibility = "hidden";

      for(var a=0;a<exerciseItems.length;a++){
          exerciseItems[a].remove();
      }
    }
  
    function closeAllModals() {
      (document.querySelectorAll('.modal') || []).forEach(($modal) => {
        closeModal($modal);
      });

      //Clear everything for next workout to be added
      var exerciseItems = document.getElementsByClassName("ex-row");

      document.getElementById("ex-date").value = "";
      document.getElementById("saved-exercises").selectedIndex = 0;
      document.getElementById("ex-name").value = "";
      document.getElementById("selected-exercises-wrapper").style.visibility = "hidden";

      for(var a=0;a<exerciseItems.length;a++){
          exerciseItems[a].remove();
      }
    }
  
    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);
  
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

// Function to load suggested exercises from API
function loadSuggested(){
    fetch("https://exercisedb.p.rapidapi.com/exercises", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "exercisedb.p.rapidapi.com",
            "x-rapidapi-key": "a1f063120amshc38f4ca1b7188b4p11f7b2jsnb2297cfa28df"
        }
    })
    .then(response => {
        response.json().then(function(data) {
            var randomExercises = document.getElementById("random-exercises");

            // Remove options from random exercise dropdown to load 5 new ones
            if(randomExercises.length > 0){
                for(var a=randomExercises.length;a>0;a--){
                    randomExercises.remove(a);
                }
            }

            var random = 0;
            for(var a=0;a<5;a++){
                random = randomNumber(0,data.length);
                var opt = document.createElement("option");
                opt.text = capitalize(data[random].name);
                randomExercises.add(opt);
                
                // Additional data that is hidden for now
                // capitalize(data[random].name);
                // capitalize(data[random].bodyPart);
                // capitalize(data[random].equipment);
                // capitalize(data[random].target);
                // data[random].gifUrl;
            }
        });
    })
    .catch(err => {
        console.error(err);
    });
}

function displayWorkouts(){
  var prevWorkout = document.getElementById("previous-workout");
  var currentWorkout = document.getElementById("current-workout");
  var nextWorkout = document.getElementById("next-workout");

  if(localStorage.getItem("workouts") != null){
      workouts = JSON.parse(localStorage.getItem("workouts"));
  }

  console.log(workouts);

  if(workouts.length > 0){
      var tempDate = new Date();
      var today = (tempDate.getMonth()+1) + "/" + tempDate.getDate() + "/" + tempDate.getFullYear();

      today = new Date(today);

      var prev = [];
      var curr = [];
      var next = [];

      for(var a=0;a<workouts.length;a++){
          var newDate = new Date(workouts[a].date);
          
          if(newDate.getTime() < today.getTime()){
              prev.push({
                date:workouts[a].date,
                name:workouts[a].name,
                sets:workouts[a].sets,
                reps:workouts[a].reps,
                weight:workouts[a].weight
              });

              
          }else if(newDate.getTime() === today.getTime()){
            curr.push({
              date:workouts[a].date,
              name:workouts[a].name,
              sets:workouts[a].sets,
              reps:workouts[a].reps,
              weight:workouts[a].weight
            });
          }else if(newDate.getTime() > today.getTime()){
            next.push({
              date:workouts[a].date,
              name:workouts[a].name,
              sets:workouts[a].sets,
              reps:workouts[a].reps,
              weight:workouts[a].weight
            });
          }
      }

      console.log(prev);
      console.log(curr);
      console.log(next);

      if(prev.length > 0){
          //Perform date comparisons to find the workout nearest to today (going backward)
      }else{
        prevWorkout.innerHTML = "No previous workouts found";
      }

      if(curr.length > 0){
          // Place workout data into current div
          
          str = "<strong>" + (today.getMonth()+1) + "/" + today.getDate() + "/" + today.getFullYear() + "</strong>";
          for(var a=0;a<curr.length;a++){
            str += "<p>" + curr[a].name + " | Sets: " + curr[a].sets + " | Reps: " + curr[a].reps + " | Weight: " + curr[a].weight + "</p>";
          }
  
          currentWorkout.innerHTML = str;
      }else{
          currentWorkout.innerHTML = "No current workouts found";
      }

      if(next.length > 0){
          nextWorkout.innerHTML = "Future workouts found.."
      }else{
          nextWorkout.innerHTML = "No future workouts found";
      }

  }

  // Date functions

  // Look in workouts object for dates before today
  // If none exist, say no previous workout found

  // Iterate workouts object for todays date
  // If no today, display no current workout

  // Look in workouts object for dates beyond today
  // If none found, say no future workouts found
}


function getQuote(){
    fetch("https://type.fit/api/quotes")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        random = randomNumber(0,data.length);
        document.getElementById("quote-text").textContent = "\"" + data[random].text + "\"";
        if(data[random].author != null){
            document.getElementById("quote-author").textContent = "- " + data[random].author;
        }
    });
}

// Date checking function
function isValidDate(dateString)
{
    // First check for the pattern
    if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
        return false;

    // Parse the date parts to integers
    var parts = dateString.split("/");
    var day = parseInt(parts[1], 10);
    var month = parseInt(parts[0], 10);
    var year = parseInt(parts[2], 10);

    // Check the ranges of month and year
    if(year < 1000 || year > 3000 || month == 0 || month > 12)
        return false;

    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
};

// Function to capitalize the first letter of every word in a string
let capitalize = (str) => {
    let arr = str.split(' ');
    for(let i = 0; i < arr.length; i++ ) {
       arr[i] = arr[i].replace(arr[i].charAt(0),  arr[i].charAt(0).toUpperCase());
   }
   return arr.join(' ');
 }

 // Randon number generator with min and max input
 var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);
  
    return value;
};