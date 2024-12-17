from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
import traceback

app = Flask(__name__)
CORS(app)

GEMINI_API_KEY = "AIzaSyBKaty_AHxulY5w0mKeWj6wvWkAx25Ita0"
GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent"

@app.route('/gemini', methods=['POST'])
def gemini_api():
    try:
        data = request.get_json()
        user_input = data.get("prompt")

        if not user_input:
            return jsonify({"error": "Prompt is required"}), 400

        request_data = {
            "contents": [{"parts": [{"text": user_input}]}]
        }

        print(f"Enviando para a API: {request_data}")

        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {GEMINI_API_KEY}"
        }

        response = requests.post(
            GEMINI_API_URL,
            headers=headers,
            json=request_data
        )

        # Log da resposta da API
        print(f"Status Code: {response.status_code}")
        print(f"Resposta da API: {response.text}")

        if response.status_code != 200:
            error_details = response.json()
            return jsonify({
                "error": "Failed to fetch response from Gemini API",
                "details": error_details
            }), 500

        gemini_response = response.json()
        text_response = gemini_response.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "")

        return jsonify({"response": text_response})

    except Exception as e:
        print("Erro no endpoint /gemini:")
        traceback.print_exc()

        return jsonify({
            "error": "An error occurred",
            "details": str(e)
        }), 500

if __name__ == '__main__':
    if GEMINI_API_KEY is None:
        print("Erro: A chave da API Gemini não foi configurada.")
    else:
        app.run(debug=True)