from flask import Flask, request, jsonify, json
from flask_cors import CORS
from waitress import serve

import dataJson
import logging
import os


app = Flask(__name__)
CORS(app)

logging.basicConfig()
logging.getLogger().setLevel(logging.CRITICAL)


@app.route('/buscar/<video>')
def buscar(video):
  res = jsonify(dataJson.searchTitleApi('Serie', 'Anime', video))
  return res

@app.route('/getInfo/<id>')
def getInfo(id):
  res = jsonify(dataJson.searchInfoForIdApi('Serie', 'Anime', id))
  return res

@app.route('/getFilesharing/<id>/<cap>/<language>')
def getFilesharing(id, cap, language):
  res = jsonify(dataJson.getFilesharingByLanguageApi(id, cap, language))
  return res

@app.route('/getGeneroByIdApi/<id>')
def getGeneroByIdApi(id):
  res = jsonify(dataJson.getGeneroByIdApi(id))
  return res

@app.route('/getGeneroByTypeClassApi/<clase>/<tipo>')
def getGeneroByClassApi(clase, tipo):
  res = jsonify(dataJson.getGeneroByTypeClassApi(clase, tipo))
  return res

@app.route('/getVideoByTypeClassApi/<tipo>/<clase>/<start>/<end>/<reverse>')
@app.route('/getVideoByTypeClassApi/<tipo>/<clase>/<start>/<end>')
def getVideoByTypeClassApi(tipo, clase, start, end, reverse=False):
  res = jsonify(dataJson.getVideoByTypeClassApi(tipo, clase, start, end, reverse))
  return res

@app.route('/getVideoByTypeClassGenreApi/<tipo>/<clase>/<genero>/<start>/<end>')
def getVideoByTypeClassGenreApi(tipo, clase, genero, start, end):
  res = jsonify(dataJson.getVideoByTypeClassGenreApi(tipo, clase, genero, start, end))
  return res

@app.route('/getVideoByTypeClassLanguageApi/<tipo>/<clase>/<idioma>/<start>/<end>')
def getVideoByTypeClassLanguageApi(tipo, clase, idioma, start, end):
  res = jsonify(dataJson.getVideoByTypeClassLanguageApi(tipo, clase, idioma, start, end))
  return res

@app.route('/getTypesByClass/<clase>')
def getTypesByClass(clase):
  res = jsonify(dataJson.getTypesByClass(clase))
  return res

@app.route('/getLanguagesByTypeClass/<clase>/<tipo>')
def getLanguagesByTypeClass(clase, tipo):
  res = jsonify(dataJson.getLanguagesByTypeClass(clase, tipo))
  return res

@app.route('/search/<dato>/<tipo>/<clase>/<start>/<end>')
def searchData(dato, tipo, clase, start, end):
  res = jsonify(dataJson.searchData(dato, tipo, clase, start, end))
  return res

@app.route('/capExists/<id>/<cap>')
def capExists(id, cap):
  res = jsonify(dataJson.existsEpisodeApi(id, cap))
  return res

@app.route('/getEpisodesApi/<id>')
def getEpisodesApi(id):
  res = jsonify(dataJson.getEpisodesApi(id))
  return res

if __name__ == '__main__':
  serve(app, host='0.0.0.0', port=5000, _quiet=True)
