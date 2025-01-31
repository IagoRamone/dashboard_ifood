import os  # Para acessar variáveis de ambiente
from dotenv import load_dotenv  # Para carregar variáveis de ambiente do arquivo .env
import requests  # Para fazer requisições HTTP
from flask import Flask, jsonify, request  # Framework Flask para criar a API
import time  # Para medir o tempo de execução das requisições

# Carrega as variáveis de ambiente do arquivo .env
load_dotenv()

# Inicializa o Flask
app = Flask(__name__)

# Obtém as credenciais do ambiente
client_id = os.getenv('CLIENT_ID')
client_secret = os.getenv('CLIENT_SECRET')


def get_access_token():
    """
    Função responsável por obter o token de acesso da API do iFood.
    Faz uma requisição para a API de autenticação e retorna o token se a requisição for bem-sucedida.
    """
    url = 'https://merchant-api.ifood.com.br/authentication/v1.0/oauth/token'  # URL de autenticação
    headers = {'Content-Type': 'application/x-www-form-urlencoded'}  # Cabeçalhos HTTP
    data = {
        'grantType': 'client_credentials',  # Tipo de autenticação
        'clientId': client_id,  # ID do cliente
        'clientSecret': client_secret  # Segredo do cliente
    }

    print(f"Enviando requisição para {url} com os seguintes dados: {data}")
    
    # Mede o tempo da requisição
    start_time = time.time()
    response = requests.post(url, data=data, headers=headers)
    duration = time.time() - start_time

    print(f"Status da resposta: {response.status_code}")
    print(f"Corpo da resposta: {response.text}")

    # Se a requisição for bem-sucedida (código 200), extrai o token
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
    """
    Endpoint que retorna o token de acesso da API do iFood.
    """
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
    """
    Endpoint para obter dados de reconciliação financeira de um merchant (loja).
    """
    competence = request.args.get('competence')  # Obtém o parâmetro "competence" da URL

    try:
        token = get_access_token()  # Obtém o token de acesso

        # Monta a URL para buscar os dados de reconciliação
        url = f'https://merchant-api.ifood.com.br/merchants/{merchant_id}/reconciliation?competence={competence}'
        headers = {
            'Authorization': f'Bearer {token}',  # Adiciona o token no cabeçalho
            'Content-Type': 'application/json'
        }

        # Faz a requisição com um timeout de 10 segundos
        response = requests.get(url, headers=headers, timeout=10)

        # Retorna os dados se a resposta for bem-sucedida
        if response.status_code == 200:
            return jsonify(response.json())
        else:
            return jsonify({
                'error': 'Failed to fetch reconciliation',
                'status_code': response.status_code,
                'response': response.text
            }), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/financeiro/settlements/<string:merchant_id>', methods=['GET'])
def get_settlements(merchant_id):
    """
    Endpoint para obter dados de pagamentos (settlements) de um merchant (loja).
    """
    try:
        token = get_access_token()  # Obtém o token de acesso

        # Monta a URL para buscar os dados de settlements
        url = f'https://merchant-api.ifood.com.br/merchants/{merchant_id}/settlements'
        headers = {
            'Authorization': f'Bearer {token}',  # Adiciona o token no cabeçalho
            'Content-Type': 'application/json'
        }

        # Faz a requisição com um timeout de 10 segundos
        response = requests.get(url, headers=headers, timeout=10)

        # Retorna os dados se a resposta for bem-sucedida
        if response.status_code == 200:
            return jsonify(response.json())
        else:
            return jsonify({
                'error': 'Failed to fetch settlements',
                'status_code': response.status_code,
                'response': response.text
            }), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/')
def home():
    """
    Rota principal da API.
    Apenas retorna uma mensagem de boas-vindas.
    """
    return "Bem-vindo à API do iFood!"


if __name__ == '__main__':
    # Inicia a API em modo debug
    app.run(debug=True)
