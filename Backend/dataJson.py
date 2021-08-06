import html
import json
import os


def getFilesharingByLanguageApi(id, cap, language):
  if os.path.isfile('./data.json'):
    f = open('data.json')
    data = json.load(f)
    f.close()
    return data[id]['Enlaces'][cap][language]
  return ''

def searchTitleApi(tipo, clase, titulo):
  if os.path.isfile('./data.json'):
    f = open('data.json')
    data = json.load(f)
    f.close()
    for dat in data.keys():
      if titulo.lower() in data[dat]['Titulo'].lower():
        if data[dat]['Tipo'].lower() == tipo.lower():
          if data[dat]['Clase'].lower() == clase.lower():
            return data[dat]
  return ''

def searchInfoForIdApi(tipo, clase, id):
  if os.path.isfile('./data.json'):
    f = open('data.json')
    data = json.load(f)
    f.close()
    data[id]['Titulo'] = html.unescape(data[id]['Titulo'])
    data[id]['Idioma'] = data[id]['Idioma'].split('/')
    return data[id]
  return ''

def existsFilesharing(tipo, clase, titulo, filesharing, idioma, capitulo):
  if os.path.isfile('./data.json'):
    f = open('data.json')
    data = json.load(f)
    f.close()
    for dat in data.keys():
      if data[dat]['Titulo'].lower() == titulo.lower():
        if filesharing in data[dat]['Enlaces'][capitulo][idioma].keys():
          return True
  return False

def getCountEpisode(clase, tipo, titulo, countEpisode, data):
  for dat in data.keys():
    if data[dat]['Clase'].lower() == clase.lower():
      if data[dat]['Tipo'].lower() == tipo.lower():
        if titulo.lower() == data[dat]['Titulo'].lower():
          if countEpisode == data[dat]['Capitulos']:
            return True
  return False

def updateCountEpisode(index, cantidadCapitulos, data):
  data[index]['Capitulos'] = cantidadCapitulos
  return data

def getGeneroByIdApi(id):
  listaGenero = []
  f = open('data.json')
  data = json.load(f)
  f.close()
  clase = data[id]['Clase']
  tipo = data[id]['Tipo']
  for dat in data.keys():
    if data[dat]['Clase'].lower() == clase.lower():
      if data[dat]['Tipo'].lower() == tipo.lower():
        for gen in data[dat]['Genero']:
          listaGenero.append(gen)
  listaGenero = list(dict.fromkeys(listaGenero))
  listaGenero.sort()
  return listaGenero

def getGeneroByTypeClassApi(clase, tipo):
  listaGenero = []
  f = open('data.json')
  data = json.load(f)
  f.close()
  for dat in data.keys():
    if data[dat]['Clase'].lower() == clase.lower():
      if data[dat]['Tipo'].lower() == tipo.lower():
        for gen in data[dat]['Genero']:
          listaGenero.append(gen)
  listaGenero = list(dict.fromkeys(listaGenero))
  listaGenero.sort()
  return listaGenero

def existsEpisodeApi(id, capitulo):
  if os.path.isfile('./data.json'):
    f = open('data.json')
    data = json.load(f)
    f.close()
    if capitulo in data[id]['Enlaces'].keys():
      return True
  return False

def getEpisodesApi(id):
  if os.path.isfile('./data.json'):
    episodes = []
    f = open('data.json')
    data = json.load(f)
    f.close()
    for cap in data[id]['Enlaces'].keys():
      episodes.append(int(cap))
    episodes = list(dict.fromkeys(episodes))
    episodes.sort()
    return episodes
  return ''

def getVideoByTypeClassApi(tipo, clase, start, end, reverse):
  lista = []
  f = open('data.json', 'r', encoding='utf-8')
  data = json.load(f)
  f.close()
  for dat in data.keys():
    if data[dat]['Clase'].lower() == clase.lower():
      if data[dat]['Tipo'].lower() == tipo.lower():
        lista.append(
          {
            'Id': data[dat]['Id'], 
            'Titulo': html.unescape(data[dat]['Titulo']), 
            'Imagen': data[dat]['Imagen'], 
            'Idioma': data[dat]['Idioma'].split('/'), 
            'Temporada': data[dat]['Temporada']
          })
  lista.reverse()
  if reverse:
    return lista[0:12]
  return lista[int(start):int(end)]

def getVideoByTypeClassGenreApi(tipo, clase, genero, start, end):
  lista = []
  f = open('data.json')
  data = json.load(f)
  f.close()
  for dat in data.keys():
    if data[dat]['Clase'].lower() == clase.lower():
      if data[dat]['Tipo'].lower() == tipo.lower():
        if genero in data[dat]['Genero']:
          lista.append(
            {
              'Id': data[dat]['Id'], 
              'Titulo': html.unescape(data[dat]['Titulo']), 
              'Imagen': data[dat]['Imagen'], 
              'Idioma': data[dat]['Idioma'].split('/'), 
              'Temporada': data[dat]['Temporada']
            })
  return lista[int(start):int(end)]

def getVideoByTypeClassLanguageApi(tipo, clase, language, start, end):
  lista = []
  f = open('data.json')
  data = json.load(f)
  f.close()
  for dat in data.keys():
    if data[dat]['Clase'].lower() == clase.lower():
      if data[dat]['Tipo'].lower() == tipo.lower():
        if language in data[dat]['Idioma']:
          lista.append(
            {
              'Id': data[dat]['Id'], 
              'Titulo': html.unescape(data[dat]['Titulo']), 
              'Imagen': data[dat]['Imagen'], 
              'Idioma': data[dat]['Idioma'].split('/'), 
              'Temporada': data[dat]['Temporada']
            })
  return lista[int(start):int(end)]

def getTypesByClass(clase):
  f = open('data.json', 'r', encoding='utf-8')
  data = json.load(f)
  f.close()
  tipos = []
  for dat in data.keys():
    if data[dat]['Clase'].lower() == clase.lower():
      if data[dat]['Tipo'] not in tipos and data[dat]['Tipo'].lower() != 'pelicula' :
        tipos.append(data[dat]['Tipo'])
  return tipos

def getLanguagesByTypeClass(clase, tipo):
  f = open('data.json')
  data = json.load(f)
  f.close()
  idioma = []
  for dat in data.keys():
    if data[dat]['Clase'].lower() == clase.lower():
      if data[dat]['Tipo'].lower() == tipo.lower():
        idiomas = data[dat]['Idioma'].split('/')
        for i in idiomas:
          if i not in idioma:
            idioma.append(i)
  return idioma

def searchData(dato, tipo, clase, start, end):
  lista = []
  f = open('data.json')
  data = json.load(f)
  f.close()
  for dat in data.keys():
    if data[dat]['Clase'].lower() == clase.lower():
      if data[dat]['Tipo'].lower() == tipo.lower():
        if html.escape(dato.lower()) in data[dat]['Titulo'].lower():
          lista.append(
            {
              'Id': data[dat]['Id'], 
              'Titulo': html.unescape(data[dat]['Titulo']), 
              'Imagen': data[dat]['Imagen'], 
              'Idioma': data[dat]['Idioma'].split('/'), 
              'Temporada': data[dat]['Temporada']
            })
  return lista[int(start):int(end)]

