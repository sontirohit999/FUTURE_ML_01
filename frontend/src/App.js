import React, { useState } from 'react';
import './App.css';

function App() {
  const [date, setDate] = useState('');
  const [prediction, setPrediction] = useState('');
  const [loading, setLoading] = useState(false);
  const [animateResult, setAnimateResult] = useState(false);

  const predictSales = async () => {
    if (!date) return;
    setLoading(true);
    setAnimateResult(false);

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date })
      });
      const data = await response.json();
      setPrediction(data.predicted_sales);
      setTimeout(() => setAnimateResult(true), 50);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (d) => {
    if (!d) return null;
    const obj = new Date(d);
    return obj.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div className="app-bg">
      <div className="grid-overlay" />

      <div className="card">
        <div className="card-header">
          <div className="icon-ring">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </div>
          <div>
            <p className="label-tag">AI-Powered</p>
            <h1 className="title">Sales Forecast</h1>
          </div>
        </div>

        <div className="divider" />

        <div className="section">
          <label className="field-label">Select Forecast Date</label>
          <div className="input-wrapper">
            <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            <input
              type="date"
              value={date}
              onChange={(e) => { setDate(e.target.value); setPrediction(''); setAnimateResult(false); }}
              className="date-input"
            />
          </div>
          {date && <p className="date-hint">{formatDate(date)}</p>}
        </div>

        <button
          className={`predict-btn ${loading ? 'loading' : ''} ${!date ? 'disabled' : ''}`}
          onClick={predictSales}
          disabled={!date || loading}
        >
          {loading ? (
            <span className="btn-content">
              <span className="spinner" />
              Forecasting…
            </span>
          ) : (
            <span className="btn-content">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
              Generate Forecast
            </span>
          )}
        </button>

        {prediction && (
          <div className={`result-card ${animateResult ? 'visible' : ''}`}>
            <div className="result-top">
              <span className="result-label">Predicted Revenue</span>
              <span className="result-badge">+Forecast</span>
            </div>
            <div className="result-amount">
              <span className="currency">₹</span>
              <span className="amount">{Number(prediction).toLocaleString('en-IN')}</span>
            </div>
            <p className="result-sub">Estimate for {formatDate(date)}</p>
            <div className="result-bar">
              <div className="result-bar-fill" />
            </div>
          </div>
        )}

        <p className="footer-note">Predictions are AI-generated estimates and may vary.</p>
      </div>
    </div>
  );
}

export default App;