import os

import bottle

from app import app


def main():
    env = os.getenv("BOTTLE_ENV", "production")
    host = os.getenv("HOST", "0.0.0.0")
    port = os.getenv("PORT", 8080)
    if env == "production":
        bottle.debug(False)
        app.run(host=host, port=port, reloader=False)
    else:
        bottle.debug(True)
        app.run(host=host, port=port, reloader=True)


if __name__ == "__main__":
    main()
