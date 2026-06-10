## 2. Objetivo

Desenvolver um modelo de **Deep Learning** para triagem automatizada de catarata a partir de imagens de fundo de olho, integrado a uma aplicação de apoio à decisão para médicos oftalmologistas, visando reduzir o tempo de detecção e priorizar pacientes em regiões com acesso limitado a equipamentos de diagnóstico no Brasil.

### Objetivos específicos

- Utilizar um banco de dados de imagens de fundo de olho, contendo exames classificados como "catarata" (em diferentes graus de opacificação do cristalino) e "sem catarata", representando a diversidade populacional brasileira.
- Implementar e treinar uma arquitetura de aprendizado profundo para classificar a presença de catarata nas imagens, otimizando hiperparâmetros para maximizar a **sensibilidade** (priorizando a não perda de casos).
- Avaliar o modelo em um conjunto de teste independente, calculando acurácia, sensibilidade, especificidade, valores preditivos positivo e negativo, além da área sob a curva ROC (AUC).
- Construir um protótipo de aplicação (web) que receba uma imagem de fundo de olho, retorne a classificação do modelo ("catarata provável" ou "sem catarata") e apresente o nível de confiança.
- Estimar o potencial de redução de encaminhamentos desnecessários em um cenário simulado de atenção primária.