import json
import re
import numpy as np
from flask_cors import CORS, cross_origin
from sentence_transformers import SentenceTransformer
from flask import request, jsonify,Flask
from werkzeug.exceptions import HTTPException
sbert_model = SentenceTransformer('bert-base-nli-mean-tokens')
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

def cosine(u, v):
    return np.dot(u, v) / (np.linalg.norm(u) * np.linalg.norm(v))

def removeSpecialCharacters(text):
    text=text.lower();
    # initializing special characters
    special_char = '@_!#$%^&*()<>?/\|}{~:;[]'
    # using replace () to remove special characters
    for i in special_char:
        text = text.replace(i, '')
    return text;


def exactMatch(inputText,expectedText):
    inputText=removeSpecialCharacters(inputText);
    expectedText=removeSpecialCharacters(expectedText);
    ExpectedLineDict={}
    LineIdentifiedDict={}
    wordsThatDoNotMatchDict=set()
    lineIdentifiedWords=inputText.split(" ")
    expectedLineWords=expectedText.split(" ")
    for word in lineIdentifiedWords:
        if word not in LineIdentifiedDict:
            LineIdentifiedDict[word]=1
        else:
            LineIdentifiedDict[word]+=1
    for word in expectedLineWords:
        if word not in ExpectedLineDict:
            ExpectedLineDict[word] = 1
        else:
            ExpectedLineDict[word] += 1
    if len(ExpectedLineDict)<len(LineIdentifiedDict):
        minDict=ExpectedLineDict
        maxDict=LineIdentifiedDict
    else:
        minDict=LineIdentifiedDict
        maxDict=ExpectedLineDict

    for word in maxDict:
        if word in minDict:
            minDict[word]-=1
        else:
            wordsThatDoNotMatchDict.add(word)

    for word in minDict:
        if minDict[word]!=0:
            wordsThatDoNotMatchDict.add(word)
    return str(100-(len (wordsThatDoNotMatchDict)/(len(expectedLineWords)+len(lineIdentifiedWords))*100))

def similarMatch(inputText,expectedText):
    sentence_emb=sbert_model.encode(expectedText)
    query=inputText
    query_vec=sbert_model.encode([query])[0]
    sim=cosine(query_vec,sentence_emb)
    return sim*100

@app.errorhandler(HTTPException)
def handleException(e):
    response = e.get_response()
    response.data = json.dumps({
        "code": e.code,
        "name": e.name,
        "description": e.description,
    })
    response.content_type = "application/json"
    return response

@app.route('/compare',methods=['GET'])
@cross_origin()

def compareTexts():
    compareResults={}
    if 'inputText' in request.args and 'expectedText' in request.args:
        compareResults['exactScore']=exactMatch(request.args['inputText'],request.args['expectedText'])
        compareResults['similarityScore']=similarMatch(request.args['inputText'],request.args['expectedText'])
        response={
            "statusCode": "200",
            "statusMessage": "SUCCESS",
            "exactScore": compareResults['exactScore'],
            "similarityScore": str(compareResults['similarityScore'])
        }
        return jsonify (response)

    else:
        return "error"


if __name__ == '__main__':
    app.run(host= '0.0.0.0',port=12345)
