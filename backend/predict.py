import pandas as pd
import joblib

# Load trained model
model = joblib.load('model/sales_model.pkl')

def predict_sales(date):

    # Convert input date
    date = pd.to_datetime(date)

    # Create dataframe
    data = pd.DataFrame({
        'day': [date.day],
        'month': [date.month],
        'year': [date.year],
        'day_of_week': [date.dayofweek]
    })

    # Predict
    prediction = model.predict(data)

    return float(prediction[0])