import os

import bottle

import controllers


app = bottle.Bottle()


# ======= servindo arquivos estáticos css/js/img/docx ================
@app.route("/static/img/<filename:path>")
def img_static(filename):
    return bottle.static_file(filename, root="./static/img")


@app.route("/static/css/<filename:path>")
def css_static(filename):
    return bottle.static_file(filename, root="./static/css")


@app.route("/static/js/<filename:path>")
def js_static(filename):
    return bottle.static_file(filename, root="./static/js")


@app.route("/static/ico/<filename:path>")
def ico_static(filename):
    return bottle.static_file(filename, root="./static/ico")


@app.route("/static/docx/<filename:path>")
def docx_static(filename):
    return bottle.static_file(filename, root="./static/docx")


# usando template jinja2
# ----------------------- rotas para os templates html --------------
@app.route("/")
@app.route("/index")
@bottle.jinja2_view("index.html", template_lookup=["views"])
def view_index():
    return {}


@app.route("/novo")
@bottle.jinja2_view("novo.html", template_lookup=["views"])
def view_novo():
    return {}


@app.route("/edicao")
@bottle.jinja2_view("edicao.html", template_lookup=["views"])
def view_edicao():
    return {}


@app.route("/enviar")
@bottle.jinja2_view("enviar.html", template_lookup=["views"])
def view_enviar():
    return {}


@app.route("/logout")
@bottle.jinja2_view("logout.html", template_lookup=["views"])
def view_logout():
    return {}


@app.route("/configuracao")
@bottle.jinja2_view("configuracao.html", template_lookup=["views"])
def view_configuracao():
    return {}


# ------------------------- API -------------------------------------


@app.post("/api/jornal.json")
def api_noticias():
    return controllers.api_noticias(bottle.request.json)


@app.post("/api/docx.json")
def api_docx():
    return controllers.api_docx(bottle.request.json)


@app.post("/api/email.json")
def api_email():
    return controllers.api_email(bottle.request.json)


# ====================================================================
if __name__ == "__main__":

    env = os.getenv("BOTTLE_ENV") or "development"
    host = os.getenv("HOST", "0.0.0.0")
    port = os.getenv("PORT", 8080)
    if env == "production":
        bottle.debug(False)
        app.run(host=host, port=port, reloader=False)
    else:
        bottle.debug(True)
        app.run(host=host, port=port, reloader=True)
