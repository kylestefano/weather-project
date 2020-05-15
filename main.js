var weather = []
forecast = []

// getting temp, city name, and current conditions based on location in api
var addCityWeather = function (data) {
  // clearing weather div
  $('#weather').empty()
  var weatherSearched = {
    // rounding temp to whole number
    temperature: Math.round(data.main.temp),
    city: data.name,
    conditions: data.weather[0].main
  }
  // setting weather array equal to weatherSearched data
  weather = weatherSearched
}
// taking data and using the handlebars template to display the data on the page
var renderWeather = function () {

  var source = $('#current-weather-template').html();
  var template = Handlebars.compile(source);
  var weatherHTML = template(weather)

  $('#weather').append(weatherHTML)
};



//retreiving data from openweather api with given input in the search box
var fetchData = function (citySelected) {
  $.ajax({
    method: "GET",
    url: "http://api.openweathermap.org/data/2.5/weather?q=" + citySelected + "&units=imperial&appid=4645922fe189303f0fecf37e1c8e16d3",
    dataType: "json",
    success: function(data) {
      addCityWeather(data)
      renderWeather();
  },
    error: function(jqXHR, textStatus, errorThrown) {
    console.log(textStatus);
  }
  })

  $.ajax({
    method: "GET",
    url: "http://api.openweathermap.org/data/2.5/forecast?q=Raleigh&units=imperial&appid=4645922fe189303f0fecf37e1c8e16d3",
    dataType: "json",
    success: function(data) {
      addCityWeather(data)
      renderWeather();
  },
    error: function(jqXHR, textStatus, errorThrown) {
    console.log(textStatus);
  }
  })
}
// invoking a click function on the search button that invokes the fetchData function with the input on the search box
$('#search').on('click', function () {
  var citySelected = $('#city-input').val()

  fetchData(citySelected)
})