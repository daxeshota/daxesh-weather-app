import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState();

  const search = (e) => {
    e.preventDefault();
    setCity(input);
    setInput("");
  };

  const fetchUrl = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`;
      const res = await fetch(url);
      const response = await res.json();
      if (response.cod === 200) {
        // console.log("true")
        const data1 = {
          city: response.name,
          temp: response.main.temp,
          humidity: response.main.humidity,
          pressure: response.main.pressure,
          temp_max: response.main.temp_max,
          temp_min: response.main.temp_min,
          deg: response.wind.deg,
          speed: response.wind.speed,
        };
        setData(data1);
      } else {
        setError("Data not Found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (city !== "") {
      fetchUrl();
      setData("");
    }
    // eslint-disable-next-line
  }, [city]);

  return (
    <>
      <div className="container text-center mt-5">
        <h1>Whether Report</h1>
        <form className="text-center my-5" onSubmit={(e) => search(e)}>
          <input
            placeholder="Enter City Name"
            className="m-3 rounded p-2"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="rounded p-2 bg-dark text-white" type="submit">
            Search
          </button>
        </form>

        {data ? (
          <>
            <h1>City : {data.city}</h1>
            <div className="card w-50 mx-auto mt-5">
              <div className="card-body bg-info">
                <h3 className="card-title">Today whether of {city}</h3>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item bg-light">
                  Temperature : {data.temp}
                </li>
                <li className="list-group-item bg-light">
                  Humidity : {data.humidity}
                </li>
                <li className="list-group-item bg-light">
                  Pressure : {data.pressure}
                </li>
                <li className="list-group-item bg-light">
                  Temp_min : {data.temp_min}
                </li>
                <li className="list-group-item bg-light">
                  Temp_max : {data.temp_max}
                </li>
                <li className="list-group-item bg-light">
                  Wind speed : {data.speed}
                </li>
                <li className="list-group-item bg-light">
                  Wind deg : {data.deg}
                </li>
              </ul>
            </div>
          </>
        ) : (
          <h1>{error}</h1>
        )}
      </div>
    </>
  );
}

export default App;
