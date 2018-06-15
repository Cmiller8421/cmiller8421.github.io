// Initialize Firebase
// Make sure to match the configuration to the script version number in the HTML
// (Ex. 3.0 != 3.7.0)
var config = {
  apiKey: "AIzaSyA1Sx0TbIXSB7FIVfXPCsA-hUCUyHyKfiw",
  authDomain: "cmiller8421-1.firebaseapp.com",
  databaseURL: "https://cmiller8421-1.firebaseio.com",
  projectId: "cmiller8421-1",
  storageBucket: "",
  messagingSenderId: "175996070428"
};

  firebase.initializeApp(config);


// Assign the reference to the database to a variable named 'database'
// var database = ...
var database = firebase.database();

// Initial Values
var initialBid = 0;
var initialBidder = "No one :-(";
var highPrice = initialBid;
var highBidder = initialBidder;

// --------------------------------------------------------------

// At the initial load and subsequent value changes, get a snapshot of the stored data.
// This function allows you to update your page in real-time when the firebase database changes.
database.ref().on("value", function(snapshot) {

  // If Firebase has a highPrice and highBidder stored (first case)
  if (snapshot.child("highBidder").exists() && snapshot.child("highPrice").exists()) {

    // Set the variables for highBidder/highPrice equal to the stored values in firebase.
    
    highPrice = parseInt(snapshot.val().highPrice);
    highBidder = snapshot.val().highBidder;


    // Change the HTML to reflect the stored values

    $("#highest-bidder").html(snapshot.val().highBidder);
    $("#highest-price").html("$"+snapshot.val().highPrice);

    console.log(snapshot.val().highBidder);
    console.log(snapshot.val().highPrice);
    // Print the data to the console.


  }

  // Else Firebase doesn't have a highPrice/highBidder, so use the initial local values.
  else {

    // Change the HTML to reflect the initial invalues
    $("#highest-bidder").html(highbidder);
    $("#highest-price").html("$"+highPrice);

    // Print the data to the console.
    console.log("current high price",highbidder, highPrice);

  }


// If any errors are experienced, log them to console.
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});

// --------------------------------------------------------------

// Whenever a user clicks the submit-bid button
$("#submit-bid").on("click", function(event) {
  // Prevent form from submitting
  event.preventDefault();

  // Get the input values
  var bidderName = $("#bidder-name").val().trim();
  var bidderPrice = parseInt($("#bidder-price").val().trim());


  // Log the Bidder and Price (Even if not the highest)
  console.log(bidderName, bidderPrice);

  if (bidderPrice > highPrice) {


    // Alert
    alert("You are now the highest bidder.");

    // Save the new price in Firebase
    database.ref().set({
      highBidder: bidderName,
      highPrice: bidderPrice,
    });

    // Log the new High Price

    console.log("New High Price!",bidderName,bidderPrice);

    // Store the new high price and bidder name as a local variable
    highPrice=parseInt(bidderPrice);
    highBidder=bidderName;

    // Change the HTML to reflect the new high price and bidder
    $("#highest-bidder").html(bidderName);
    $("#highest-price").html("$"+bidderPrice);

  }

  else {
    // Alert
    alert("Sorry that bid is too low. Try again.");
  }

});
