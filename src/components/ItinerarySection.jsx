import React, { useState } from 'react';

export default function ItinerarySection() {
  const [activeDay, setActiveDay] = useState(1);

  const toggleDay = (dayNum) => {
    if (activeDay === dayNum) {
      setActiveDay(null); // collapse if clicked again
    } else {
      setActiveDay(dayNum);
    }
  };

  const days = [
    {
      num: 1,
      badge: 'اليوم 1',
      title: 'الوصول والاستقرار النيلي',
      img: 'images/nile.png',
      alt: 'النيل والفلوكة',
      activities: [
        { icon: 'hgi-flight-land-01', text: 'الوصول لمطار القاهرة الدولي: الانتقال للإقامة في الفندق (وسط البلد أو الزمالك) عبر أوبر.' },
        { icon: 'hgi-hotel-01', text: 'تسجيل الدخول بالفندق: استلام الغرفة، الاستراحة، وترتيب الأغراض.' },
        { icon: 'hgi-ship', text: 'مساءً (رحلة فلوكة نيلية): جولة هادئة بقارب الفلوكة الشراعي في مياه النيل المنعشة، يليها عشاء في مطعم نيلية مميز.' }
      ]
    },
    {
      num: 2,
      badge: 'اليوم 2',
      title: 'عبق التاريخ (الأهرامات والمتحف العظيم)',
      img: 'images/pyramids.png',
      alt: 'الأهرامات وقت الغروب',
      activities: [
        { icon: 'hgi-camera-01', text: 'صباحاً (أهرامات الجيزة وأبو الهول): زيارة الأهرامات الثلاثة وأبو الهول والتقاط صور مذهلة من البانوراما.' },
        { icon: 'hgi-university', text: 'ظهراً (المتحف المصري الكبير GEM): زيارة البهو العظيم والتمثال العملاق لرمسيس الثاني والتجول بالخارج.' },
        { icon: 'hgi-restaurant', text: 'الغداء (مشويات الجيزة): الاستمتاع بالكباب والكفتة المصرية الشهيرة مع السلطات الطازجة.' }
      ]
    },
    {
      num: 3,
      badge: 'اليوم 3',
      title: 'الحضارة وتسامح الأديان',
      img: 'images/citadel.png',
      alt: 'قلعة صلاح الدين',
      activities: [
        { icon: 'hgi-structure-02', text: 'صباحاً (قلعة صلاح الدين): الصعود للقلعة التاريخية وزيارة مسجد محمد علي ذي الطراز العثماني والتمتع بفيو القاهرة.' },
        { icon: 'hgi-building-06', text: 'ظهراً (مجمع الأديان ومتحف الحضارة): زيارة الكنيسة المعلقة ومسجد عمرو بن العاص، ثم المتحف القومي للحضارة (قاعة المومياوات الملكية).' },
        { icon: 'hgi-tree-02', text: 'عصراً (حديقة الأزهر): الاسترخاء بحديقة الأزهر الخضراء ومشاهدة أروع منظر للغروب مع صوت الأذان العذب.' }
      ]
    },
    {
      num: 4,
      badge: 'اليوم 4',
      title: 'أزقة المعز وسحر خان الخليلي',
      img: 'images/khan.png',
      alt: 'خان الخليلي فوانيس دافئة',
      activities: [
        { icon: 'hgi-walk', text: 'صباحاً (شارع المعز): التمشية بين المساجد والأسبلة الإسلامية الفريدة والاستمتاع بالتفاصيل المعمارية.' },
        { icon: 'hgi-bowl', text: 'الغداء (كشري أبو طارق): تجربة الوجبة الشعبية الأبرز كشري مصري بخلطته السحرية.' },
        { icon: 'hgi-shopping-bag-02', text: 'مساءً (بازار خان الخليلي ومقهى الفيشاوي): التسوق وشراء التحف والهدايا التذكارية، ثم الجلوس لشرب شاي بالنعناع على أنغام الموسيقى الشرقية.' }
      ]
    },
    {
      num: 5,
      badge: 'اليوم 5',
      title: 'عصرنة القاهرة وإطلالة البرج',
      img: 'images/tower.png',
      alt: 'برج القاهرة',
      activities: [
        { icon: 'hgi-cup-01', text: 'صباحاً (إفطار بالزمالك): إفطار غربي في أحد مقاهي الزمالك الراقية ذات الفيو الأخضر الهادئ.' },
        { icon: 'hgi-city-01', text: 'ظهراً (برج القاهرة): صعود قمة البرج لمشاهدة بانوراما ساحرة لمدينة القاهرة بالكامل من الأعلى.' },
        { icon: 'hgi-bridge', text: 'مساءً (كوبري قصر النيل وعشاء): تمشية كلاسيكية على الكوبري بين أسدي قصر النيل وعشاء فاخر في الزمالك.' }
      ]
    },
    {
      num: 6,
      badge: 'اليوم 6',
      title: 'وداع المحروسة والعودة',
      img: 'images/souvenirs.png',
      alt: 'الحلويات والعودة',
      activities: [
        { icon: 'hgi-shopping-01', text: 'صباحاً (شراء المستلزمات والحلويات): شراء الحلويات الشرقية (البسبوسة والمانجو والفطير المشلتت) كهدية للعودة.' },
        { icon: 'hgi-baggage', text: 'ظهراً (حزم الأمتعة والمغادرة): تسجيل الخروج من الفندق والتوجه بسيارة أوبر إلى المطار للعودة.' }
      ]
    }
  ];

  return (
    <>
      <div className="section-title">
        <span>جدول الرحلة اليومي</span>
        <i className="hgi-stroke hgi-road-map-02"></i>
      </div>
      
      <div className="day-accordion">
        {days.map((day) => {
          const isOpen = activeDay === day.num;
          return (
            <div key={day.num} className={`day-item ${isOpen ? 'active' : ''}`}>
              <div className="day-header" onClick={() => toggleDay(day.num)}>
                <span className="day-badge">{day.badge}</span>
                <span className="day-title">{day.title}</span>
                <i className={`hgi-stroke hgi-arrow-down-01 day-toggle-icon ${isOpen ? 'rotate' : ''}`}></i>
              </div>
              <div 
                className="day-content" 
                style={{ 
                  maxHeight: isOpen ? '1000px' : '0px', 
                  transition: 'max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  overflow: 'hidden'
                }}
              >
                <div className="day-image-card">
                  <img src={day.img} alt={day.alt} />
                </div>
                <div className="activity-list">
                  {day.activities.map((act, index) => (
                    <div key={index} className="activity-sub-item">
                      <i className={`hgi-stroke ${act.icon}`}></i>
                      <div>{act.text}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
