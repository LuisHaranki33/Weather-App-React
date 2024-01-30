import { useState } from "react"

export const WeatherApp = () => {

    const urlBase ='https://api.openweathermap.org/data/2.5/weather'
    const API_KEY = 'e887212b392f8872e39692c140ac1fbc'
   const difKelvin = 273.15
   
    const [ciudad, setciudad] = useState('')
    const [dataClima, setdataClima] = useState(null)
    
    const handleCambioCiudad =(event)=>{
        setciudad(event.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(ciudad.length > 0) fetchClima()       
    }

    const fetchClima = async () => {

        try{
            const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`)
            const data = await response.json()
            setdataClima(data)
        }

        catch(error){
            console.error('Ocurrio el siguiente error: ',error)
        }
    }

  return (
    
    <div className="container">

        <h1>Aplicación del Clima</h1>

        <form onSubmit={handleSubmit}>
            <input type="text" value={ciudad} onChange={handleCambioCiudad}/>
            <button type="submit"> Buscar </button>
        </form>
        {
            dataClima && (
            <div>
                <h2>{dataClima.name}</h2>
                <p>Temperatura: {parseInt(dataClima?.main?.temp - difKelvin)} ºC </p>
                <p>Condicion meteorológica: {dataClima.weather[0].description} </p>
                <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`}/>
            </div>
            )
        }
    </div>
  )
}
