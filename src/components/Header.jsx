import React from 'react';

export default function Header() {
  return (
    <header>
      <div className="header-bg-card">
        <img src="images/pyramids.png" alt="أهرامات الجيزة" />
        <div className="header-overlay">
          <h1>رحلة القاهرة 2026</h1>
          <p>
            <i className="hgi-stroke hgi-calendar-03"></i> 6 أيام / 5 ليالٍ • سبتمبر 2026
          </p>
        </div>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-title)' }}>مرحباً بك في القاهرة</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>لوحة التحكم الشاملة لخطة إجازتك</p>
        </div>
        <div style={{ backgroundColor: 'var(--accent-yellow-light)', color: 'var(--text-title)', border: '1px solid var(--text-title)', padding: '4px 12px', borderRadius: '30px', fontSize: '12px', fontWeight: 900, whiteSpace: 'nowrap' }}>
          تحديث فوري نشط
        </div>
      </div>
    </header>
  );
}
