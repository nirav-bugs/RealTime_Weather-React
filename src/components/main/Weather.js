import React, { useEffect, useState } from 'react'
import "./style.css"
import Weathercard from './Weathercard'
const Weather = () => {
  const key = process.env.REACT_APP_API_KEY
  const [search, setSearch] = useState("anand");
  const [tempInfo, settempInfo] = useState({});
  const getweather = async () => {

    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${key}`
      const res = await fetch(url);
      const data = await res.json();
      // below are in array of main  :trick to get data from array and then in the object
      const { temp, humidity, pressure } = data.main;

      // in below the main is data in json bt its name is changed to weathermood 
      const { main: weathermood } = data.weather[0]
      const { name } = data;
      const { speed } = data.wind
      const { country, sunset } = data.sys

      const newMyData = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      }
      settempInfo(newMyData)
      console.log(temp)
    } catch (error) {
      console.log(error)
    }
  }
  // useEffect things to run when user just enter page or refresh :[]
  useEffect(() => {
    getweather();
  }, [])
  return (
    <>
      <div className="wrap">
        <div className="search">
          <input type="text" placeholder='search..' autoFocus id='search' className='searchTerm' value={search} onChange={(e) => { setSearch(e.target.value) }} />
          <button className='searchButton' type='button' onClick={getweather}>search</button>
        </div>
      </div>


      <Weathercard tempInfo={tempInfo} />

    </>
  )
}

export default Weather