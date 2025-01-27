from flask import Flask, request, jsonify
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)

# Configurações do banco de dados
host = "localhost"
user = "root"
password = "Twelve3313@"
database = "teste_login"

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    senha = data.get("password")

    try:
        connection = mysql.connector.connect(
            host=host,
            user=user,
            password=password,
            database=database
        )

        if connection.is_connected():
            cursor = connection.cursor(dictionary=True)
            query = "SELECT * FROM login WHERE email = %s AND senha = %s"
            cursor.execute(query, (email, senha))
            result = cursor.fetchone()

            if result:
                return jsonify({"message": "Login bem-sucedido!"}), 200
            else:
                return jsonify({"error": "Credenciais inválidas"}), 401

    except Error as e:
        return jsonify({"error": str(e)}), 500

    finally:
        if connection.is_connected():
            connection.close()

# Inicializar o Flask
if __name__ == "__main__":
    app.run(debug=True)
