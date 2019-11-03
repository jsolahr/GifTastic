
//Initial Array of Feelings
var feelings = ["Annoyed", "Happy", "Excited", "Bored", "Curious", "Hungry",];

//Function for dumping the JSON content for each button into the div
function displayEmotion() {
  $("#gifs-appear-here").empty();

  var feelings = $(this).attr("data-name");
  console.log(feelings);
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    feelings + "&api_key=Wc3mwMWG7RWvkB3BW8I0QDXcB2cz5fQT&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    var results = response.data;
    for (var i = 0; i < results.length; i++) {
      var emotionDiv = $("<div>");
      emotionDiv.attr("class", "align");
      var emotionImage = $("<img>");
      emotionImage.attr("src", results[i].images.fixed_height_still.url);
      emotionImage.attr("data-still", results[i].images.fixed_height_still.url);
      emotionImage.attr("data-animate", results[i].images.fixed_height.url);
      emotionImage.attr("data-state", "still");
      emotionImage.attr("class", "gif");
      emotionDiv.append(emotionImage);
      $("#gifs-appear-here").prepend(emotionDiv);
    }

    $(".gif").on("click", function () {
      var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
  });
}
// Function for displaying emotion data
function renderButtons() {

  // Deleting the buttons prior to adding new feelings
  $("#buttons-view").empty();
  // Looping through the array of feelings
  for (var i = 0; i < feelings.length; i++) {
    // Then dynamically generating buttons for each emotion in the array
    var a = $("<button>");
    // Adding a class of emotion to our button
    a.addClass("btn btn-light");
    // Adding a data-attribute
    a.attr("data-name", feelings[i]);
    // Providing the initial button text
    a.text(feelings[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}
// This function handles events where one button is clicked
$("#add-emotion").on("click", function (event) {

  event.preventDefault();

  // This line grabs the input from the textbox
  var emotion = $("#emotion-input").val().trim();
  $("#emotion-input").val("")

  // Adding the emotion from the textbox to our array

  if (emotion === '') {
    alert("Please type in a emotion!")
  }
  else {
    feelings.push(emotion);
    renderButtons();

  }

  //$("#emotion-input").val("");
  // Calling renderButtons which handles the processing of our emotion array
});
// Function for displaying the emotion info
// Using $(document).on instead of $(".emotion").on to add event listeners to dynamically generated elements
$(document).on("click", "button", displayEmotion)

// Calling the renderButtons function to display the initial buttons
renderButtons();