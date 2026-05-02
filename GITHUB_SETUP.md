# GitHub Setup Instructions

## Step 1: Create a New Repository on GitHub

1. Go to https://github.com/new
2. Log in with your account: **jayantvaibhjavspj**
3. Fill in the repository details:
   - **Repository name:** election-assistant
   - **Description:** Interactive Assistant for Understanding Election Processes, Timelines, and Steps
   - **Visibility:** Public ✅
   - **Initialize repository:** Leave unchecked (we already have a local repo)
4. Click "Create repository"

## Step 2: Add Remote and Push

After creating the repository, GitHub will show you instructions. Run these commands in the project directory:

```bash
cd "c:\Users\PRASHANT VAIBHAV\Documents\Election-Assistant"

# Add the remote repository
git remote add origin https://github.com/jayantvaibhjavspj/election-assistant.git

# Rename branch to main (if not already)
git branch -M main

# Push to GitHub
git push -u origin main
```

## Step 3: Verify on GitHub

1. Visit https://github.com/jayantvaibhjavspj/election-assistant
2. Confirm all files are pushed successfully
3. Check the README displays correctly
4. Verify repository size is less than 10 MB

## Important Notes

- **Public Repository:** Ensure visibility is set to Public
- **Single Branch:** All code should be in the main branch
- **Repository Size:** Should be less than 10 MB ✅ (currently ~2 MB)

## Troubleshooting

### SSH Keys (Recommended)
If you prefer SSH authentication:

```bash
# Generate SSH keys (if you don't have them)
ssh-keygen -t ed25519 -C "your-email@example.com"

# Add to GitHub: Settings > SSH and GPG keys > New SSH key

# Use SSH remote instead:
git remote set-url origin git@github.com:jayantvaibhjavspj/election-assistant.git
```

### Personal Access Token (HTTPS)
If you use HTTPS:

1. Create a personal access token at https://github.com/settings/tokens
2. When pushing, use your token as the password
3. Or configure git credential helper

### Update Remote
```bash
# View current remote
git remote -v

# Update if needed
git remote set-url origin https://github.com/jayantvaibhjavspj/election-assistant.git
```

## Deployment Links for Submission

After deployment to Google Cloud Run, update these:

- **GitHub Repository Link:** https://github.com/jayantvaibhjavspj/election-assistant
- **Deployed Link (Cloud Run):** https://election-assistant-xxxxx.run.app
- **LinkedIn Post:** Share your achievement on LinkedIn

---

For detailed deployment instructions, see README.md
