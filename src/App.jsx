import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import LiveIndicators from './components/LiveIndicators';
import ItinerarySection from './components/ItinerarySection';
import BudgetSection from './components/BudgetSection';
import FoodGuideSection from './components/FoodGuideSection';
import ChatBot from './components/ChatBot';

export default function App() {
  const [budgetData, setBudgetData] = useState(() => {
    const saved = localStorage.getItem('cairo_budget_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.warn('Failed to parse budget data from localStorage', e);
      }
    }
    return {
      flights: 1100,
      hotel: 900,
      transport: 300,
      activities: 300,
      food: 400
    };
  });

  const [exchangeRate, setExchangeRate] = useState(13.0);
  const [weatherData, setWeatherData] = useState({
    temp: 28,
    desc: 'جاري التحديث...',
    error: false
  });

  // Fetch Exchange Rate on load
  useEffect(() => {
    const fetchRate = async () => {
      try {
        const res = await fetch('https://open.er-api.com/v6/latest/SAR');
        if (res.ok) {
          const data = await res.json();
          if (data && data.rates && data.rates.EGP) {
            setExchangeRate(Math.round(data.rates.EGP * 100) / 100);
          }
        }
      } catch (err) {
        console.warn('Failed to fetch exchange rate, using fallback', err);
      }
    };
    fetchRate();
  }, []);

  return (
    <div className="app-container">
      <Header />
      
      {/* Live Indicators Section placed directly under Header */}
      <LiveIndicators 
        exchangeRate={exchangeRate} 
        weatherData={weatherData} 
        setWeatherData={setWeatherData} 
      />

      <div className="main-content-grid">
        <div className="column-itinerary">
          <ItinerarySection />
        </div>

        <div className="column-sidebar">
          <BudgetSection 
            budgetData={budgetData} 
            setBudgetData={setBudgetData} 
            exchangeRate={exchangeRate} 
          />
        </div>
      </div>

      {/* Food Guide Section as the last section spanning full width */}
      <div style={{ margin: '0 20px 24px 20px' }}>
        <FoodGuideSection />
      </div>

      <ChatBot budgetData={budgetData} exchangeRate={exchangeRate} />
    </div>
  );
}
