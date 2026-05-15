import pandas as pd
import joblib

from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error

from utils.preprocess import preprocess_data

# Load dataset
df = pd.read_csv('dataset/sales.csv')

# Preprocess dataset
df = preprocess_data(df)

# Features
X = df[['day', 'month', 'year', 'day_of_week']]

# Target
y = df['Sales']

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# Create model
model = LinearRegression()

# Train model
model.fit(X_train, y_train)

# Predict
predictions = model.predict(X_test)

# Evaluate
mae = mean_absolute_error(y_test, predictions)

print("Mean Absolute Error:", mae)

# Save model
joblib.dump(model, 'model/sales_model.pkl')

print("Model saved successfully!")