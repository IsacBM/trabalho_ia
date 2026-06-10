# 4. Modelagem em Deep Learning

## Arquitetura escolhida
Foi escolhida a arquitetura **MobileNetV2** (versão 1.00_224) como *backbone* convolucional, combinada com um classificador customizado no topo. A MobileNetV2 é uma rede neural convolucional eficiente, projetada para aplicações com recursos limitados, utilizando blocos de **inverted residual** com **depthwise separable convolutions**.

## Justificativa técnica da escolha
A escolha da MobileNetV2 se justifica pelos seguintes motivos:

- **Eficiência computacional**: Possui menor número de parâmetros e operações (FLOPs) em comparação com arquiteturas mais pesadas (ex: ResNet50, VGG), sendo adequada para treinamento e inferência em ambientes com restrições de hardware.
- **Desempenho em imagens médicas**: Arquitetura comprovadamente eficaz em tarefas de visão computacional com imagens de fundo de olho (*fundus*), especialmente quando combinada com Transfer Learning.
- **Transfer Learning**: O modelo base foi pré-treinado no ImageNet, permitindo o aproveitamento de *features* genéricas de baixo nível (bordas, texturas) e acelerando a convergência.
- **Flexibilidade**: Permite congelar as camadas iniciais e realizar *fine-tuning* apenas nas camadas finais, equilibrando retenção de conhecimento prévio e adaptação ao domínio oftalmológico.

## Tipo de rede utilizada
- **Backbone**: MobileNetV2 (Functional model) com `input shape` (224, 224, 3).
- **Camadas iniciais**: Congeladas (`trainable=False`) para preservar *features* pré-treinadas.
- **Camadas finais do backbone**: Liberadas para *fine-tuning* (`trainable=True`).
- **Classificador customizado**:
  - Global Average Pooling 2D
  - Dense(512, ReLU) + Batch Normalization + Dropout(0.5)
  - Dense(256, ReLU) + Batch Normalization + Dropout(0.3)
  - Dense(1, Sigmoid)

Trata-se de uma **rede híbrida** baseada em Transfer Learning com fine-tuning.

## Funções de ativação
- **ReLU6** — utilizada internamente nas camadas da MobileNetV2.
- **ReLU** — nas camadas Dense do classificador.
- **Sigmoid** — na camada de saída, adequada para classificação binária.

## Função de perda
**Binary Crossentropy** — escolhida por ser o padrão para problemas de classificação binária com saída sigmoid.

## Otimizador
**Adam** com taxa de aprendizado (`learning_rate`) de **3.999999989900971e-06** (aproximadamente **4 × 10⁻⁶**). Este valor baixo é adequado para *fine-tuning*, evitando a destruição dos pesos pré-treinados.

## Métricas de avaliação
- **Accuracy** (principal métrica utilizada durante o treinamento e compilação do modelo).

## Estratégias contra overfitting
Foram aplicadas as seguintes técnicas:

- **Dropout**: Taxa de 0.5 após a primeira camada Dense e 0.3 após a segunda.
- **Batch Normalization**: Aplicada após cada camada Dense para estabilizar o treinamento e reduzir o risco de overfitting.
- **Congelamento parcial** das camadas iniciais da MobileNetV2.
- **Data Augmentation** (aplicado durante o treinamento).
- **Taxa de aprendizado muito baixa** no fine-tuning.

## Processo de treinamento
O modelo foi compilado com o otimizador Adam e função de perda Binary Crossentropy. O treinamento foi realizado utilizando o framework **Keras** (versão 3.13.2). As camadas do backbone MobileNetV2 tiveram treinamento diferencial: as primeiras camadas permaneceram congeladas, enquanto as camadas mais profundas e o classificador customizado foram treinados.
