# Jornal-App

Pequeno app web  (local) para gerar jornal.

- Título, cabeçalho, previsão do tempo.

- Insere notícias via url.

- Gera um markdown com as notícias (título e texto)

- Converte o markdown para .docx (Via pandoc).

- Envia o arquivo .docx por email.

- Tela para configuração padrão.


**Front-end:** 

- CSS Framework: [Tacit CSS](https://yegor256.github.io/tacit/)

- *Vanilla JS*

**Back-end:**

- Python [Bottle](http://bottlepy.org/) Framework

- Scraping: [Newspaper3k](https://newspaper.readthedocs.io/en/latest/)


**Pra converter o markdown para .docx:**

- [Pandoc:](https://pandoc.org/) a universal document converter 



**variável de ambiente:**

Produção
```shell
export BOTTLE_ENV=production
```
Desevolvimento:
```shell
export BOTTLE_ENV=development
```

**Execução:**

com Poetry:
```shell
poetry run python run.py
```

ou

```shell
python run.py
```


### version

__version__ = "0.1.1"

----

### Changelog

- **0.1.1:**
    - correção nos imports
    
    - adicionado menu para views /logout /enviar

    - format do código com `black *.py -l 70` 

- **0.1.0:**

    - Commit inicial