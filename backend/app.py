from flask import Flask, request, send_file
from flask_cors import CORS  # Habilita CORS
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import io
import traceback  # Para exibir erros detalhados

app = Flask(__name__)
CORS(app)  # Habilita CORS para todas as rotas

# Rota para upload de arquivo
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return 'No file part', 400  # Erro caso nenhum arquivo seja enviado
    
    file = request.files['file']
    if file.filename == '':
        return 'No selected file', 400  # Erro caso nenhum arquivo seja selecionado
    
    try:
        # Log básico do arquivo recebido
        print("Recebendo arquivo:", file.filename)
        
        # Carregar o arquivo Excel usando Pandas
        df = pd.read_excel(file)
        
        # Log dos dados recebidos
        print("Estrutura do DataFrame:")
        print(df.head())
        print(df.info())
        
        # Gerar um gráfico (ajustado para colunas numéricas)
        plt.figure(figsize=(10, 6))
        sns.set(style="darkgrid")
        sns.lineplot(data=df)  # Adapte conforme a estrutura do Excel
        
        # Salvar o gráfico em um objeto de memória
        img = io.BytesIO()
        plt.savefig(img, format='png')
        img.seek(0)
        
        # Retornar o gráfico como resposta
        return send_file(img, mimetype='image/png')
    
    except Exception as e:
        # Log detalhado do erro
        print("Erro no processamento do arquivo:")
        traceback.print_exc()
        return f'Error processing file: {str(e)}', 500

if __name__ == '__main__':
    app.run(debug=True)
