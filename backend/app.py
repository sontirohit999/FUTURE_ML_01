from flask import Flask, request, jsonify
from flask_cors import CORS

from predict import predict_sales

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return {
        "message": "Sales Forecasting API is Running"
    }

@app.route('/predict', methods=['POST'])
def predict():

    data = request.get_json()

    date = data['date']

    prediction = predict_sales(date)

    return jsonify({
        "predicted_sales": round(prediction, 2)
    })

if __name__ == '__main__':
    app.run(debug=True)