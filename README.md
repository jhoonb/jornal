# Jornal-App

Pequeno app web (local) para criar seus jornais.

- Título, cabeçalho, previsão do tempo.

- Insere notícias via url.

- Gera um markdown com as notícias (título e texto)

- Converte o markdown para .docx (Via pandoc).

- Envia o arquivo .docx por email.

- Tela para configuração padrão.


### version

__version__ = "0.1.2"


**Front-end:** 

- CSS Framework: [Tacit CSS](https://yegor256.github.io/tacit/)

- *Vanilla JS*

**Back-end:**

- Python [Bottle](http://bottlepy.org/) Framework

- Scraping: [Newspaper3k](https://newspaper.readthedocs.io/en/latest/)


### Dependências

**Pra converter o markdown para .docx:**

- [Pandoc:](https://pandoc.org/) a universal document converter 


No diretório do projeto:
```shell
poetry install
```


**variável de ambiente:**

Produção
```shell
export BOTTLE_ENV=production
```
Desenvolvimento:
```shell
export BOTTLE_ENV=development
```

**Execução:**

(dentro do diretório /jornal)

com Poetry:
```shell
poetry run python run.py
```

ou

```shell
python run.py
```


----

### Changelog

- **0.1.2:**
    - pequenas correções textuais
    
    - up.py (para atualizar de maneira automática o app [em testes])

    - removido *.js* inutilizado.

    - CSS Tacit Framework local em /static/css/

    - na tabela de ação, adicionado botão de up ⬆ e down ⬇, para reorganizar os links e ação de exclusão com símbolo ❌


- **0.1.1:**
    - correção nos imports
    
    - adicionado menu para views /logout /enviar

    - format do código com `black *.py -l 70` 

- **0.1.0:**

    - Commit inicial