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
    var openWeather = "https://community-open-weather-map.p.rapidapi.com/weather?q=London%2Cuk&lat=0&lon=0&callback=test&id=2172797&lang=null&units=imperial&mode=xml";
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": openWeather,
        "method": "GET",
        "headers": {
            "X-RapidAPI-Host": "community-open-weather-map.p.rapidapi.com",
            "X-RapidAPI-Key": "a00a496f1bmsh126580ae57458fcp1e35c7jsnb70d8a845e98"
        }
    };
    
    $.ajax(settings).done(function (response) {
        console.log(response);
    });
})