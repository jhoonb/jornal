import smtplib
from email import encoders
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication
import os


# from os.path import basename


def _body() -> str:
    return (
        "Olá!<br> seu jornal <h4>'{}'</h4> já está disponível.<br>"
        "Arquivo em anexo, formato <i>.docx</i> (Word)<br><br>"
        "<small> Desenvolvido por @jhoonb - "
        "https://github.com/jhoonb/jornal </small>"
    )


# [AVISO] - Gmail não permite mais app de terceiro
# sem liberar manualmente.
def _getSMTP(email: str) -> dict:
    microsoft = ("hotmail", "live", "outlook", "msn")
    if any(i in email for i in microsoft):
        return {"smtp": "smtp-mail.outlook.com", "porta": 587}
    if "gmail" in email:
        return {"smtp": "smtp.gmail.com", "porta": 587}


def enviar_email(
    ffrom: str, to: str, subject: str, password: str, file_name: str
):
    try:
        _path = os.getcwd()
        file_path = f"{_path}/static/docx/{file_name}"
        # connect server
        smtp_conf = _getSMTP(ffrom)
        server = smtplib.SMTP(smtp_conf["smtp"], smtp_conf["porta"])
        server.connect(smtp_conf["smtp"], smtp_conf["porta"])
        server.ehlo()
        server.starttls()
        server.ehlo()
        server.login(ffrom, password)

        # [TODO] multiplos emails
        # criar email body
        msg = MIMEMultipart()
        msg["Subject"] = subject + f"{file_name}"
        msg["From"] = ffrom
        msg["To"] = to

        # attachment
        with open(file_path, "rb") as f:
            part_docx = MIMEApplication(f.read(), Name=file_name)

        part_docx[
            "Content-Disposition"
        ] = f'attachment; filename="{file_name}"'

        encoders.encode_base64(part_docx)
        msg.attach(part_docx)

        body = _body()
        body = body.format(file_name)
        msg.attach(MIMEText(body, "html"))

        text = msg.as_string()
        server.sendmail(ffrom, to, text)
        server.quit()
    except Exception as err:
        return str(err)
    # se ocorreu tudo ok, retorna 200
    return None
