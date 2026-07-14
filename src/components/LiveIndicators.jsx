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

  // Clock effect
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Formatter for Cairo Local Time
      const timeOptions = {
        timeZone: 'Africa/Cairo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setCairoTime(now.toLocaleTimeString('ar-EG', timeOptions));

      // Get hours in Cairo timezone (24h format)
      const hourOptions = { timeZone: 'Africa/Cairo', hour: 'numeric', hour12: false };
      const cairoHour = parseInt(now.toLocaleTimeString('en-US', hourOptions));

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
    // Refresh weather every 10 minutes
    const interval = setInterval(fetchWeather, 600000);
    return () => clearInterval(interval);
  }, [setWeatherData]);

  // Determine temperature gradient scale and label
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
        {/* Card 1: Cairo Local Time (Ticking) */}
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
          {/* Temperature visual progress gradient line */}
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
    </div>
  );
}
