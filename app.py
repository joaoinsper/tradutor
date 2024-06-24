from flask import Flask, render_template, request
from openai import OpenAI
from dotenv import load_dotenv, find_dotenv
import os
from pymongo import MongoClient

load_dotenv(find_dotenv())
deployment_name = os.environ['COMPLETIONS_MODEL']

# The API key for your Azure OpenAI resource.
api_key = os.environ["AZURE_OPENAI_API_KEY"]

# The base URL for your Azure OpenAI resource. e.g. "https://<your resource name>.openai.azure.com"
azure_endpoint = os.environ['AZURE_OPENAI_ENDPOINT']

# Currently OPENAI API have the following versions available: 2022-12-01
api_version = os.environ['OPENAI_API_VERSION']

client = AzureOpenAI(
  api_key=api_key,  
  azure_endpoint=azure_endpoint,
  api_version=api_version
)
uri = os.getenv('MONGODB_URI')
db = MongoClient(uri, ssl=True, tlsAllowInvalidCertificates=True)['mjd_2024']

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/tradutor', methods=['POST'])
def tradutor():
    dicionario = db.joao_tradutor
    palavras = [x for x in dicionario.find()]
    dicionario_final = {}
    for termo in palavras:
        dicionario_final[termo['termo_portugues']] = termo['traducao']

    texto = request.form.get('texto_a_traduzir')
    response = client.chat.completions.create(
        model="gpt-4-turbo",
        messages=[
            {"role": "system", "content": f"Traduza o seguinte texto para inglês, mas considere o valor do\
            dicionário {dicionario_final} como tradução para as palavras que estiverem nas chaves desse mesmo dicionário. Não faça nenhum tipo de interação com o usuário.\
            Apenas traduza o texto que ele inserir."},
            {"role": "user", "content": texto}
        ],
        temperature=0.6,
        top_p=1
    )
    return response.choices[0].message.content
    
