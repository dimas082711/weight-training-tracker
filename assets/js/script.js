var currentWorkout = document.getElementById("current-workout");

if(localStorage.getItem("workouts") != null){
    workouts = JSON.parse(localStorage.getItem("workouts"));
}

console.log(workouts);

if(workouts.length > 0){
    var tempDate = new Date();
    var today = (tempDate.getMonth()+1) + "/" + tempDate.getDate() + "/" + tempDate.getFullYear();

    today = new Date(today);

    var prev = false;
    var curr = false;
    var next = false;

    for(var a=0;a<workouts.length;a++){
        var newDate = new Date(workouts[a].date);
        
        if(newDate.getTime() < today.getTime()){
            prev = true;
        }else if(newDate.getTime() === today.getTime()){
            curr = true;
        }else if(newDate.getTime() > today.getTime()){
            next = true;
        }
    }

    if(prev){
        //Perform date comparisons to find the workout nearest to today (going backward)
    }else{
        // Text that says no previous workouts
    }

    if(curr){
        // Place workout data into current div
        var str = "";
        str = "<strong>" + (today.getMonth()+1) + "/" + today.getDate() + "/" + today.getFullYear() + "</strong>";
        for(var a=0;a<workouts.length;a++){
            var newDate = new Date(workouts[a].date);
            if(newDate.getTime() === today.getTime()){
                str += "<p>" + workouts[a].name + " | Sets: " + workouts[a].sets + " | Reps: " + workouts[a].reps + " | Weight: " + workouts[a].weight + "</p>";
                
            }
        }
        currentWorkout.innerHTML = str;
    }else{
        currentWorkout.innerHTML = "No current workouts found";
    }

    if(next){
        //Perform date comparison for next available date
    }else{
        // Say no future workouts found
    }

}

// Date functions

// Look in workouts object for dates before today
// If none exist, say no previous workout found

// Iterate workouts object for todays date
// If no today, display no current workout

// Look in workouts object for dates beyond today
// If none found, say no future workouts found



