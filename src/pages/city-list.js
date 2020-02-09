import React from "react"

import Layout from "../components/layout"

import "./city-list.css"
import axios from "axios"
import weatherBackground from "../images/weather-background.jpg"

const IndexPage = () => {

  var place = ["Vancouver", "Burnaby", "Surrey", "Langley", "Abbotsford", "Chilliwack", "Hope", "Kamloops", "Banff"];
  const [arr, setArr] = React.useState([])
  const weatherApiKey = "d9f7da9062592df9c2dea640b3f25f27";
  const mapsApiKey = "AIzaSyBXk6lGDtJyh1GIfe71spYt9vvKe0bnwbw";
  React.useEffect(() => {
    place.map(city => {
      const start = axios(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},BC,CA&appid=${weatherApiKey}`
      )
        .then(response => response.data)
        .then(data => {
          var temp = Math.round((data.main.temp - 273.15));
          console.log(temp);
          setArr(prev => [...prev, { temp: temp, icon: data.weather[0].icon, name: data.name }])

        })
    })
  }, [])

  console.log("len", arr.length);
  return (
    <Layout>
    <div class="title">
      <img src={weatherBackground} alt="Beautiful road with sunshine" width="100%" height="70%" />
    </div>
    <div class="words"><h2>Weather <br /> &emsp; Forecast</h2>
    </div>
  
    <table>
      {arr.map(data => (
        <tr>
          <img src={`http://openweathermap.org/img/wn/${data.icon}@2x.png`} />
          <div class="weather-info">
            <p class="weather-num">{data.temp}&#8451;</p>
            <p class="city-name"> {data.name}</p>
          </div>
        </tr>
      ))}
    </table>
 
    </Layout>
 )
}

export default IndexPage