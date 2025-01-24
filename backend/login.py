import mysql.connector
from mysql.connector import Error

# Configurações de conexão
host = "localhost"
user = "root"
password = ""  # Adicione a senha do seu MySQL se necessário
database = "teste_login"

try:
    # Estabelece a conexão com o banco de dados
    connection = mysql.connector.connect(
        host=host,
        user=user,
        password=password,
        database=database
    )

    if connection.is_connected():
        print("Conexão bem-sucedida ao banco de dados")

except Error as e:
    print("Erro ao conectar ao MySQL", e)

finally:
    if connection.is_connected():
        connection.close()
        print("Conexão fechada")

# Função para realizar o login
def login(email, senha):
    try:
        # Estabelece a conexão novamente para a execução do login
        connection = mysql.connector.connect(
            host=host,
            user=user,
            password=password,
            database=database
        )

        if connection.is_connected():
            cursor = connection.cursor()

            # Consulta SQL para verificar o login
            query = "SELECT * FROM login WHERE email = %s AND senha = %s"
            cursor.execute(query, (email, senha))

            # Verifica se encontrou um usuário
            result = cursor.fetchone()
            if result:
                print("Login bem-sucedido!")
            else:
                print("Email ou senha incorretos.")

    except Error as e:
        print("Erro ao conectar ao MySQL", e)

    finally:
        if connection.is_connected():
            connection.close()


login("usuario@example.com", "senha123")
