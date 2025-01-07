import os
from dotenv import load_dotenv
import requests
from flask import Flask, jsonify, request
import time


load_dotenv() 

app = Flask(__name__)   

cached_token = None
token_expiration = 0 

client_id = os.getenv('CLIENT_ID')
client_secret = os.getenv('CLIENT_SECRET')
client_credentials = os.getenv('CLIENT_CREDENTIALS')

def get_access_token():
    global cached_token, token_expiration

    if cached_token and time.time() < token_expiration:
        return cached_token


    url = 'https://merchant-api.ifood.com.br/authentication/v1.0/oauth/token'
    headers = {'Content-Type': 'application/x-www-form-urlencoded'}
    data = {
        'grantType': 'client_credentials', 
        'clientId': client_id,              
        'clientSecret': client_secret 
    }
    #Visibilidade de requisição
    print(f"Requesting token with: {data}")
    response = requests.post(url, data=data, headers=headers)
    print(f"Response status: {response.status_code}")  
    print(f"Response body: {response.text}")

    if response.status_code == 200:
        cached_token = response.json()['access_token']
        token_expiration = time.time() + 10800  # 3 horas  
        return cached_token
    else:
        raise Exception('Failed to get access token')

@app.route('/financeiro/token', methods=['GET'])
def get_token():

    try:
        token = get_access_token()
        return jsonify({'access_token': token})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/financeiro/reconciliation/<string:merchant_id>', methods=['GET'])
def get_reconciliation(merchant_id):

    competence = request.args.get('competence')
    try:
        token = get_access_token()
        url = f'https://merchant-api.ifood.com.br/merchants/{merchant_id}/reconciliation?competence={competence}' 
        headers = {
            'Authorization': f'Bearer {token}',
            'Content-Type': 'application/json'
        }

        response = requests.get(url, headers=headers)
        print(f"Request URL: {url}")
        print(f"Response status: {response.status_code}")
        print(f"Response body: {response.text}")

        if response.status_code == 200:
            return jsonify(response.json())
        else:
            return jsonify({'error': 'Failed to fetch reconciliation', 'status_code': response.status_code, 'response': response.text}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/financeiro/settlements/<string:merchant_id>', methods=['GET'])
def get_settlements(merchant_id):

    try:
        token = get_access_token() 
        url = f'https://merchant-api.ifood.com.br/merchants/{merchant_id}/settlements' 
        headers = {
            'Authorization': f'Bearer {token}',
            'Content-Type': 'application/json'
        }
        

        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            return jsonify(response.json()) 
        else:
            return jsonify({'error': 'Failed to fetch settlements'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500
        

if __name__ == '__main__':
    app.run(debug=True)


@app.route('/')
def home():
    return "Bem-vindo à API do iFood!"

print(f'Client ID: {client_id}')
print(f'Client Secret: {client_secret}')