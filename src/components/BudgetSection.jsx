import React, { useState, useEffect } from 'react';

export default function BudgetSection({ budgetData, setBudgetData, exchangeRate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [localBudget, setLocalBudget] = useState({ ...budgetData });

  // Sync local edit state with parent budgetData when it changes
  useEffect(() => {
    setLocalBudget({ ...budgetData });
  }, [budgetData]);

  const total = budgetData.flights + budgetData.hotel + budgetData.transport + budgetData.activities + budgetData.food;
  const totalEgp = total * exchangeRate;

  const handleEditChange = (key, value) => {
    setLocalBudget(prev => ({
      ...prev,
      [key]: parseFloat(value) || 0
    }));
  };

  const handleSave = () => {
    setBudgetData(localBudget);
    localStorage.setItem('cairo_budget_data', JSON.stringify(localBudget));
    setIsEditing(false);
  };

  return (
    <>
      <div className="section-title">
        <span>ميزانية الرحلة (للفرد)</span>
        <button className="edit-budget-btn" onClick={() => setIsEditing(!isEditing)}>تعديل</button>
      </div>

      <div className="card">
        <div className="budget-header">
          <div className="budget-amount" id="display-total-budget">
            {total.toLocaleString()} <span>ريال سعودي</span>
          </div>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 700 }} id="display-total-egp">
            ≈ {Math.round(totalEgp).toLocaleString()} جنيه مصري
          </div>
        </div>

        <div className="budget-bar-container" id="budget-progress-bar">
          <div className="budget-segment bg-flights" style={{ width: total > 0 ? `${(budgetData.flights / total) * 100}%` : '0%' }} title="الطيران"></div>
          <div className="budget-segment bg-hotel" style={{ width: total > 0 ? `${(budgetData.hotel / total) * 100}%` : '0%' }} title="الفندق"></div>
          <div className="budget-segment bg-transport" style={{ width: total > 0 ? `${(budgetData.transport / total) * 100}%` : '0%' }} title="المواصلات"></div>
          <div className="budget-segment bg-activities" style={{ width: total > 0 ? `${(budgetData.activities / total) * 100}%` : '0%' }} title="الأنشطة"></div>
          <div className="budget-segment bg-food" style={{ width: total > 0 ? `${(budgetData.food / total) * 100}%` : '0%' }} title="طعام/تسوق"></div>
        </div>

        <div className="budget-legend">
          <div className="legend-item">
            <div className="legend-color bg-flights"></div>
            <span>طيران ذهاب وعودة</span>
            <span className="legend-cost" id="legend-cost-flights">{budgetData.flights.toLocaleString()} ر.س</span>
          </div>
          <div className="legend-item">
            <div className="legend-color bg-hotel"></div>
            <span>فندق 4★ (5 ليالٍ)</span>
            <span className="legend-cost" id="legend-cost-hotel">{budgetData.hotel.toLocaleString()} ر.س</span>
          </div>
          <div className="legend-item">
            <div className="legend-color bg-transport"></div>
            <span>مواصلات أوبر ومترو</span>
            <span className="legend-cost" id="legend-cost-transport">{budgetData.transport.toLocaleString()} ر.س</span>
          </div>
          <div className="legend-item">
            <div className="legend-color bg-activities"></div>
            <span>أنشطة ودخول معالم</span>
            <span className="legend-cost" id="legend-cost-activities">{budgetData.activities.toLocaleString()} ر.س</span>
          </div>
          <div className="legend-item" style={{ gridColumn: 'span 2' }}>
            <div className="legend-color bg-food"></div>
            <span>طعام، مقاهي وتسوق</span>
            <span className="legend-cost" id="legend-cost-food">{budgetData.food.toLocaleString()} ر.س</span>
          </div>
        </div>

        {/* Edit Budget Pane */}
        {isEditing && (
          <div className="edit-budget-pane active" id="edit-budget-pane" style={{ display: 'flex' }}>
            <div className="budget-grid-edit">
              <div className="budget-edit-field">
                <label>الطيران (ريال)</label>
                <input type="number" value={localBudget.flights} onChange={(e) => handleEditChange('flights', e.target.value)} />
              </div>
              <div className="budget-edit-field">
                <label>الإقامة (ريال)</label>
                <input type="number" value={localBudget.hotel} onChange={(e) => handleEditChange('hotel', e.target.value)} />
              </div>
              <div className="budget-edit-field">
                <label>المواصلات (ريال)</label>
                <input type="number" value={localBudget.transport} onChange={(e) => handleEditChange('transport', e.target.value)} />
              </div>
              <div className="budget-edit-field">
                <label>الأنشطة (ريال)</label>
                <input type="number" value={localBudget.activities} onChange={(e) => handleEditChange('activities', e.target.value)} />
              </div>
              <div className="budget-edit-field" style={{ gridColumn: 'span 2' }}>
                <label>طعام، مقاهي وتسوق (ريال)</label>
                <input type="number" value={localBudget.food} onChange={(e) => handleEditChange('food', e.target.value)} />
              </div>
            </div>
            <button className="btn" style={{ background: 'var(--text-title)', color: '#FFFFFF', border: 'none', borderRadius: '10px', padding: '10px', fontWeight: 800, marginTop: '8px' }} onClick={handleSave}>
              حفظ الميزانية
            </button>
          </div>
        )}
      </div>
    </>
  );
}
