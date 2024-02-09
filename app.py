#pip install timeflux
#pip install timeflux_ui
#pip install timeflux_dsp
#pip install graphviz

from timeflux.helpers.hdf5 import info
from timeflux.helpers.viz import yaml_to_png
import os

if __name__ == '__main__':
    #Affiche les clés du fichier hdf5
    info('eeg.hdf5')

    #Génère un fichier graphique de l'application timeflux
    yaml_to_png('app.yaml', 'jpg')
    os.rename('app.jpg', 'www/assets/app.jpg')

    #timeflux -d app.yaml

