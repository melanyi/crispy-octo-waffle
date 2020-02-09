import React from "react"

import Layout from "../components/layout"
import "./city-list.css"
import weatherBackground from "../images/weather-background.jpg"

const WeatherPage = () => {
  React.useEffect(() => {
    var acc = document.getElementsByClassName("accordion");
    var i;
    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
          panel.style.display = "none";
        } else {
          panel.style.display = "block";
        }
      });
    }

    var cityName = ["Vancouver", "Burnaby", "Surrey", "Langley", "Abbotsford", "Chilliwack", "Hope", "Kamloops", "Banff"];
    var j;
    var body = document.getElementsByTagName('body')[0];

    var key = "77b9bd2bc907dd5839c897abfe8ebd3e";
    var i;
    var cityTemp = [];
    for (i = 0; i < cityName.length; i++) {
      const link = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName[i] + "&units=metric&apikey=" + key;
      var request = new XMLHttpRequest();
      request.open('GET', link, true);
      request.onload = function () {
        var obj = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {
          var temp = obj.main.temp;
          cityTemp.push(temp);
        }
        else {
          console.log("The city doesn't exist! Kindly check");
        }
      }
    }

    for (j = 0; j < cityName.length; j++) {
      var button = document.createElement('button');
      button.className = 'accordion'
      button.innerHTML = cityName[j];
      body.appendChild(button);
      var h = document.createElement("H1")
      var info = document.createTextNode(cityTemp[j]);
    }

    request.send();

    return () => {
      document.querySelectorAll("button.accordion").forEach(button => button.remove())
    }
  }, [])

  return (
    <Layout>
      <div class="title">
        <div class="navbar">
          <a class="active" href="/"><i class="fa fa-fw fa-home"></i> Home</a>
        </div>
        <img src={weatherBackground} width="100%" height="70%" />
      </div>
      <div class="words"><h2>Weather <br /> &emsp; Forecast</h2>
      </div>
      <div class="panel">
        <p>temp</p>
      </div>
    </Layout>
  )
}

export default WeatherPage