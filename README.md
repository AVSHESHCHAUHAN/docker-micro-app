# Docker-Based Micro Web Application Deployment (MongoDB)

Three Docker containers: `frontend` (Nginx), `api` (Node.js/Express + Mongoose), and `database` (MongoDB). Jenkins runs on Windows and manages Docker Compose; no fourth container is required.

## Requirements
Windows, Docker Desktop (Linux containers), VS Code, Git. Later, Java 21 and Jenkins LTS for CI/CD. Node.js and MongoDB run inside Docker; no local installation needed.

## Run on Windows PowerShell

```powershell
cd "$env:USERPROFILE\Documents\docker-micro-app"
docker compose config
docker compose build
docker compose up -d --wait
docker compose ps
```

Open http://localhost:3000 and press **Check API & Database**. API: http://localhost:3001 should show `API and MongoDB are connected!`.

Test MongoDB inside the database container:

```powershell
docker compose exec database mongosh -u admin -p admin123 --authenticationDatabase admin --eval "db.adminCommand({ping:1})"
```

## Container commands

```powershell
docker compose logs
docker compose stop
docker compose start
docker compose down
```

`docker compose down -v` deletes the MongoDB volume (data loss).

## GitHub

Create an empty GitHub repository named `docker-micro-app`. Then run:

```powershell
git init
git add .
git commit -m "Initial MongoDB Docker micro app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/docker-micro-app.git
git push -u origin main
```

## Jenkins

Install Java 21 and Jenkins LTS on Windows. Launch Jenkins in an account with Docker Desktop access. Create Pipeline -> Pipeline script from SCM -> Git -> repository URL -> `*/main` -> Script Path `Jenkinsfile`. Click Build Now. The Jenkinsfile polls Git for changes about every two minutes; the pipeline checks out code, verifies Docker, builds, deploys and checks health.

## Security

The MongoDB admin password here is a **local classroom demonstration only**. For any shared/real deployment, use dedicated least-privilege database credentials and secrets in an untracked environment file or Jenkins credentials. Do not publicly expose MongoDB port 27017. MongoDB data persists in the `mongo_data` named volume.
