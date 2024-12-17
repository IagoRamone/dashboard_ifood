from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import io
import traceback
import numpy as np
from scipy.stats import norm

app = Flask(__name__)
CORS(app)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return 'No file part', 400

    file = request.files['file']
    if file.filename == '':
        return 'No selected file', 400

    try:
        print("Recebendo arquivo:", file.filename)
        df = pd.read_excel(file)

        # Limpeza básica dos dados
        df = df.dropna(how='all', axis=1).dropna(how='all', axis=0).fillna("Não informado")
        
        print("Estrutura do DataFrame pós-limpeza:")
        print(df.head())
        
        # Configuração de estilo
        sns.set(style="whitegrid")

        # Lista para armazenar os gráficos
        plots = []

        # Gráfico 1: Histogramas com curva normal para colunas numéricas
        for col in df.select_dtypes(include=[np.number]).columns:
            img = io.BytesIO()
            plt.figure(figsize=(10, 6))
            sns.histplot(df[col], bins=30, kde=True, color='blue', stat="density")

            # Adiciona curva normal
            mean, std = df[col].mean(), df[col].std()
            x = np.linspace(df[col].min(), df[col].max(), 100)
            plt.plot(x, norm.pdf(x, mean, std), color='red', lw=2, label="Curva Normal")
            plt.title(f"Histograma e Curva Normal - {col}")
            plt.legend()

            plt.tight_layout()
            plt.savefig(img, format='png')
            img.seek(0)
            plots.append(img)

        # Gráfico 2: Gráfico de barras somando valores numéricos por categoria
        cat_cols = df.select_dtypes(include=['object']).columns
        num_cols = df.select_dtypes(include=[np.number]).columns

        if len(cat_cols) > 0 and len(num_cols) > 0:
            img = io.BytesIO()
            plt.figure(figsize=(12, 6))
            sns.barplot(x=cat_cols[0], y=num_cols[0], data=df, estimator=sum, ci=None, palette="viridis")
            plt.title(f"Soma de {num_cols[0]} por {cat_cols[0]}")
            plt.xticks(rotation=45)

            plt.tight_layout()
            plt.savefig(img, format='png')
            img.seek(0)
            plots.append(img)

        # Gráfico 3: Gráfico de barras horizontal com contagem de categorias
        for col in cat_cols:
            img = io.BytesIO()
            plt.figure(figsize=(12, 6))
            df[col].value_counts().plot(kind='barh', color='skyblue')
            plt.title(f"Contagem de Categorias - {col}")

            plt.tight_layout()
            plt.savefig(img, format='png')
            img.seek(0)
            plots.append(img)

            # Gráfico 4: Gráfico de barras vertical com os top 5 valores
            img = io.BytesIO()
            plt.figure(figsize=(10, 6))
            df[col].value_counts().head(5).plot(kind='bar', color='lightcoral')
            plt.title(f"Top 5 Categorias - {col}")
            plt.xticks(rotation=45)

            plt.tight_layout()
            plt.savefig(img, format='png')
            img.seek(0)
            plots.append(img)

        # Gráfico 5: Scatter plot para duas colunas numéricas (se existirem)
        if len(num_cols) >= 2:
            img = io.BytesIO()
            plt.figure(figsize=(10, 6))
            sns.scatterplot(x=num_cols[0], y=num_cols[1], data=df, color='purple')
            plt.title(f"Scatter Plot - {num_cols[0]} vs {num_cols[1]}")

            plt.tight_layout()
            plt.savefig(img, format='png')
            img.seek(0)
            plots.append(img)

        # Retornar os gráficos como resposta JSON (base64)
        result = []
        for img in plots:
            img.seek(0)
            result.append(img.read())

        return jsonify({"graphs": [g.decode('latin1') for g in result]})

    except Exception as e:
        print("Erro no processamento do arquivo:")
        traceback.print_exc()
        return f'Error processing file: {str(e)}', 500


if __name__ == '__main__':
    app.run(debug=True)
