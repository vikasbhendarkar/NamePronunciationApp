# NamePronunciationApp
Wells Fargo Hackathon 2022

<h2>Steps to run the Frontend (without docker)</h2>
<p>npm install</p>
<p>npm run winBuild(for windows) / npm run build(for linux)</p>

<h2>Steps to run the backend (without docker)</h2>
<p>Run poetry install in root directory</p>
<p>python run.py</p>

<h1>With Docker</h1>
docker compose -f "docker compose.yaml" down
docker compose -f "docker compose.yaml" up -d --build

This will use docker-compose.yaml file to run the services for backend and frontend. It will automatically search for Dockerfile in respective directories and run the service.



YugaByte credentials: flask_app/resource/database

Admin UI credentials:
email: hackathon2022@gmail.com