import { useState, useEffect } from 'react';
import { CloudSun, Loader, MapPin } from 'lucide-react';

interface WeatherData {
  temp: number;
  description: string;
  location: string;
}

const Weather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getWeatherData = async (lat: number, lon: number) => {
      try {
        // This is a mock implementation since we're not using actual API keys
        // In a real app, you would call a weather API with the coordinates
        
        // Simulating API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock weather data
        const mockWeather = {
          temp: Math.round(10 + Math.random() * 20), // Random temp between 10-30°C
          description: ['Sunny', 'Partly cloudy', 'Cloudy', 'Light rain'][Math.floor(Math.random() * 4)],
          location: 'Your Location'
        };
        
        setWeather(mockWeather);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch weather data');
        setLoading(false);
      }
    };

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            getWeatherData(position.coords.latitude, position.coords.longitude);
          },
          () => {
            setError('Unable to retrieve your location');
            setLoading(false);
          }
        );
      } else {
        setError('Geolocation is not supported by your browser');
        setLoading(false);
      }
    };

    getLocation();
  }, []);

  return (
    <div className="space-y-3">
      <div className="flex items-center mb-4">
        <CloudSun className="w-5 h-5 mr-2 text-slate-600" />
        <h2 className="text-lg font-semibold text-slate-700">Weather</h2>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center py-6">
          <Loader className="w-6 h-6 text-slate-400 animate-spin" />
        </div>
      ) : error ? (
        <div className="text-sm text-center text-red-500 py-4">{error}</div>
      ) : weather ? (
        <div className="flex flex-col items-center">
          <div className="text-3xl font-light mb-2">{weather.temp}°C</div>
          <div className="text-sm text-slate-600 mb-3">{weather.description}</div>
          <div className="flex items-center text-xs text-slate-500">
            <MapPin className="w-3 h-3 mr-1" />
            {weather.location}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Weather;
