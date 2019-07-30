
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDiewGvEvrxHNHhKbi_pGpCEmspnklsUvk",
    authDomain: "timesheet-538a5.firebaseapp.com",
    databaseURL: "https://timesheet-538a5.firebaseio.com",
    projectId: "timesheet-538a5",
    storageBucket: "",
    messagingSenderId: "594612513120",
    appId: "1:594612513120:web:d2fec7820f0990e7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  console.log(firebase);
  var database = firebase.database();
	
  $("#addTrain").on("click", function(event) {
	//stop the refresh
	event.preventDefault();
	//save input
	var nameT = $("#tname-input").val().trim();
	var numline = $("#line-input").val().trim();
	var destination = $("#destination-input").val().trim();
	var Ttime = moment($("#trainTime-input").val().trim(), "HH:mm").subtract(10, "years").format("X");
	var frequency = $("#frequency-input").val().trim();
	 
	var trainInfo = {
	 NameTrain: nameT,
	 Line: numline,
	 Destination: destination,
	 Time: Ttime,
	 Frequency: frequency,
	};
	
	database.ref().push(trainInfo);

	console.log(trainInfo.NameTrain);
	console.log(trainInfo.Line);
	console.log(trainInfo.Destination);
	console.log(trainInfo.Time);
	console.log(trainInfo.Frequency);
	//clear the text-boxes
	$("#tname-input").val("");
	$("#line-input").val("");
	$("#destination-input").val("");
	$("#trainTime-input").val("");
	$("#frequency-input").val("");
	return false;

});

database.ref().on("child_added", function(childSnapshot) {

	console.log(childSnapshot.val());

	// assign firebase variables to snapshots.
	var firebaseName = childSnapshot.val().NameTrain;
	var firebaseLine = childSnapshot.val().Line;
	var firebaseDestination = childSnapshot.val().Destination;
	var firebaseTrainTimeInput = childSnapshot.val().Time;
	var firebaseFrequency = childSnapshot.val().Frequency;
	
	var diffTime = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes");
	var timeRemainder = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes") % firebaseFrequency ;
	var minutes = firebaseFrequency - timeRemainder;

	var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A"); 
	
	// Test for correct times and info
	console.log(minutes);
	console.log(nextTrainArrival);
	console.log(moment().format("hh:mm A"));
	console.log(nextTrainArrival);
	console.log(moment().format("X"));

	// Append train info to table on page
	$("#trainTable > tbody").append("<tr><td>" + firebaseName + "</td><td>" + firebaseLine + "</td><td>"+ firebaseDestination + "</td><td>" + firebaseFrequency + " mins" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");

});

  