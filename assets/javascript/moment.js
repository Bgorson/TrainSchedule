// JScript
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBBWhCmujtkg4mwIzjcZGBlpdWlKPo5r9M",
    authDomain: "train-scheduler-1e9ee.firebaseapp.com",
    databaseURL: "https://train-scheduler-1e9ee.firebaseio.com",
    projectId: "train-scheduler-1e9ee",
    storageBucket: "train-scheduler-1e9ee.appspot.com",
    messagingSenderId: "840854154538"
  };
  firebase.initializeApp(config);
  var database= firebase.database();
  var trainInfo= [];
  database.ref().on("value", function(snapshot) { 
    trainInfo = snapshot.val().trainInfo;
      for(i=0;i< snapshot.val().trainInfo.length;i++){  
    console.log(snapshot.val())
    var trainName = snapshot.val().trainInfo[i].name;
    var trainDestination= snapshot.val().trainInfo[i].destination;
    var trainFirst = snapshot.val().trainInfo[i].firstTrain;
    var trainFrequency = snapshot.val().trainInfo[i].frequency;
    console.log(trainDestination)
    console.log(trainName)
    var newRow= $("<tr>")
    var newName= $("<td>" + trainName + "</td>" )
    var newDestination= $("<td>" + trainDestination + "</td>")
    var newTime= $("<td>" + trainFirst + "</td>")
    var newNext= $("<td>" + trainFrequency + "</td>")
    var newMins= $("<td>" + trainFrequency + "</td>")
    $(newRow).append(newName)
    $(newRow).append(newDestination)
    $(newRow).append(newNext)
    $(newRow).append(newTime)
    $(newRow).append(newMins)
    $("tbody").append(newRow)
        }},function(errorObject) {
            console.log("The read failed: " + errorObject.code);
          });



$("#submit").on("click", function(event) {
  $("tbody").html('');
            event.preventDefault();
            // Get the input values
            var newTrainInfo= {
                name: $("#trainNameForm").val().trim(),
                destination: $("#destinationForm").val().trim() ,
                firstTrain:$("#firstTrainForm").val().trim() ,
                frequency: $("#frequencyForm").val().trim()
            }
            trainInfo.push(newTrainInfo)
            console.log(trainInfo);
          
        
              database.ref().set({
                trainInfo: trainInfo,
              });
            })