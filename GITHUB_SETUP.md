# GitHub Setup & Push Guide

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Login: **jayantvaibhjavspj**
3. Fill details:
   - **Name:** election-assistant
   - **Description:** Interactive AI Assistant for Understanding Election Processes
   - **Visibility:** Public ✅
   - **Initialize:** Leave unchecked
4. Click "Create repository"

---

## Step 2: Configure Git & Push

Run these commands in project directory:

```bash
cd "c:\Users\PRASHANT VAIBHAV\Documents\Election-Assistant"

# Add remote repository
git remote add origin https://github.com/jayantvaibhjavspj/election-assistant.git

# Ensure main branch
git branch -M main

# Push all commits
git push -u origin main
```

---

## Step 3: Verify on GitHub

1. Visit https://github.com/jayantvaibhjavspj/election-assistant
2. Confirm files uploaded ✅
3. Check README displays correctly ✅
4. Verify size < 10 MB ✅

---

## Troubleshooting

### Remote Already Exists
```bash
git remote remove origin
git remote add origin https://github.com/jayantvaibhjavspj/election-assistant.git
```

### Push Fails - Authentication
```bash
# Try HTTPS first
git push -u origin main

# Or use SSH (if configured)
git remote set-url origin git@github.com:jayantvaibhjavspj/election-assistant.git
git push -u origin main
```

### Check Current Remote
```bash
git remote -v
```

---

## Important Notes

- ✅ Public Repository required
- ✅ Single branch (main)
- ✅ Repository size < 10 MB
- ✅ All files needed for submission

---

**Next:** Deploy to Cloud Run using `CLOUD_RUN_DEPLOYMENT.md`
