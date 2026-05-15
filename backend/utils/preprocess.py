import pandas as pd

def preprocess_data(df):

    # Convert Date column into datetime
    df['Date'] = pd.to_datetime(df['Date'])

    # Create time-based features
    df['day'] = df['Date'].dt.day
    df['month'] = df['Date'].dt.month
    df['year'] = df['Date'].dt.year
    df['day_of_week'] = df['Date'].dt.dayofweek

    return df