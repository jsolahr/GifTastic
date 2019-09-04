
  // Initial array of colors
  var colors = ["Yellow", "Green", "Blue","Purple", "Orange", "Red",];

  // Function for dumping the JSON content for each button into the div
  function displayColor() {

    var colors = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    colors + "&api_key=Wc3mwMWG7RWvkB3BW8I0QDXcB2cz5fQT&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
       
      var results = response.data;
    
        for (var i = 0; i < results.length; i++) {
            var colorDiv = $("<div>");
              colorDiv.attr("class","align");
            var p = $("<p>").text("Rating: " + results[i].rating);
            var colorImage = $("<img>");
              colorImage.attr("src",results[i].images.fixed_height_still.url);
              colorImage.attr("data-still",results[i].images.fixed_height_still.url);
              colorImage.attr("data-animate",results[i].images.fixed_height.url);
              colorImage.attr("data-state","still");
              colorImage.attr("class","gif");

              colorDiv.append(p);
              colorDiv.append(colorImage);
            $("#gifs-appear-here").prepend(colorDiv);
         }
        $(".gif").on("click", function() {
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
  // Function for displaying color data
  function renderButtons() {
    // Deleting the buttons prior to adding new colors
    $("#buttons-view").empty();
    // Looping through the array of colors
    for (var i = 0; i < colors.length; i++) {
      // Then dynamically generating buttons for each color in the array
      var a = $("<button>");
      // Adding a class of color to our button
      a.addClass("btn btn-light");
      // Adding a data-attribute
      a.attr("data-name", colors[i]);
      // Providing the initial button text
      a.text(colors[i]);
      // Adding the button to the buttons-view div
      $("#buttons-view").append(a);
      
    }
  }
  // This function handles events where one button is clicked
  $("#add-color").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var color = $("#color-input").val().trim();
    // Adding the color from the textbox to our array
    colors.push(color);
    // Calling renderButtons which handles the processing of our color array
    renderButtons();
  });
  // Function for displaying the color info
  // Using $(document).on instead of $(".color").on to add event listeners to dynamically generated elements
  $(document).on("click", "button", displayColor)


  // Calling the renderButtons function to display the initial buttons
  renderButtons();