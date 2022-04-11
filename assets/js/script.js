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

// run script after DOM loads
$(function() {
    // city search history
    var history = []

    // format moment.js
    var now = moment().format("MM-DD-YYYY");
    var currentTime = moment().hour();
    var currentDay = moment().day();
    $("#currentDate").html(now);
    
    // display day of the week
    if (currentDay == 0) {
        $("#currentWeekDay").html("Sunday");
        $("#day1Btn").html("Monday");
        $("#day2Btn").html("Tuesday");
        $("#day3Btn").html("Wednesday");
        $("#day4Btn").html("Thursday");
        $("#day5Btn").html("Friday");
    } else if (currentDay == 1) {
        $("#currentWeekDay").html("Monday");
        $("#day1Btn").html("Tuesday");
        $("#day2Btn").html("Wednesday");
        $("#day3Btn").html("Thursday");
        $("#day4Btn").html("Friday");
        $("#day5Btn").html("Saturday");
    } else if (currentDay == 2) {
        $("#currentWeekDay").html("Tuesday");
        $("#day1Btn").html("Wednesday");
        $("#day2Btn").html("Thursday");
        $("#day3Btn").html("Friday");
        $("#day4Btn").html("Saturday");
        $("#day5Btn").html("Sunday");
    } else if (currentDay == 3) {
        $("#currentWeekDay").html("Wednesday");
        $("#day1Btn").html("Thursday");
        $("#day2Btn").html("Friday");
        $("#day3Btn").html("Saturday");
        $("#day4Btn").html("Sunday");
        $("#day5Btn").html("Monday");
    } else if (currentDay == 4) {
        $("#currentWeekDay").html("Thursday");
        $("#day1Btn").html("Friday");
        $("#day2Btn").html("Saturday");
        $("#day3Btn").html("Sunday");
        $("#day4Btn").html("Monday");
        $("#day5Btn").html("Tuesday");
    } else if (currentDay == 5) {
        $("#currentWeekDay").html("Friday");
        $("#day1Btn").html("Saturday");
        $("#day2Btn").html("Sunday");
        $("#day3Btn").html("Monday");
        $("#day4Btn").html("Tuesday");
        $("#day5Btn").html("Wednesday");
    } else if (currentDay == 6) {
        $("#currentWeekDay").html("Saturday");
        $("#day1Btn").html("Sunday");
        $("#day2Btn").html("Monday");
        $("#day3Btn").html("Tuesday");
        $("#day4Btn").html("Wednesday");
        $("#day5Btn").html("Thursday");
    }

    // get city name from search input
    $("#searchBtn").on("click", function () {
        // Get the value of the search input box
        const city = $("#form1").val();
        console.log(`City => ${city}`);
        
        // display city name in html
        $("#jumbotronCity").html(city);

        // fetch current weather api to get coordinates
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

            // fetch onecall api to get weather data
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
                // add searched cities to history array
               history.push(city);

               // populate city search history
                var history1 = history[history.length - 1];
                var history2 = history[history.length - 2];
                var history3 = history[history.length - 3];
                var history4 = history[history.length - 4];
                var history5 = history[history.length - 5];

                // insert searched cities into HTML
                $("#searchCity1").html(history1);
                $("#searchCity2").html(history2);
                $("#searchCity3").html(history3);
                $("#searchCity4").html(history4);
                $("#searchCity5").html(history5);

                // display city information from search history on click

                // UV index color codes
                if (response.current.uvi < 2) {
                    $("#uvContent").addClass("favorableUV");
                } else if (response.current.uvi > 2 && response.current.uvi < 5) {
                    $("#uvContent").addClass("moderateUV");
                } else {
                    $("#uvContent").addClass("severeUV");
                }

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

                // current day + 2 forecast
                var cityTemp2 = response.daily[1].temp.day;
                var cityConditions2 = response.daily[1].weather[0].main;
                var cityHum2 = response.daily[1].humidity;
                var cityWind2 = response.daily[1].wind_speed;
                var cityUV2 = response.daily[1].uvi;
                $("#tempDay2").html(cityTemp2);
                $("#condDay2").html(cityConditions2);
                $("#humDay2").html(cityHum2);
                $("#windDay2").html(cityWind2);
                $("#uvDay2").html(cityUV2);
                
                // current day + 3 forecast
                var cityTemp3 = response.daily[2].temp.day;
                var cityConditions3 = response.daily[2].weather[0].main;
                var cityHum3 = response.daily[2].humidity;
                var cityWind3 = response.daily[2].wind_speed;
                var cityUV3 = response.daily[2].uvi;
                $("#tempDay3").html(cityTemp3);
                $("#condDay3").html(cityConditions3);
                $("#humDay3").html(cityHum3);
                $("#windDay3").html(cityWind3);
                $("#uvDay3").html(cityUV3);

                // current day + 4 forecast
                var cityTemp4 = response.daily[3].temp.day;
                var cityConditions4 = response.daily[3].weather[0].main;
                var cityHum4 = response.daily[3].humidity;
                var cityWind4 = response.daily[3].wind_speed;
                var cityUV4 = response.daily[3].uvi;
                $("#tempDay4").html(cityTemp4);
                $("#condDay4").html(cityConditions4);
                $("#humDay4").html(cityHum4);
                $("#windDay4").html(cityWind4);
                $("#uvDay4").html(cityUV4);

                // current day + 5 forecast
                var cityTemp5 = response.daily[4].temp.day;
                var cityConditions5 = response.daily[4].weather[0].main;
                var cityHum5 = response.daily[4].humidity;
                var cityWind5 = response.daily[4].wind_speed;
                var cityUV5 = response.daily[4].uvi;
                $("#tempDay5").html(cityTemp5);
                $("#condDay5").html(cityConditions5);
                $("#humDay5").html(cityHum5);
                $("#windDay5").html(cityWind5);
                $("#uvDay5").html(cityUV5);
            });

        })

    })
})

