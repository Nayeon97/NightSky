FROM python:3.9.12
WORKDIR /usr/src/app
COPY . .
RUN pip install -r requirements.txt
ENV FLASK_PORT=5000
ENV FLASK_DEBUG=True
ENV FLASK_APP=app.py
EXPOSE 5000
CMD ["python", "app.py", "-p", "5000"]