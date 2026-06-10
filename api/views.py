from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import render
import numpy as np
import tensorflow as tf
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input
from PIL import Image
import os

<<<<<<< HEAD
CAMINHO_MODELO = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'modelo_catarata_mobilenetv2_final.keras')
modelo = tf.keras.models.load_model(CAMINHO_MODELO)

def painel_zoiudo(request):
    return render(request, 'api/painel.html')
=======
modelo_keras = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'modelo_catarata_mobilenetv2_final.keras')
modelo = tf.keras.models.load_model(modelo_keras)
>>>>>>> 8cff3ea413ce4a304f2d664eaeaec361566c2ef6

@api_view(['POST'])
def analisar_olho(request):
    if 'imagem' not in request.FILES:
<<<<<<< HEAD
        return Response({'erro': 'Nenhuma imagem foi enviada.'}, status=400)
=======
        return Response({'erro': 'Nenhuma imagem enviada'}, status=400)
>>>>>>> 8cff3ea413ce4a304f2d664eaeaec361566c2ef6

    imagem_file = request.FILES['imagem']

    try:
        img = Image.open(imagem_file).convert('RGB')
        img = img.resize((224, 224))
        img_array = np.array(img, dtype=np.float32)
        processed_img = preprocess_input(img_array)
        processed_img = np.expand_dims(processed_img, axis=0)
        probabilidades = modelo.predict(processed_img)
        probabilidade = float(probabilidades[0][0])
        if probabilidade > 0.5:
            diagnostico = "Normal"
            confianca = probabilidade
        else:
            diagnostico = "Catarata"
            confianca = 1.0 - probabilidade

        return Response({
            'status': 'sucesso',
            'diagnostico': diagnostico,
            'confianca': f"{confianca * 100:.2f}%"
        })

    except Exception as e:
        return Response({'erro': str(e)}, status=500)

def painel_zoiudo(request):
    return render(request, 'api/painel.html')
