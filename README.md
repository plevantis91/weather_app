# Weather App

A modern, responsive weather application that demonstrates real-world API consumption, data handling, and dynamic frontend behavior. Users can enter a city name to get current weather conditions and a 5-day forecast with beautiful animations and dynamic backgrounds.

## Features

- 🌤️ **Current Weather Display**: Real-time weather data including temperature, humidity, wind speed, visibility, and "feels like" temperature
- 📅 **5-Day Forecast**: Extended weather forecast with daily predictions
- 🎨 **Dynamic Backgrounds**: Background changes based on weather conditions (clear, cloudy, rainy, snowy, etc.)
- 🌟 **Weather Icons**: Beautiful Font Awesome icons that represent different weather conditions
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- ⚡ **Smooth Animations**: Fade-in and slide-in animations for better user experience
- 🔍 **Smart Search**: Enter key support and intuitive search interface
- 🎯 **Error Handling**: User-friendly error messages and loading states

## Setup Instructions

### 1. Get Your API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Navigate to the API keys section
4. Copy your API key

### 2. Configure the Application

1. Open `script.js` in your code editor
2. Find the line: `this.apiKey = 'YOUR_API_KEY_HERE';`
3. Replace `'YOUR_API_KEY_HERE'` with your actual API key
4. Save the file

### 3. Run the Application

1. Open `index.html` in your web browser
2. Enter a city name in the search box
3. Press Enter or click the search button
4. Enjoy the weather data!

## File Structure

```
Weather App/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and responsive design
├── script.js           # JavaScript functionality and API integration
└── README.md           # This file
```

## Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with Flexbox and Grid, animations, and responsive design
- **JavaScript (ES6+)**: Class-based architecture, async/await, and modern JavaScript features
- **OpenWeatherMap API**: Weather data source
- **Font Awesome**: Weather and UI icons
- **Google Fonts**: Inter font family for modern typography

## API Integration

The app uses the OpenWeatherMap API with two endpoints:

1. **Current Weather API**: `https://api.openweathermap.org/data/2.5/weather`
   - Fetches current weather conditions
   - Returns temperature, humidity, wind speed, visibility, and more

2. **5-Day Forecast API**: `https://api.openweathermap.org/data/2.5/forecast`
   - Fetches 5-day weather forecast
   - Returns hourly data grouped by day

## Dynamic Features

### Background Changes
The app automatically changes the background gradient based on weather conditions:
- **Clear**: Blue gradient
- **Clouds**: Gray gradient
- **Rain**: Blue gradient with rain effect
- **Snow**: Purple gradient
- **Thunderstorm**: Dark gradient
- **Mist/Fog**: Light purple gradient

### Weather Icons
Uses Font Awesome icons with specific mappings for different weather conditions and times of day.

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interface
- Optimized for all screen sizes

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Performance Features

- Efficient API calls with Promise.all for parallel requests
- Smooth animations with CSS transitions
- Optimized images and icons
- Minimal external dependencies

## Future Enhancements

- Location-based weather (geolocation)
- Weather alerts and notifications
- Historical weather data
- Multiple city tracking
- Weather maps integration
- Unit conversion (Celsius/Fahrenheit)
- Dark/light theme toggle

## Troubleshooting

### Common Issues

1. **"City not found" error**: Make sure the city name is spelled correctly
2. **API key error**: Verify your OpenWeatherMap API key is correct
3. **No data loading**: Check your internet connection
4. **Styling issues**: Ensure all CSS files are properly linked

### API Rate Limits

The free OpenWeatherMap API has rate limits:
- 60 calls per minute
- 1,000,000 calls per month

For production use, consider upgrading to a paid plan.

## License

This project is open source and available under the MIT License.

## Contributing

Feel free to submit issues, feature requests, or pull requests to improve the application.

---

**Note**: Remember to keep your API key secure and never commit it to public repositories. Consider using environment variables for production deployments.
