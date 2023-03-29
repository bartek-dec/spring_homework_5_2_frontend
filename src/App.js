import {useState} from "react";
import axios from "axios";

const url = 'http://localhost:8080/forecast';

function App() {
    const [city, setCity] = useState('');
    const [warning, setWarning] = useState(false);
    const [forecast, setForecast] = useState(null);

    const getData = async (city) => {
        try {
            const {data} = await axios.post(`${url}/${city}`);
            setForecast(data);
        } catch (error) {
            setForecast(null);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city.length < 1) {
            setWarning(true);
            return;
        }
        getData(city);
        setCity('');
        setWarning(false);
    }

    return (
        <>
            <section className='page'>
                <div className='form-container'>
                    <form className='form' onSubmit={handleSubmit}>
                        <input type='text' value={city} onChange={(e) => setCity(e.target.value)}
                               placeholder='e.g. City'/>
                        <button type='submit' className='btn'>Submit</button>
                    </form>
                    {warning && <p className='warning'>Please provide the city</p>}
                </div>

                <div className='forecast-container'>
                    {forecast && (
                        <div className='forecast'>
                            <div className='img-container'>
                                <img src={forecast?.current?.condition?.icon} alt='icon'/>
                                <p>{forecast?.current?.condition?.text}</p>
                            </div>
                            <div className='info-container'>
                                <p>Wiatr: <span>{forecast?.current?.wind_kph} km/h </span></p>
                                <p>Ciśnienie: <span>{forecast?.current?.pressure_mb} hPa </span></p>
                                <p>Temp. odczuwalna: <span>{forecast?.current?.feelslike_c} &deg;C </span></p>
                                <p className='temp'>{forecast?.current?.temp_c} &deg;C </p>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

export default App;
