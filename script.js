const link =
  "http://api.weatherstack.com/current?access_key=a65aa8484c2bbd27642ada49e9d72c3b";

const root = document.getElementById("#root");

let store = {
  city: "London",
  feelslike: 0,
  cloudcover: 0,
  temparature: 0,
  humidity: 0,
  observationTime: "00:00 AM",
  pressure: 0,
  uvIndex: 0,
  visibility: 0,
  isDay: "yes",
  discription: "",
  windSpeed: 0,
};

const fetchData = async () => {
  result = await fetch(`${link}&query=${store.city}`);
  const data = await result.json();
  console.log(data);

  const {
    current: {
      cloudcover,
      temperature,
      humidity,
      observation_time: observationTime,
      pressure,
      uv_index: uvIndex,
      visibility,
      is_day: isDay,
      weather_descriptions: description,
      wind_speed: windSpeed,
    },
  } = data;

  store = {
    ...store,
    isDay,
    city: name,
    temperature,
    observationTime,
    description: description[0],
    properties,
    cloudcover,
    humidity,
    windSpeed,
    pressure,
    uvIndex,
    visibility,
  };
  renderComponent();

  const getImage = (description) => {
    const value = description.toLowerCase();

    switch (value) {
      case "partly cloudy":
        return "partly.png";
      case "cloud":
        return "cloud.png";
      case "fog":
        return "fog.png";
      case "sunny":
        return "sunny.png";
      case "cloud":
        return "cloud.png";
      default:
        return "the.png";
    }
  };
};
const markup = () => {
  const { city, description, observationTime, temperature, isDay, properties } =
    store;

  return `<div class="container ${containerClass}">
            <div class="top">
              <div class="city">
                <div class="city-subtitle">Weather Today in</div>
                  <div class="city-title" id="city">
                  <span>${city}</span>
                </div>
              </div>
              <div class="city-info">
                <div class="top-left">
                <img class="icon" src="./img/${getImage(description)}" alt="" />
                <div class="description">${description}</div>
              </div>
            
              <div class="top-right">
                <div class="city-info__subtitle">as of ${observationTime}</div>
                <div class="city-info__title">${temperature}°</div>
              </div>
            </div>
          </div>
        <div id="properties">${renderProperty(properties)}</div>
      </div>`;
};

const renderComponent = () => {
  root.innerHTML = markup();
};

fetchData();
