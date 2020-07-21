import zipfile
import sys
import os

import requests


# [Windows]
# Crie manualmente um atalho no Desktop que aponta para
# o run.bat gerado na pasta.
# O ícone do atalho pode ser encontrado em: /jornal/static/ico/
# Após executar o app, é só entrar no navegador: localhost:8080
# favorite o site no navegador. Obs: host e porta podem ser
# alterados via export PORT=<porta> e export HOST=<host>
#


__version__ = '0.1.0'


def _create_run_file(local):
    local = f'{local}jornal-master/'
    filestr = '''
set export BOTTLE_ENV=production
cd jornal
poetry run python run.py
'''
    ext = ".bat" if sys.platform == 'win32' else ".sh"

    if ext == '.sh':
        filestr = filestr.replace('set ', '')

    with open(f"{local}run{ext}", 'w') as f:
        f.write(filestr)
    

def download():
    url = "https://github.com/jhoonb/jornal/archive/master.zip"
    print(f'\tDownload de: {url} ...')
    r = requests.get(url, allow_redirects=True)
    with open("jornal.zip", "wb") as f:
        f.write(r.content)
    print('\tDownload Concluído.')


def install():
    print('\tInstalando...')
    if sys.platform == 'win32':
        local = 'c:/jornal/'
    else:
        local = '/home/{}/jornal/'.format(os.uname()[1])

    if not os.path.exists(local):
        os.mkdir(local)

    with zipfile.ZipFile("jornal.zip", "r") as zip_ref:
        zip_ref.extractall(local)
    print('\tInstação concluída.')
    print('\tGerando script run...')
    _create_run_file(local)


if __name__ == "__main__":
    print('[JORNAL-APP] Iniciando Download.')
    download()
    print('[JORNAL-APP] Iniciando Instalação')
    install()
    print('[JORNAL-APP] Instalação concluída!')
