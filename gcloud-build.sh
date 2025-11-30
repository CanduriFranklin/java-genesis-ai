#!/bin/bash
# Google Cloud Build script

# This script is designed to be executed by Google Cloud Build.
# It automates the process of building and deploying the application.

echo "Starting Google Cloud Build process..."

# Define variables
# These can be substituted by Cloud Build triggers
PROJECT_ID="${_AR_PROJECT_ID}"
SERVICE_NAME="${_SERVICE_NAME}"
REGION="${_DEPLOY_REGION}"
IMAGE_TAG="${_AR_HOSTNAME}/${PROJECT_ID}/${_AR_REPOSITORY}/${SERVICE_NAME}:latest"

# 1. Build the Docker image
echo "Building Docker image..."
docker build -t $IMAGE_TAG .

# 2. Push the image to Google Artifact Registry
echo "Pushing image to Artifact Registry..."
docker push $IMAGE_TAG

# 3. Deploy to Google Cloud Run
echo "Deploying to Cloud Run..."
gcloud run deploy $SERVICE_NAME \
  --image $IMAGE_TAG \
  --region $REGION \
  --platform managed \
  --allow-unauthenticated \
  --project=$PROJECT_ID

echo "Deployment completed successfully."
