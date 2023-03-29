FROM --platform=linux/amd64 python:3.8

COPY . .

RUN pip3 install -r requirements.txt

EXPOSE 8080
EXPOSE 5000

ENTRYPOINT [ "python" ]

CMD ["app.py"]