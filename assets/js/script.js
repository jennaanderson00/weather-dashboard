/* CRITERIA
display current and future weather conditions
    city name
    date
    weather conditions
    temperature
    humidity
    wind speed
    uv index
cities are searchable
searched cities are added to search history and can be chosen from there
uv index color codes conditions 
    favorable
    moderate
    severe
future conditions include a 5-day forecast with aforementioned information
*/

// Keeps track of city names that were searched for
var history = []

// run script after DOM loads
$(function() {
    // ===================================================== Populate City History 
    // TODO using jQuery populate list of cities in DOM using the history array
    

    // ===================================================== Get City Name
    $("#searchBtn").on("click", function () {
        // Get the value of the search input box
        const city = $("#form1").val();
        console.log(`City => ${city}`);

        // ===================================================== Get Coordinates 
        var lat = '';
        var lon = '';
        var getCoordsUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1324309e66ef2185354950fa5e92e01d`;
        $.ajax({
            "url": getCoordsUrl,
            "method": "GET",
        }).then(function (response) {
            console.log(`Response ==> ${JSON.stringify(response)}`);
            lat = response.coord.lat;
            lon = response.coord.lon;
            console.log(`Coordinates Lat ==> ${lat}`);
            console.log(`Coordinates Lon ==> ${lon}`);

            // ===================================================== Get Weather Data
            // format moment.js
            var now = moment().format("MM-DD-YYYY");
            var currentTime = moment().hour();
            // open weather map fetch
            var openWeather = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=1324309e66ef2185354950fa5e92e01d&units=imperial`;
            const settings = {
                "async": true,
                "crossDomain": true,
                "url": openWeather,
                "method": "GET",
            };
            
            $.ajax(settings).done(function (response) {
                console.log(response);
            });

            $.ajax({
                "url": openWeather,
                "method": "GET",
            }).then(function (response) {
                // TODO Push city name into history array

                // current weather
                var cityTemp = response.current.temp;
                var cityConditions = response.current.weather[0].description;
                var cityHum = response.current.humidity;
                var cityWind = response.current.wind_speed;
                var cityUV = response.current.uvi;
                $("#tempContent").html(cityTemp);
                $("#tempConditions").html(cityConditions);
                $("#windContent").html(cityWind);
                $("#humidityContent").html(cityHum);
                $("#uvContent").html(cityUV);
                // tomorrows forecast
                // for loop here?
                var cityTemp1 = response.daily[0].temp.day;
                var cityConditions1 = response.daily[0].weather[0].main;
                var cityHum1 = response.daily[0].humidity;
                var cityWind1 = response.daily[0].wind_speed;
                var cityUV1 = response.daily[0].uvi;
                $("#tempDay1").html(cityTemp1);
                $("#condDay1").html(cityConditions1);
                $("#humDay1").html(cityHum1);
                $("#windDay1").html(cityWind1);
                $("#uvDay1").html(cityUV1);
            });

        })

    })

    

    

})

//https://community-open-weather-map.p.rapidapi.com/weather?q=London%2Cuk&lat=0&lon=0