import os
from dotenv import load_dotenv
import requests
from flask import Flask, jsonify, request
import time

load_dotenv()

app = Flask(__name__)

client_id = os.getenv('CLIENT_ID')
client_secret = os.getenv('CLIENT_SECRET')


def get_access_token():
    url = 'https://merchant-api.ifood.com.br/authentication/v1.0/oauth/token'
    headers = {'Content-Type': 'application/x-www-form-urlencoded'}
    data = {
        'grantType': 'client_credentials',
        'clientId': client_id,
        'clientSecret': client_secret
    }

    print(f"Enviando requisição para {url} com os seguintes dados: {data}")
    start_time = time.time()
    response = requests.post(url, data=data, headers=headers)
    duration = time.time() - start_time

    print(f"Status da resposta: {response.status_code}")
    print(f"Corpo da resposta: {response.text}")

    if response.status_code == 200:
        token = response.json().get('accessToken')
        if not token:
            raise Exception("Nenhum token foi retornado pela API.")
        print("Token obtido com sucesso.")
        return token
    else:
        raise Exception(f"Falha ao obter token. Status: {response.status_code}, Resposta: {response.text}")


@app.route('/financeiro/token', methods=['GET'])
def get_token():
    try:
        print("Iniciando a requisição para obter o token...")
        token = get_access_token()
        print("Token obtido com sucesso!")
        return jsonify({'access_token': token})
    except Exception as e:
        print(f"Erro ao obter token: {e}")
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
        
        # Timeout de 10 segundos na requisição
        response = requests.get(url, headers=headers, timeout=10)
        
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
        
        # Timeout de 10 segundos na requisição
        response = requests.get(url, headers=headers, timeout=10)
        
        if response.status_code == 200:
            return jsonify(response.json())
        else:
            return jsonify({'error': 'Failed to fetch settlements', 'status_code': response.status_code, 'response': response.text}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/')
def home():
    return "Bem-vindo à API do iFood!"


if __name__ == '__main__':
    app.run(debug=True)
