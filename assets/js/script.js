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
    // open weather map fetch
    var openWeather = "https://api.openweathermap.org/data/2.5/onecall?lat=44.97&lon=-92.75&appid=1324309e66ef2185354950fa5e92e01d&units=imperial";
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