// Weather App JavaScript
class WeatherApp {
    constructor() {
        this.apiKey = 'YOUR_API_KEY_HERE'; // Replace with your OpenWeatherMap API key
        this.baseUrl = 'https://api.openweathermap.org/data/2.5';
        this.currentWeatherUrl = `${this.baseUrl}/weather`;
        this.forecastUrl = `${this.baseUrl}/forecast`;
        
        this.initializeElements();
        this.attachEventListeners();
    }

    initializeElements() {
        this.cityInput = document.getElementById('cityInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.errorMessage = document.getElementById('errorMessage');
        this.loading = document.getElementById('loading');
        this.currentWeather = document.getElementById('currentWeather');
        this.forecastSection = document.getElementById('forecastSection');
        this.forecastContainer = document.getElementById('forecastContainer');
        this.body = document.body;
    }

    attachEventListeners() {
        this.searchBtn.addEventListener('click', () => this.searchWeather());
        this.cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.searchWeather();
            }
        });
    }

    async searchWeather() {
        const city = this.cityInput.value.trim();
        
        if (!city) {
            this.showError('Please enter a city name');
            return;
        }

        this.clearError();
        this.showLoading();
        
        try {
            const [currentWeatherData, forecastData] = await Promise.all([
                this.fetchCurrentWeather(city),
                this.fetchForecast(city)
            ]);
            
            this.displayCurrentWeather(currentWeatherData);
            this.displayForecast(forecastData);
            this.updateBackground(currentWeatherData.weather[0].main.toLowerCase());
            
        } catch (error) {
            this.showError('City not found. Please try again.');
            console.error('Error fetching weather data:', error);
        } finally {
            this.hideLoading();
        }
    }

    async fetchCurrentWeather(city) {
        const url = `${this.currentWeatherUrl}?q=${city}&appid=${this.apiKey}&units=metric`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('City not found');
        }
        
        return await response.json();
    }

    async fetchForecast(city) {
        const url = `${this.forecastUrl}?q=${city}&appid=${this.apiKey}&units=metric`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Forecast not found');
        }
        
        return await response.json();
    }

    displayCurrentWeather(data) {
        const {
            name,
            main: { temp, feels_like, humidity },
            weather: [{ main, description, icon }],
            wind: { speed },
            visibility
        } = data;

        // Update city name and date
        document.getElementById('cityName').textContent = name;
        document.getElementById('currentDate').textContent = this.formatDate(new Date());

        // Update temperature and description
        document.getElementById('currentTemp').textContent = Math.round(temp);
        document.getElementById('currentDescription').textContent = description;

        // Update weather icon
        const weatherIcon = document.getElementById('currentIcon');
        weatherIcon.innerHTML = this.getWeatherIcon(main, icon);

        // Update weather details
        document.getElementById('visibility').textContent = `${Math.round(visibility / 1000)} km`;
        document.getElementById('humidity').textContent = `${humidity}%`;
        document.getElementById('windSpeed').textContent = `${Math.round(speed)} m/s`;
        document.getElementById('feelsLike').textContent = `${Math.round(feels_like)}°C`;

        // Show current weather with animation
        this.currentWeather.style.display = 'block';
        this.currentWeather.classList.add('fade-in');
    }

    displayForecast(data) {
        const forecastList = data.list;
        const dailyForecasts = this.groupForecastsByDay(forecastList);
        
        // Clear previous forecast
        this.forecastContainer.innerHTML = '';
        
        // Display next 5 days
        const next5Days = Object.keys(dailyForecasts).slice(0, 5);
        
        next5Days.forEach((date, index) => {
            const dayForecasts = dailyForecasts[date];
            const avgTemp = this.calculateAverageTemp(dayForecasts);
            const mostCommonWeather = this.getMostCommonWeather(dayForecasts);
            
            const forecastCard = this.createForecastCard(date, avgTemp, mostCommonWeather);
            this.forecastContainer.appendChild(forecastCard);
        });

        // Show forecast section with animation
        this.forecastSection.style.display = 'block';
        this.forecastSection.classList.add('fade-in');
    }

    groupForecastsByDay(forecastList) {
        const grouped = {};
        
        forecastList.forEach(forecast => {
            const date = new Date(forecast.dt * 1000).toDateString();
            if (!grouped[date]) {
                grouped[date] = [];
            }
            grouped[date].push(forecast);
        });
        
        return grouped;
    }

    calculateAverageTemp(forecasts) {
        const temps = forecasts.map(f => f.main.temp);
        const avgTemp = temps.reduce((sum, temp) => sum + temp, 0) / temps.length;
        return Math.round(avgTemp);
    }

    getMostCommonWeather(forecasts) {
        const weatherCounts = {};
        forecasts.forEach(forecast => {
            const weather = forecast.weather[0].main;
            weatherCounts[weather] = (weatherCounts[weather] || 0) + 1;
        });
        
        return Object.keys(weatherCounts).reduce((a, b) => 
            weatherCounts[a] > weatherCounts[b] ? a : b
        );
    }

    createForecastCard(date, avgTemp, weather) {
        const card = document.createElement('div');
        card.className = 'forecast-card slide-in';
        
        const dateObj = new Date(date);
        const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
        const monthDay = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        
        card.innerHTML = `
            <div class="forecast-date">${dayName}, ${monthDay}</div>
            <div class="forecast-icon">${this.getWeatherIcon(weather)}</div>
            <div class="forecast-temp">
                <span class="forecast-high">${avgTemp}°C</span>
            </div>
            <div class="forecast-description">${weather.toLowerCase()}</div>
        `;
        
        return card;
    }

    getWeatherIcon(weather, iconCode = null) {
        const iconMap = {
            'Clear': 'fas fa-sun',
            'Clouds': 'fas fa-cloud',
            'Rain': 'fas fa-cloud-rain',
            'Drizzle': 'fas fa-cloud-drizzle',
            'Thunderstorm': 'fas fa-bolt',
            'Snow': 'fas fa-snowflake',
            'Mist': 'fas fa-smog',
            'Fog': 'fas fa-smog',
            'Haze': 'fas fa-smog',
            'Dust': 'fas fa-smog',
            'Sand': 'fas fa-smog',
            'Ash': 'fas fa-smog',
            'Squall': 'fas fa-wind',
            'Tornado': 'fas fa-tornado'
        };

        // Use specific icon codes for more accurate representation
        if (iconCode) {
            const specificIcons = {
                '01d': 'fas fa-sun',           // clear sky day
                '01n': 'fas fa-moon',          // clear sky night
                '02d': 'fas fa-cloud-sun',     // few clouds day
                '02n': 'fas fa-cloud-moon',    // few clouds night
                '03d': 'fas fa-cloud',         // scattered clouds
                '03n': 'fas fa-cloud',
                '04d': 'fas fa-cloud',         // broken clouds
                '04n': 'fas fa-cloud',
                '09d': 'fas fa-cloud-rain',    // shower rain
                '09n': 'fas fa-cloud-rain',
                '10d': 'fas fa-cloud-rain',    // rain
                '10n': 'fas fa-cloud-rain',
                '11d': 'fas fa-bolt',          // thunderstorm
                '11n': 'fas fa-bolt',
                '13d': 'fas fa-snowflake',     // snow
                '13n': 'fas fa-snowflake',
                '50d': 'fas fa-smog',          // mist
                '50n': 'fas fa-smog'
            };
            
            if (specificIcons[iconCode]) {
                return `<i class="${specificIcons[iconCode]}"></i>`;
            }
        }

        return `<i class="${iconMap[weather] || 'fas fa-cloud'}"></i>`;
    }

    updateBackground(weatherCondition) {
        // Remove existing weather classes
        this.body.className = this.body.className.replace(/clear|clouds|rain|snow|thunderstorm|mist|fog/g, '');
        
        // Add new weather class
        this.body.classList.add(weatherCondition);
    }

    formatDate(date) {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    showLoading() {
        this.loading.classList.add('show');
        this.currentWeather.style.display = 'none';
        this.forecastSection.style.display = 'none';
    }

    hideLoading() {
        this.loading.classList.remove('show');
    }

    showError(message) {
        this.errorMessage.textContent = message;
        this.errorMessage.style.color = '#e17055';
    }

    clearError() {
        this.errorMessage.textContent = '';
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const weatherApp = new WeatherApp();
    
    // Add some demo functionality for testing without API key
    if (weatherApp.apiKey === 'YOUR_API_KEY_HERE') {
        console.warn('Please add your OpenWeatherMap API key to use the weather app');
        
        // Show demo message
        const errorElement = document.getElementById('errorMessage');
        errorElement.textContent = 'Please add your OpenWeatherMap API key to the script.js file';
        errorElement.style.color = '#fdcb6e';
        errorElement.style.fontWeight = '600';
    }
});

// Add some utility functions for enhanced user experience
document.addEventListener('DOMContentLoaded', () => {
    // Add focus to search input on page load
    const cityInput = document.getElementById('cityInput');
    cityInput.focus();
    
    // Add click outside to clear error
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            const errorMessage = document.getElementById('errorMessage');
            if (errorMessage.textContent.includes('Please enter a city name')) {
                errorMessage.textContent = '';
            }
        }
    });
});
