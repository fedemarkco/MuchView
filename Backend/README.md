# Instalación
Tienes que crear un directorio (en nuestro caso, crearemos **backE**)
```
mkdir backE
```
Ingresamos al directorio creado (en nuestro caso es **backE**)
```
cd backE
```
Ahora creamos el entorno virtual del proyecto
```
virtualenv backE
```
Para activar el entorno virtual, tienes que hacer
```
backE/Scripts/activate
```
Para desactivarlo, una vez que lo termines de usar, tienes que hacer
```
backE/Scripts/deactivate
```
Luego de realizar estos pasos, tienes que instalar los paquetes
```
pip install -r requirements.txt
```
Y finalmente, correr la api
```
python apy.py
```
