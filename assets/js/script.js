// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
    // add openweather api key
    var key = "333d2f1012be3d011cc0b4794245857e";

    // displayWeather function
    function displayWeather(response) {
        // get current weather data
        var current = response.list[0];
        // get current weather icon
        var icon = current.weather[0].icon;
        // get current weather icon url
        var iconUrl = "https://openweathermap.org/img/w/" + icon + ".png";
        // get current weather date using dayjs
        var date = dayjs().format("M/D/YYYY");
        // get current weather city
        var city = response.city.name;
        // get current weather temperature
        var temp = current.main.temp;
        // get current weather humidity
        var humidity = current.main.humidity;
        // get current weather wind speed
        var wind = current.wind.speed;
        // display city, date, and icon
        $("#city-name").text(city + " " + date + " ");
        $("#city-name").append("<img src='" + iconUrl + "'>");
        // display temperature
        $("#temp").text("Temperature: " + temp + " °F");
        // display humidity
        $("#humidity").text("Humidity: " + humidity + "%");
        // display wind speed
        $("#wind-speed").text("Wind Speed: " + wind + " MPH");

        // update five day forecast
        // get forecast array
        var forecast = response.list;
        // set day counter
        var j = 1;
        // loop through forecast array
        for (var i = 0; i < forecast.length; i+=8) {
            // get forecast date for each day using dayjs
            var forecastDate = dayjs().add(j, "day").format("M/D/YYYY");
            // get forecast icon
            var forecastIcon = forecast[i].weather[0].icon;
            // get forecast icon url
            var forecastIconUrl = "https://openweathermap.org/img/w/" + forecastIcon + ".png";
            // get forecast temperature
            var forecastTemp = forecast[i].main.temp;
            // get forecast humidity
            var forecastHumidity = forecast[i].main.humidity;
            // get forecast wind speed
            var forecastWind = forecast[i].wind.speed;
            // display forecast date
            $("#day" + j).text(forecastDate);
            // display forecast icon
            $("#day" + j).append("<img src='" + forecastIconUrl + "'>");
            // display forecast temperature
            $("#temp" + j).text("Temp: " + forecastTemp + " °F");
            // display forecast humidity
            $("#humidity" + j).text("Humidity: " + forecastHumidity + "%");
            // display forecast wind speed
            $("#wind" + j).text("Wind Speed: " + forecastWind + " MPH");
            // increment day counter
            j++;
        }
    }

    // getWeather function
    function getWeather(city) {
        // call openweather api
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + key + "&units=imperial",
            method: "GET"
        }).then(function (response) {
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
        // add city to search history
        $("#search-history").append("<li>" + city + "</li>");
        // call getWeather function
        getWeather(city);
    });
});