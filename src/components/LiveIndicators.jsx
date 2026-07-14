import React, { useState, useEffect } from 'react';

export default function LiveIndicators({ exchangeRate, weatherData, setWeatherData }) {
  const [cairoTime, setCairoTime] = useState('');
  const [timeState, setTimeState] = useState({
    gradient: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
    textColor: '#FFFFFF',
    valColor: '#FFD850',
    titleColor: '#94A3B8',
    iconColor: '#FFD850',
    desc: 'مساء القاهرة الساهر والقريب',
  });

  // Currency Converter states
  const [sarInput, setSarInput] = useState('');
  const [egpInput, setEgpInput] = useState('');

  // Clock effect with mathematical cairoHour to avoid browser locale formatting bugs
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      
      // Calculate local hour in Cairo (UTC+3)
      const cairoHour = (now.getUTCHours() + 3) % 24;

      // Format time in English numbers (Western numerals)
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Africa/Cairo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });

      // Translate AM/PM to Arabic ص/م but keep English numerals
      const formattedTime = timeStr.replace('AM', 'ص').replace('PM', 'م');
      setCairoTime(formattedTime);

      // Change time card theme based on Cairo hour phase
      if (cairoHour >= 6 && cairoHour < 12) {
        // Morning (6 AM - 11:59 AM)
        setTimeState({
          gradient: 'linear-gradient(135deg, #FFF9E6 0%, #D4EFFF 100%)',
          textColor: '#3E3A31',
          valColor: '#8A764A',
          titleColor: '#706B5F',
          iconColor: '#8A764A',
          desc: 'صباح جميل في أم الدنيا',
        });
      } else if (cairoHour >= 12 && cairoHour < 17) {
        // Afternoon (12 PM - 4:59 PM)
        setTimeState({
          gradient: 'linear-gradient(135deg, #FFF9E6 0%, #B9E3FF 100%)',
          textColor: '#3E3A31',
          valColor: '#8A764A',
          titleColor: '#706B5F',
          iconColor: '#8A764A',
          desc: 'ظهيرة القاهرة المشمسة',
        });
      } else if (cairoHour >= 17 && cairoHour < 20) {
        // Evening/Sunset (5 PM - 7:59 PM)
        setTimeState({
          gradient: 'linear-gradient(135deg, #FFD8A8 0%, #FFA8A8 100%)',
          textColor: '#3E3A31',
          valColor: '#8A764A',
          titleColor: '#706B5F',
          iconColor: '#8A764A',
          desc: 'غروب ساحر على النيل',
        });
      } else {
        // Night (8 PM - 5:59 AM)
        setTimeState({
          gradient: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
          textColor: '#FFFFFF',
          valColor: '#FFD850',
          titleColor: '#94A3B8',
          iconColor: '#FFD850',
          desc: 'مساء القاهرة الساهر والقريب',
        });
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Weather effect
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=30.0444&longitude=31.2357&current_weather=true');
        if (res.ok) {
          const data = await res.json();
          if (data && data.current_weather) {
            const temp = Math.round(data.current_weather.temperature);
            const code = data.current_weather.weathercode;
            
            let desc = "أجواء معتدلة";
            if (code === 0) desc = "سماء صافية";
            else if (code >= 1 && code <= 3) desc = "غائم جزئياً";
            else if (code >= 45 && code <= 48) desc = "ضباب خفيف";
            else if (code >= 51 && code <= 65) desc = "أجواء ممطرة";
            else if (code >= 95 && code <= 99) desc = "عواصف رعدية";
            
            setWeatherData({ temp, desc, error: false });
          }
        }
      } catch (err) {
        console.warn('Failed to fetch live weather, using fallback.', err);
        setWeatherData(prev => ({ ...prev, error: true }));
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 600000);
    return () => clearInterval(interval);
  }, [setWeatherData]);

  // Currency Converter logic
  const handleSarChange = (val) => {
    setSarInput(val);
    if (val === '') {
      setEgpInput('');
      return;
    }
    const num = parseFloat(val) || 0;
    setEgpInput(Math.round(num * exchangeRate).toString());
  };

  const handleEgpChange = (val) => {
    setEgpInput(val);
    if (val === '') {
      setSarInput('');
      return;
    }
    const num = parseFloat(val) || 0;
    setSarInput((Math.round((num / exchangeRate) * 10) / 10).toString());
  };

  const handleSwapValues = () => {
    const temp = sarInput;
    setSarInput(egpInput);
    setEgpInput(temp);
  };

  // Determine temperature gradient scale
  const getTempScale = (temp) => {
    if (temp <= 15) return { color: '#00D4FF', percentage: 20, status: 'بارد' };
    if (temp <= 25) return { color: '#00E676', percentage: 50, status: 'معتدل' };
    if (temp <= 35) return { color: '#FFA726', percentage: 75, status: 'حار نسبياً' };
    return { color: '#FF1744', percentage: 95, status: 'حار جداً' };
  };

  const scale = getTempScale(weatherData.temp);

  return (
    <div className="indicators-section">
      <div className="section-title" style={{ margin: '24px 20px 12px 20px' }}>
        <span>مؤشرات القاهرة المباشرة</span>
        <i className="hgi-stroke hgi-dashboard-circle"></i>
      </div>
      
      <div className="indicators-grid-container">
        {/* Card 1: Cairo Local Time (Ticking & English Numbers) */}
        <div className="premium-indicator-card time-card-state" style={{ background: timeState.gradient, color: timeState.textColor }}>
          <div className="premium-card-header">
            <i className="hgi-stroke hgi-clock-01" style={{ color: timeState.iconColor }}></i>
            <span style={{ color: timeState.titleColor }}>الساعة الآن في القاهرة</span>
          </div>
          <div className="premium-card-value" style={{ color: timeState.valColor }}>
            {cairoTime || '00:00:00 ص'}
          </div>
          <div className="premium-card-desc" style={{ color: timeState.titleColor }}>
            {timeState.desc}
          </div>
        </div>

        {/* Card 2: Weather */}
        <div className="premium-indicator-card weather-card-state">
          <div className="premium-card-header">
            <i className="hgi-stroke hgi-cloud-sun"></i>
            <span>طقس القاهرة الحالي</span>
          </div>
          <div className="premium-card-value-group">
            <span className="premium-card-value">{weatherData.temp}° م</span>
            <span className="premium-temp-tag" style={{ color: scale.color, backgroundColor: `${scale.color}15` }}>
              {scale.status}
            </span>
          </div>
          <div className="premium-card-desc">{weatherData.desc} • ليل معتدل 18°</div>
          <div className="temp-gradient-bar-wrapper">
            <div className="temp-gradient-bar">
              <div 
                className="temp-gradient-bar-fill" 
                style={{ 
                  width: `${scale.percentage}%`,
                  background: `linear-gradient(to left, ${scale.color}, #FFA726)`
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Card 3: Live Exchange Rate */}
        <div className="premium-indicator-card exchange-card-state">
          <div className="premium-card-header">
            <i className="hgi-stroke hgi-money-03"></i>
            <span>سعر الصرف المباشر</span>
          </div>
          <div className="premium-card-value-group">
            <span className="premium-card-value">{exchangeRate} EGP</span>
            <span className="premium-currency-tag">SAR / EGP</span>
          </div>
          <div className="premium-card-desc">لكل 1 ريال سعودي (محدث تلقائياً)</div>
        </div>
      </div>

      {/* Currency Converter moved under the Live Indicators Grid (Full Width) */}
      <div className="section-title" style={{ margin: '24px 20px 12px 20px' }}>
        <span>محول العملات التفاعلي</span>
        <i className="hgi-stroke hgi-exchange-01"></i>
      </div>
      <div className="card" style={{ margin: '0 20px 24px 20px' }}>
        <div className="converter-flex-container">
          <div className="converter-input-col">
            <span className="converter-label">ريال سعودي (SAR)</span>
            <input 
              type="number" 
              placeholder="0"
              value={sarInput} 
              onChange={(e) => handleSarChange(e.target.value)}
              className="converter-field"
            />
          </div>
          
          <button 
            onClick={handleSwapValues} 
            className="converter-swap-btn"
          >
            <i className="hgi-stroke hgi-exchange-01"></i>
          </button>

          <div className="converter-input-col">
            <span className="converter-label">جنيه مصري (EGP)</span>
            <input 
              type="number" 
              placeholder="0"
              value={egpInput} 
              onChange={(e) => handleEgpChange(e.target.value)}
              className="converter-field"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
