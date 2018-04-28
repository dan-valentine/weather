import React from 'react';

export default function ForecastDisplay({ forecast }) {
    return (
        <div>
            <h4>{forecast.date.weekday}</h4>
            <p>{forecast.conditions}</p>
            <div>
                <p>High: {forecast.high.fahrenheit}</p>
                <p>Low: {forecast.low.fahrenheit}</p>
            </div>
            <img alt={forecast.icon} src={forecast.icon_url} />
        </div>
    )
}