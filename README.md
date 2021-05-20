# face-detection-api

A simple web application built using [Flask](https://github.com/pallets/flask). It exposes various REST APIs which are built on top of [face-recognition](https://github.com/ageitgey/face_recognition). 

# How to execute?
1. `pip install -r requirements.txt`
2. `python3 run.py`
3. visit http://localhost:5000/

If not specified the port explicitly, the server starts running on port 5000 by default

# Use Docker container
Docker image repo: https://hub.docker.com/r/sachinkalsi/face-detection-api

Run the following commands

```
docker pull sachinkalsi/face-detection-api

docker run -p 5000:5000 sachinkalsi/face-detection-api

```

visit http://localhost:5000/ 


![](sample.gif)
