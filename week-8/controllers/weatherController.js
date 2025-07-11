const axios = require('axios');

exports.getWeather = async (req, res, next) => {
  try {
    const city = req.query.city || 'Delhi';
    const apiKey = process.env.WEATHER_API_KEY;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    const { name, main, weather } = response.data;
    res.status(200).json({
      city: name,
      temperature: main.temp,
      description: weather[0].description
    });
  } catch (error) {
    next(error);
  }
};
