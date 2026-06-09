import requests
import os

URL = 'http://127.0.0.1:8000/api/diagnostico/'

pasta_imagens = 'preprocessed_images'
primeira_imagem = os.listdir(pasta_imagens)[1]
caminho_imagem = os.path.join(pasta_imagens, primeira_imagem)

print(f"Enviando a imagem {primeira_imagem}...")

with open(caminho_imagem, 'rb') as arquivo_imagem:
    payload = {'imagem': arquivo_imagem}
    resposta = requests.post(URL, files=payload)

print("\nResultado")
print(resposta.json())
