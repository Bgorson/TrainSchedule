// JScript
// Initialize Firebase
var trainInfo = [];
var config = {
  apiKey: "AIzaSyBBWhCmujtkg4mwIzjcZGBlpdWlKPo5r9M",
  authDomain: "train-scheduler-1e9ee.firebaseapp.com",
  databaseURL: "https://train-scheduler-1e9ee.firebaseio.com",
  projectId: "train-scheduler-1e9ee",
  storageBucket: "train-scheduler-1e9ee.appspot.com",
  messagingSenderId: "840854154538"
};
firebase.initializeApp(config);
var database = firebase.database();

database.ref().on("child_added", function (snapshot) {
  console.log(snapshot.key)
  var trainFrequency = snapshot.val().frequency;
  console.log(trainFrequency+ "How frequent train comes")
  var startMinutes = parseInt((snapshot.val().firstTrain.slice(0,2)))*60 + (parseInt(snapshot.val().firstTrain.slice(3,5)))
  console.log(startMinutes+ "When in the day by minutes does the train start")
  var now = moment().format("HH:mm")
  var nowMinutes= parseInt((now.slice(0,2)))*60 + (parseInt(now.slice(3,5)))
  console.log(nowMinutes+ "When is the day in minutes is it right now")
  var minutesAway= trainFrequency-((nowMinutes- startMinutes) % trainFrequency) 
  console.log(minutesAway+ "How many minutes until the train comes")
  var nextArrivalHours = (Math.floor((nowMinutes + minutesAway)/60)).toFixed(0)
  console.log(nextArrivalHours+ "How many hours in the day will it be here")
  var nextArrivalMinutes = ((nowMinutes+minutesAway)%60)
  if ((parseInt(nextArrivalMinutes)) <10){
    nextArrivalMinutes ='0'+ nextArrivalMinutes
  }

  var nextArrival= (nextArrivalHours+":"+nextArrivalMinutes)
  var closeButton = $("<button type='button' class='close' aria-label='Close'><span aria-hidden='true'>&times;</span></button>")
  var newRow = $("<tr value=" + snapshot.key + ">")
  var newName = $("<td>" + snapshot.val().name + "</td>")
  var newDestination = $("<td>" + snapshot.val().destination + "</td>")
  var newTime = $("<td>" + nextArrival + "</td>")
  var newNext = $("<td>" + trainFrequency + "</td>")
  var newMins = $("<td>" + minutesAway + "</td>")
  $(newRow).append(newName,newDestination,newNext,newTime,newMins,closeButton)
  $("tbody").append(newRow)
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});


$("#submit").on("click", function (event) {
  event.preventDefault();
  // Get the input values
  var newTrainInfo = {
    name: $("#trainNameForm").val().trim(),
    destination: $("#destinationForm").val().trim(),
    firstTrain: $("#firstTrainForm").val().trim(),
    frequency: $("#frequencyForm").val().trim()
  }
  trainInfo.push(newTrainInfo)
  console.log(trainInfo);
  database.ref().push(newTrainInfo);
})
function removeItem(item) {
  // Now we can get back to that item we just pushed via .child().
  item.remove(function() {
   
  });
}
//deleting data
$(document).on("click", ".close", function(e){
  var key = $(this).parent().attr('value');
  console.log(key)
  $("[value="+key+ "]").remove()
  database.ref().child(key).remove();

  })
  
  database.ref().on("value", function (snapshot) {
    console.log(snapshot.val().name)
  })
    
    
