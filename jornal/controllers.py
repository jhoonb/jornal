import utils
import jemail


def api_noticias(data_json):
    keys = ("noticias", "titulo", "cabecalho", "tempo")
    if utils.json_request_valido(keys, data_json):
        titulo, markdown, erro = utils.gerar_jornal(data_json)
        if not erro:
            return {
                "status": 200,
                "message": "OK",
                "erro": None,
                "texto_markdown": markdown,
                "titulo": titulo,
            }
    # se ocorreu algum erro except
    return {
        "status": 400,
        "message": "problema no post, verifique seu dados",
        "erro": "JSON inválido" or erro,
        "texto_markdown": None,
        "titulo": None,
    }


def api_docx(data_json):
    keys = ("titulo", "texto_markdown")
    if utils.json_request_valido(keys, data_json):
        nome_arquivo, erro = utils.gerar_docx(data_json)
    if not erro:
        return {
            "status": 201,
            "message": "Criado",
            "erro": None,
            "nome_arquivo": nome_arquivo,
        }
    # se ocorreu algum erro, except
    return {
        "status": 400,
        "message": "Ocorreu um problema ",
        "erro": "Erro ao gerar DOCX" or erro,
        "nome_arquivo": nome_arquivo,
    }


def api_email(data_json):
    keys = ("emailTo", "emailFrom", "senha", "arquivo")
    ok = utils.json_request_valido(keys, data_json)
    if ok:
        to = data_json["emailTo"]
        ffrom = data_json["emailFrom"]
        senha = data_json["senha"]
        file_name = data_json["arquivo"]
        subject = "[JORNAL-APP] - "

        erro = jemail.enviar_email(
            ffrom, to, subject, senha, file_name
        )
        print("ALGO ERRADO?", erro)
        if not erro:
            return {
                "status": 200,
                "message": "Email Enviado!",
                "erro": None,
            }
    # se algo aconteceu errado
    return {
        "status": 400,
        "message": "Erro ao enviar email",
        "erro": erro or "Falhou!",
    }
