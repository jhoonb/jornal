from jornal import utils


def test_json_request_valido():
    assert True == utils.json_request_valido(
        ("k", "v", "b"), {"k": "", "v": "", "b": ""}
    )

    assert False == utils.json_request_valido(
        ("k", "b"), {"k": "", "v": "", "b": ""}
    )

    assert True == utils.json_request_valido(("k",), {"k": ""})

    assert True == utils.json_request_valido(
        ("k", "v", "b"), {"b": "", "v": "", "k": ""}
    )

    assert False == utils.json_request_valido(
        (), {"b": "", "v": "", "k": ""}
    )

    assert False == utils.json_request_valido(("k", "v", "b"), {})


def test__gerar_titulo():
    t = utils._gerar_titulo('TITULO DE TESTE')
    assert t == 'titulo_de_teste'
    t = utils._gerar_titulo('TITULO,DE, TESTE')
    assert t == 'titulo_de_teste'
    t = utils._gerar_titulo('        TITULO,DE, TESTE  ')
    assert t == 'titulo_de_teste'
