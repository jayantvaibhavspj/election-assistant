# Google Cloud Run Deployment Guide

## Prerequisites

1. **Google Cloud Account** - Create at https://cloud.google.com
2. **Google Cloud Project** - Create a new project
3. **gcloud CLI** - Install from https://cloud.google.com/sdk/docs/install
4. **Docker** - Install from https://www.docker.com/products/docker-desktop

## Step 1: Get Google Generative AI API Key

1. Go to https://console.cloud.google.com/apis/dashboard
2. Enable "Google Generative AI API"
3. Go to https://ai.google.dev/tutorials/setup
4. Click "Get API Key" 
5. Copy your API key (keep it safe!)
6. Set environment variable or pass during deployment

## Step 2: Setup Google Cloud Project

```bash
# Install gcloud CLI
# https://cloud.google.com/sdk/docs/install

# Initialize gcloud
gcloud init

# Set your project
gcloud config set project YOUR_PROJECT_ID

# Enable required APIs
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
gcloud services enable cloudbuild.googleapis.com
```

## Step 3: Local Testing with Docker

```bash
# Build Docker image
docker build -t election-assistant .

# Run locally
docker run -p 8080:8080 \
  -e GOOGLE_API_KEY=your_api_key_here \
  -e NODE_ENV=production \
  election-assistant

# Test at http://localhost:8080
```

## Step 4: Push to Container Registry

```bash
# Tag image
docker tag election-assistant gcr.io/YOUR_PROJECT_ID/election-assistant

# Configure Docker authentication
gcloud auth configure-docker

# Push to Google Container Registry
docker push gcr.io/YOUR_PROJECT_ID/election-assistant
```

## Step 5: Deploy to Cloud Run

### Option A: Using gcloud CLI (Recommended)

```bash
gcloud run deploy election-assistant \
  --image gcr.io/YOUR_PROJECT_ID/election-assistant \
  --platform managed \
  --region us-central1 \
  --memory 512Mi \
  --cpu 1 \
  --allow-unauthenticated \
  --set-env-vars GOOGLE_API_KEY=your_api_key_here,NODE_ENV=production
```

### Option B: Using Google Cloud Console

1. Go to https://console.cloud.google.com/run
2. Click "Create Service"
3. Select "Deploy one revision from an existing image"
4. Choose the image from Container Registry
5. Set service name: `election-assistant`
6. Region: `us-central1`
7. Set environment variables:
   - `GOOGLE_API_KEY`: Your API key
   - `NODE_ENV`: production
8. Allow unauthenticated invocations ✅
9. Click "Create"

## Step 6: Configure Environment Variables

In Cloud Run Console:
1. Go to your service: election-assistant
2. Click "Edit and Deploy New Revision"
3. Go to "Runtime Settings"
4. Add environment variables:
   ```
   GOOGLE_API_KEY = your_api_key
   NODE_ENV = production
   LOG_LEVEL = info
   ```
5. Set memory: 512 MB
6. Set CPU: 1

## Step 7: Get Your Cloud Run URL

After deployment, you'll see:
```
Service URL: https://election-assistant-xxxxx.run.app
```

## Verification

```bash
# Check deployment status
gcloud run services describe election-assistant --region us-central1

# View logs
gcloud run services logs read election-assistant --region us-central1

# Test health endpoint
curl https://election-assistant-xxxxx.run.app/api/election/health
```

## Monitoring & Logs

### Cloud Console
1. Go to https://console.cloud.google.com/run/detail/us-central1/election-assistant/logs
2. View real-time logs
3. Monitor metrics (CPU, memory, requests)

### Local Logging
```bash
# Stream logs
gcloud run services logs read election-assistant --limit 50 --follow

# Filter by severity
gcloud run services logs read election-assistant --limit 50 --filter="severity>=ERROR"
```

## Scaling & Performance

### Auto-scaling Configuration
```bash
gcloud run deploy election-assistant \
  --image gcr.io/YOUR_PROJECT_ID/election-assistant \
  --max-instances 100 \
  --min-instances 1 \
  --cpu 1 \
  --memory 512Mi
```

### Performance Tips
- **Min instances:** Keep 0 for cost optimization (cold start ~2-3 sec)
- **Max instances:** Set limit to control costs
- **Memory:** 512MB is sufficient for this application
- **CPU:** 1 CPU is adequate

## Cost Estimation

Based on typical usage:
- **Memory cost:** ~$6.50/month (512 MB)
- **CPU cost:** ~$10.00/month
- **Invocation cost:** Negligible for demo usage
- **Always Free Tier:** 2 million invocations/month included

## Security Best Practices

1. **API Key Management:**
   ```bash
   # Don't commit API keys to GitHub!
   # Use Cloud Secrets Manager instead:
   echo -n "your_api_key" | gcloud secrets create google-api-key --data-file=-
   ```

2. **Environment Variables:**
   - Never commit `.env` files to GitHub
   - Use Cloud Secret Manager for production
   - Rotate API keys periodically

3. **Monitoring:**
   - Set up alerts for errors
   - Monitor resource usage
   - Review access logs

## Troubleshooting

### Issue: Service not responding
```bash
# Check service status
gcloud run services describe election-assistant

# Check recent logs
gcloud run services logs read election-assistant --limit 50
```

### Issue: Memory or CPU limits
- Increase memory: `--memory 1Gi`
- Increase CPU: `--cpu 2`
- Or optimize code performance

### Issue: Cold start latency
- Keep `min-instances: 1` to avoid cold starts
- Note: This increases costs

### Issue: Deployment fails
- Check Docker image builds locally first
- Verify API credentials
- Check required APIs are enabled

## Cleanup

To delete the service and associated resources:

```bash
# Delete Cloud Run service
gcloud run services delete election-assistant --region us-central1

# Delete container image
gcloud container images delete gcr.io/YOUR_PROJECT_ID/election-assistant
```

## SUBMISSION CHECKLIST

- [ ] GitHub repository is public
- [ ] GitHub repository URL: https://github.com/jayantvaibhjavspj/election-assistant
- [ ] Deployed on Google Cloud Run
- [ ] Cloud Run URL: https://election-assistant-xxxxx.run.app
- [ ] Repository size < 10 MB
- [ ] Single branch (main)
- [ ] README is comprehensive
- [ ] Tests pass (70%+ coverage)
- [ ] Security headers configured
- [ ] Accessibility tested
- [ ] Google Generative AI integrated
- [ ] Health check endpoint works
- [ ] LinkedIn post created and shared

## Resources

- Cloud Run Documentation: https://cloud.google.com/run/docs
- Google Generative AI: https://ai.google.dev
- Container Registry: https://cloud.google.com/container-registry/docs
- Pricing: https://cloud.google.com/run/pricing

---

**Need Help?**
- Google Cloud Support: https://cloud.google.com/support
- Community: https://stackoverflow.com/questions/tagged/google-cloud-run
