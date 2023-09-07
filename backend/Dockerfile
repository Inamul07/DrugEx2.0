FROM python:3.9
WORKDIR /code
COPY ./requirements.txt /code/requirements.txt
RUN pip install wheel
RUN pip install cmake
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt
COPY ./ /code/app
CMD ["python","app/main.py"]