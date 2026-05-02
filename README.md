# 🗳️ Election Process Assistant

An interactive AI assistant that helps users understand election processes, voting procedures, and election timelines using Google's Generative AI.

---

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [Setup & Installation](#setup--installation)
6. [API Endpoints](#api-endpoints)
7. [Running Tests](#running-tests)
8. [Docker & Deployment](#docker--deployment)
9. [Security](#security)
10. [Accessibility](#accessibility)
11. [Contributing](#contributing)

---

## ⚡ Quick Start

```bash
# Clone repository
git clone https://github.com/jayantvaibhavspj/election-assistant.git
cd election-assistant

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Add GOOGLE_API_KEY to .env

# Run locally
npm run dev
# Visit http://localhost:3000
```

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **AI Chat** | Real-time responses powered by Google Gemini |
| **3 Learning Levels** | Beginner, Intermediate, Advanced |
| **Session Management** | Persistent conversation history |
| **Election Info** | Registration, voting methods, timelines |
| **Accessible** | WCAG 2.1 AA compliant design |
| **Secure** | XSS protection, CORS, security headers |
| **Cloud Ready** | Docker + Cloud Run deployment |
| **Non-Partisan** | Neutral, educational approach |

---

## 🏗️ Tech Stack

**Backend:**
- Node.js 20+ with Express.js
- TypeScript (strict mode)
- Google Generative AI SDK

**Frontend:**
- HTML5 semantic markup
- CSS3 responsive design
- Vanilla JavaScript (0 dependencies)

**Quality:**
- Jest for testing
- ESLint for linting
- Prettier for formatting

**Deployment:**
- Docker containerization
- Google Cloud Run ready

---

## 📁 Project Structure

```
election-assistant/
├── src/
│   ├── server.ts                   # Express setup
│   ├── services/aiService.ts       # AI integration
│   ├── routes/electionRoutes.ts    # API endpoints
│   ├── middleware/                 # Error handling
│   ├── utils/                      # Validators & logger
│   └── types/index.ts              # TypeScript types
├── public/index.html               # Frontend UI
├── tests/                          # Unit tests
├── Dockerfile                      # Container config
├── package.json                    # Dependencies
└── tsconfig.json                   # TypeScript config
```

---

## 🔧 Setup & Installation

### Prerequisites
- Node.js 18+
- npm or yarn
- Google API Key (get at https://ai.google.dev)
- Git

### Steps

1. **Clone Repository**
   ```bash
   git clone https://github.com/jayantvaibhavspj/election-assistant.git
   cd election-assistant
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Create Environment File**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add:
   ```
   GOOGLE_API_KEY=your_api_key_here
   PORT=3000
   NODE_ENV=development
   ```

4. **Build Project**
   ```bash
   npm run build
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```
   Open http://localhost:3000

---

## 🔌 API Endpoints

### Health Check
```
GET /api/election/health
```
Response: `{ status: "healthy", timestamp, service }`

### Ask Question
```
POST /api/election/ask
Body: {
  question: string,
  sessionId?: string,
  userLevel?: "beginner" | "intermediate" | "advanced"
}
```

### Get Timeline
```
GET /api/election/timeline/:election/:year?userLevel=intermediate
```

### Explain Process
```
POST /api/election/explain
Body: { process: string, userLevel?: string }
```

### Voting Methods
```
GET /api/election/voting-methods?userLevel=beginner
```

### Conversation History
```
GET /api/election/history/:sessionId
DELETE /api/election/history/:sessionId
```

### User Feedback
```
POST /api/election/feedback
Body: {
  sessionId: string,
  rating: 1-5,
  feedback?: string,
  email?: string
}
```

---

## 🧪 Running Tests

```bash
# Run all tests
npm test

# Watch mode
npm test:watch

# Coverage report
npm run test:coverage
```

**Coverage Target:** 70%+

**Test Areas:**
- Input validation
- Email validation
- HTML sanitization
- AI service responses
- Conversation history
- Error handling

---

## 🐳 Docker & Deployment

### Build Docker Image
```bash
docker build -t election-assistant .
```

### Run Locally
```bash
docker run -p 8080:8080 \
  -e GOOGLE_API_KEY=your_key \
  -e NODE_ENV=production \
  election-assistant
```

### Deploy to Cloud Run
```bash
# 1. Get API key from https://ai.google.dev
# 2. Configure gcloud
gcloud init
gcloud services enable run.googleapis.com containerregistry.googleapis.com

# 3. Build and push
gcloud auth configure-docker
docker build -t gcr.io/YOUR_PROJECT_ID/election-assistant .
docker push gcr.io/YOUR_PROJECT_ID/election-assistant

# 4. Deploy
gcloud run deploy election-assistant \
  --image gcr.io/YOUR_PROJECT_ID/election-assistant \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars GOOGLE_API_KEY=your_key_here
```

---

## 🔒 Security

✅ **Input Sanitization** - XSS protection via HTML escaping  
✅ **CORS Configuration** - Restricted origin access  
✅ **Security Headers** - Content-Security-Policy, X-Frame-Options  
✅ **Input Validation** - Length limits, format checks  
✅ **Error Handling** - No sensitive info in errors  
✅ **Environment Variables** - No hardcoded secrets  
✅ **Type Safety** - TypeScript strict mode  

---

## ♿ Accessibility

**WCAG 2.1 AA Compliant:**
- ✅ Semantic HTML structure
- ✅ ARIA labels and roles
- ✅ Keyboard navigation support
- ✅ Screen reader compatibility
- ✅ Color contrast compliance (4.5:1)
- ✅ Responsive design
- ✅ Focus indicators

---

## 📊 Scripts

```bash
npm run dev          # Development with auto-reload
npm run build        # Build TypeScript
npm start            # Production start
npm test             # Run tests
npm run test:watch   # Tests in watch mode
npm run lint         # ESLint check
npm run format       # Prettier formatting
```

---

## 📝 Environment Variables

```
GOOGLE_API_KEY=your_api_key_here
PORT=3000
NODE_ENV=development|production
LOG_LEVEL=info|warn|error|debug
```

---

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

---

## 📄 License

MIT License - See LICENSE file for details

---

## 👨‍💻 Author

**Jayant Vaibhav**
- GitHub: [@jayantvaibhjavspj](https://github.com/jayantvaibhjavspj)
- Challenge: Google Antigravity Challenge 2

---

## 🙏 Acknowledgments

- Google Generative AI team
- Election officials for accurate information
- Community feedback

---

**Made with ❤️ for Democracy**

> *"An informed electorate is the foundation of democracy."*
