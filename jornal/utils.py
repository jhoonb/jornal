import os
import subprocess
from typing import Dict, Tuple, Any, List

import newspaper


__all__ = ["gerar_jornal", "json_request_valido", "gerar_docx"]


def _gerar_titulo(titulo: str) -> str:
    """[summary]

    Args:
        titulo (str): [description]

    Returns:
        str: [description]
    """
    titulo = titulo.strip()
    titulo = titulo.lower()
    titulo = titulo.replace(",", "_")
    titulo = titulo.replace(" ", "_")
    titulo = titulo.replace("__", "_")
    return titulo


def _scrap_noticias(
    noticias: List[Dict[str, str]]
) -> List[Dict[str, str]]:
    """[summary]

    Args:
        noticias (List[Dict[str, str]]): [description]

    Returns:
        List[Dict[str, str]]: [description]
    """
    resp = []
    for noticia in noticias:
        artigo = newspaper.Article(
            noticia["url"], language="pt", fetch_images=False
        )
        artigo.download()
        artigo.parse()
        titulo = artigo.title
        texto = artigo.text
        resp.append(
            {"tag": noticia["tag"], "titulo": titulo, "texto": texto}
        )
    return resp


def gerar_jornal(data_json: Dict[str, Any]) -> tuple:
    """[summary]

    Args:
        data_json (Dict[str, Any]): [description]

    Returns:
        tuple: [description]
    """
    try:
        markdown = ""
        markdown += f"# {data_json['titulo']}\n\n"
        markdown += f"### {data_json['cabecalho']}\n\n"
        markdown += "## Destaques\n\n"

        resp = _scrap_noticias(data_json["noticias"])
        for noticia in resp:
            markdown += (
                f" - [{noticia['tag']}] - {noticia['titulo']}\n\n"
            )

        markdown += "\n## PREVISÃO DO TEMPO\n\n"
        markdown += f"{data_json['tempo']}\n\n"

        markdown += "## Notícias\n\n\n"

        for noticia in resp:
            markdown += f"### {noticia['titulo']}\n\n"
            markdown += f"{noticia['texto']}\n\n"
            markdown += "----\n\n"
        titulo = _gerar_titulo(data_json["titulo"])
    except Exception as err:
        return None, None, str(err)

    return titulo, markdown, None


def json_request_valido(keys: Tuple[str], d: Dict[str, Any]) -> bool:
    """[summary]

    Args:
        keys (Tuple[str]): [description]
        d (Dict[str, Any]): [description]

    Returns:
        bool: [description]
    """
    if not isinstance(keys, tuple):
        return False
    if not d or not isinstance(d, dict):
        return False
    if len(keys) != len(d.keys()):
        return False
    return all(i in d for i in keys)


def gerar_docx(data_json) -> Dict[str, Any]:
    """[summary]

    Args:
        data_json ([type]): [description]

    Returns:
        Dict[str, Any]: [description]
    """

    file_md = f'{data_json["titulo"]}.md'
    file_docx = f'{data_json["titulo"]}.docx'
    _path = os.getcwd()
    arquivo = "{}/static/docx/{}"

    try:
        with open(
            arquivo.format(_path, file_md), "w", encoding="utf-8"
        ) as f:
            f.write(data_json["texto_markdown"])

        subprocess.call(
            [
                "pandoc",
                arquivo.format(_path, file_md),
                "-o",
                arquivo.format(_path, file_docx),
            ]
        )
    except Exception as err:
        return None, str(err)

    return file_docx, None
