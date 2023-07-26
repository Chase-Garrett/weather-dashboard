// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
    // add openweather api key
    var key = "";

    // displayWeather function
    function displayWeather(response) {
        // get city name
        var city = response.name;
        // get current date using day.js
        var date = dayjs().format("MM/DD/YYYY");
        // get weather icon
        var icon = response.weather[0].icon;
        // get weather icon url
        var iconUrl = "https://openweathermap.org/img/w/" + icon + ".png";
        // get temperature
        var temp = response.main.temp;
        // get humidity
        var humidity = response.main.humidity;
        // get wind speed
        var windSpeed = response.wind.speed;
        // display city name and date
        $("#city-name").text(city + " (" + date + ")");
        // create img element for weather icon
        $("<img>").attr("id", "weather-icon");
        // display weather icon
        $("#weather-icon").attr("src", iconUrl);
        // display temperature
        $("#temperature").text("Temperature: " + temp + " °F");
        // display humidity
        $("#humidity").text("Humidity: " + humidity + "%");
        // display wind speed
        $("#wind-speed").text("Wind Speed: " + windSpeed + " MPH");
        // append weather icon to city name
        $("#city-name").append($("#weather-icon"));
    }

    // getWeather function
    function getWeather(city) {
        // call openweather api
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key + "&units=imperial",
            method: "GET"
        }).then(function (response) {
            console.log(response);
            // call displayWeather function
            displayWeather(response);
        });
    }


    // add event listener to search button
    $("#search-btn").on("click", function () {
        // get user input
        var city = $("#search-input").val();
        // clear search input
        $("#search-input").val("");
        // call getWeather function
        getWeather(city);
    });
});