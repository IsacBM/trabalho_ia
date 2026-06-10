# 3. Base de Dados

## Origem dos dados
O conjunto de dados utilizado neste projeto é o **Ocular Disease Intelligent Recognition (ODIR-5K)**, disponibilizado publicamente no [Kaggle](https://www.kaggle.com/datasets/andrewmvd/ocular-disease-recognition-odir5k). Trata-se de um banco de dados oftalmológico estruturado, contendo fotografias de fundo de olho (*fundus photography*) coletadas de 5.000 pacientes em hospitais da China.

## Quantidade de amostras
O dataset original contém **10.000 imagens** (5.000 pacientes × 2 olhos). Para a tarefa de classificação, a distribuição por classe é a seguinte:

- **Normal (N)**: 2.873 imagens
- **Diabetes (D)**: 1.608 imagens
- **Others (O)**: 708 imagens
- **Catarata (C)**: 293 imagens
- **Glaucoma (G)**: 284 imagens
- **Degeneração Macular Relacionada à Idade (A)**: 266 imagens
- **Miopia Patológica (M)**: 232 imagens
- **Hipertensão (H)**: 128 imagens

## Tipo de dados
Imagens digitais coloridas (**RGB**) de fundo de olho, com resolução original elevada (geralmente superior a 2000×2000 pixels).

## Estratégia de coleta
Os dados foram coletados por profissionais de saúde em ambiente clínico real utilizando equipamentos de retinografia. Cada imagem possui anotações diagnósticas fornecidas por médicos oftalmologistas, configurando um problema originalmente **multi-label**.

## Estratégia de tratamento e Pré-processamento realizado
As imagens foram pré-processadas da seguinte forma para adequação ao modelo:

- **Redimensionamento (Resize)**: Todas as imagens foram redimensionadas para **224 × 224 × 3** pixels, conforme a entrada esperada pela arquitetura MobileNetV2.
- **Normalização**: Aplicada normalização dos valores dos pixels (padrão do Keras/TensorFlow para modelos pré-treinados no ImageNet).
- **Data Augmentation**: Técnicas de aumento de dados foram aplicadas durante o treinamento para melhorar a generalização do modelo.

O modelo final utiliza a arquitetura **MobileNetV2 (1.00_224)** como backbone, com as camadas convolucionais iniciais parcialmente congeladas (`trainable=False`) e as camadas finais liberadas para *fine-tuning*.

## Balanceamento
O dataset apresenta **forte desbalanceamento** de classes, com a classe “Normal” possuindo mais de 20 vezes mais amostras que a classe “Hipertensão”. Para mitigar esse problema, foi aplicado **data augmentation intensivo** nas classes minoritárias durante o processo de treinamento.

## Separação treino/teste/validação
Os dados foram divididos em conjuntos de treino e validação/teste, sendo **80% para treino** e **20% para validação/teste**.

## Tratamento de ruído ou inconsistências
- Utilização apenas das *labels* oficiais fornecidas pelos especialistas;
- Remoção ou filtragem de imagens de qualidade muito baixa quando identificadas;
- Tratamento do aspecto multi-label do dataset original (o modelo final foi configurado como classificação binária com saída `sigmoid` + `binary_crossentropy`).

## Limitações da base
- Forte desbalanceamento entre as classes;
- Viés geográfico (dados coletados predominantemente na China);
- Heterogeneidade na classe “Others”;
- Variação na qualidade das imagens conforme o equipamento de captura;
- Ausência de metadados clínicos completos (idade disponível, mas outros dados limitados).