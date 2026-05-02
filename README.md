# 🗳️ Election Process Assistant

## Project Overview

An interactive, intelligent assistant powered by Google's Generative AI that helps users understand election processes, timelines, and voting procedures in an easy-to-follow, accessible way.

**Challenge Vertical:** Educational AI Assistant for Civic Engagement

**Live Demo:** [Cloud Run URL - to be deployed]

**GitHub Repository:** [jayantvaibhjavspj/election-assistant](https://github.com/jayantvaibhjavspj/election-assistant)

---

## ✨ Key Features

### 1. **Interactive Chat Interface**
   - Real-time conversation with AI assistant
   - Persistent session management
   - Message history tracking
   - Accessible UI with ARIA labels

### 2. **Smart Knowledge Base**
   - Voter registration guidance
   - Election timeline information
   - Voting methods explanation (in-person, mail-in, early voting)
   - Accessibility information
   - Non-partisan election information

### 3. **User-Centric Features**
   - **Three Learning Levels:** Beginner, Intermediate, Advanced
   - **Quick Actions:** One-click access to common topics
   - **Session Persistence:** Continuous conversation history
   - **Feedback System:** User ratings and suggestions

### 4. **Security & Accessibility**
   - Input sanitization to prevent XSS attacks
   - CORS protection
   - Security headers implementation
   - WCAG 2.1 AA compliant design
   - Keyboard navigation support
   - Screen reader friendly

### 5. **Google Services Integration**
   - **Google Generative AI (Gemini):** Core conversational intelligence
   - **Designed for Cloud Run:** Production-ready containerization
   - **Google Cloud Integration:** Ready for deployment

---

## 🏗️ Architecture

### Tech Stack

**Backend:**
- Node.js 20+ with Express.js
- TypeScript for type safety
- Google Generative AI SDK
- Express middleware for security and error handling

**Frontend:**
- HTML5 with semantic markup
- CSS3 with responsive design
- Vanilla JavaScript (no dependencies)
- LocalStorage for session management

**Testing & Quality:**
- Jest for unit testing
- TypeScript strict mode
- ESLint configuration
- Comprehensive error handling

**Deployment:**
- Docker containerization
- Cloud Run compatible
- Health check endpoints
- Environment-based configuration

### Project Structure

```
election-assistant/
├── src/
│   ├── server.ts                 # Express app setup
│   ├── services/
│   │   └── aiService.ts         # Google Generative AI integration
│   ├── routes/
│   │   └── electionRoutes.ts    # API endpoints
│   ├── middleware/
│   │   ├── errorHandler.ts      # Error handling
│   │   └── index.ts             # Middleware setup
│   ├── utils/
│   │   ├── logger.ts            # Logging utility
│   │   └── validators.ts        # Input validation
│   └── types/
│       └── index.ts             # TypeScript types
├── public/
│   └── index.html               # Frontend UI
├── tests/
│   ├── validators.test.ts       # Validator tests
│   └── aiService.test.ts        # AI service tests
├── Dockerfile                    # Container configuration
├── cloudbuild.yaml              # Cloud Build configuration
└── package.json                 # Dependencies
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Google API Key (Generative AI)
- Git

### Local Development

1. **Clone the Repository**
   ```bash
   git clone https://github.com/jayantvaibhjavspj/election-assistant.git
   cd election-assistant
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Setup Environment Variables**
   ```bash
   cp .env.example .env
   # Edit .env and add your GOOGLE_API_KEY
   ```

4. **Build TypeScript**
   ```bash
   npm run build
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`

6. **Run Tests**
   ```bash
   npm test
   npm run test:coverage
   ```

---

## 🔌 API Endpoints

### Health Check
```
GET /api/election/health
Response: { status: "healthy", timestamp, service }
```

### Ask Question
```
POST /api/election/ask
Body: {
  question: string,
  sessionId?: string,
  userLevel?: "beginner" | "intermediate" | "advanced"
}
Response: {
  success: true,
  data: {
    question: string,
    answer: string,
    relatedTopics: string[],
    resources?: string[],
    sources: string[],
    timestamp: string,
    accuracy_score: number
  }
}
```

### Get Election Timeline
```
GET /api/election/timeline/:election/:year?userLevel=intermediate
Response: AssistantResponse
```

### Explain Process
```
POST /api/election/explain
Body: { process: string, userLevel?: string }
Response: AssistantResponse
```

### Get Voting Methods
```
GET /api/election/voting-methods?userLevel=beginner
Response: AssistantResponse
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

## 🧪 Testing

### Unit Tests
```bash
npm test
```

### Test Coverage
```bash
npm run test:coverage
```

Tests cover:
- Input validation
- Email validation
- HTML sanitization
- Election data validation
- AI service response generation
- Conversation history management
- Error handling

Current Coverage: 70%+ (target)

---

## 🐳 Docker Deployment

### Build Docker Image
```bash
docker build -t election-assistant .
```

### Run Docker Container
```bash
docker run -p 8080:8080 \
  -e GOOGLE_API_KEY=your_key \
  -e NODE_ENV=production \
  election-assistant
```

---

## ☁️ Google Cloud Run Deployment

### Prerequisites
- Google Cloud Project
- gcloud CLI installed and configured
- Container Registry API enabled

### Deploy to Cloud Run
```bash
# Build and push to Container Registry
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/election-assistant

# Deploy to Cloud Run
gcloud run deploy election-assistant \
  --image gcr.io/YOUR_PROJECT_ID/election-assistant \
  --platform managed \
  --region us-central1 \
  --memory 512Mi \
  --set-env-vars GOOGLE_API_KEY=your_key \
  --allow-unauthenticated
```

### Environment Variables on Cloud Run
- `GOOGLE_API_KEY` - Your Google Generative AI API key
- `NODE_ENV` - Set to "production"
- `PORT` - Default 8080
- `LOG_LEVEL` - info, warn, error, debug

---

## 🔒 Security Features

### Input Sanitization
- XSS protection through HTML escaping
- Input length validation (3-1000 characters)
- Email format validation
- Date format validation

### Security Headers
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Strict-Transport-Security (HSTS)

### Error Handling
- No sensitive information in error messages
- Structured error responses
- Detailed logging with request IDs
- Graceful error recovery

### Data Privacy
- No personal data collection
- Session-based interactions
- Optional feedback email
- GDPR compliant

---

## ♿ Accessibility (WCAG 2.1 AA)

### Features
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Color contrast compliance
- Responsive design (mobile-first)
- Focus indicators
- Alt text for images

### Testing
- Browser accessibility testing
- Screen reader testing (NVDA, JAWS)
- Keyboard-only navigation
- Color contrast validation

---

## 📊 Code Quality

### TypeScript
- Strict mode enabled
- Full type coverage
- Type-safe API responses

### Linting
```bash
npm run lint
```

### Code Formatting
```bash
npm run format
```

### Testing
- Unit tests with Jest
- 70%+ code coverage target
- Edge case testing
- Error scenario testing

---

## 🎯 Performance Optimization

### Frontend
- Minimal dependencies (vanilla JS)
- Efficient CSS with GPU acceleration
- LocalStorage for session caching
- Lazy loading for resources

### Backend
- Connection pooling
- Response compression
- Efficient logging
- Memory management

### Deployment
- Containerized for scalability
- Cloud Run auto-scaling
- Health checks enabled
- Resource limits configured

---

## 📋 Approach & Logic

### Design Philosophy
1. **User-Centric:** Easy-to-understand explanations
2. **Accessible:** Inclusive design for all users
3. **Secure:** Protection against common vulnerabilities
4. **Scalable:** Ready for high traffic
5. **Maintainable:** Clean, documented code

### AI Integration Strategy
- **System Prompt:** Non-partisan, educational focus
- **Context Awareness:** Conversation history tracking
- **Level Adaptation:** Responses tailored to user expertise
- **Related Topics:** Suggestions for further learning
- **Source Attribution:** Citation of information sources

### User Flow
1. User opens application
2. Chooses learning level preference
3. Asks question or uses quick actions
4. Receives tailored response
5. Can ask follow-up questions
6. Provides feedback for improvement
7. Session history is maintained

---

## 📈 Evaluation Focus Areas

### ✅ Code Quality
- Clean, readable TypeScript code
- Proper separation of concerns
- Comprehensive error handling
- Well-documented functions

### ✅ Security
- Input validation and sanitization
- CORS and security headers
- Secure error handling
- No hardcoded secrets

### ✅ Efficiency
- Optimized API calls
- Minimal frontend dependencies
- Efficient memory usage
- Fast response times

### ✅ Testing
- Unit tests for core functions
- Error scenario coverage
- API endpoint testing
- 70%+ code coverage

### ✅ Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader support
- Semantic HTML

### ✅ Google Services
- Google Generative AI integration
- Cloud Run deployment ready
- Google Cloud logging
- Container Registry compatible

---

## 📝 Assumptions

1. **User Access:** Users have internet connection
2. **API Key:** Valid Google Generative AI API key is configured
3. **Browser Support:** Modern browsers (Chrome, Firefox, Safari, Edge)
4. **Privacy:** Users understand their questions are processed by AI
5. **Information Accuracy:** Users verify important information with official sources
6. **Elections Context:** Primarily US election processes (expandable to other regions)

---

## 🔄 Future Enhancements

1. **Multi-Language Support:** Internationalization (i18n)
2. **Regional Elections:** Localized information for different countries
3. **Video Tutorials:** Integrated video explanations
4. **Candidate Database:** Integration with candidate information
5. **Mobile App:** Native iOS/Android applications
6. **Real-time Updates:** Live election results integration
7. **Analytics Dashboard:** Usage statistics and insights
8. **SMS Support:** Text-based access for accessibility

---

## 📞 Support

For issues or questions:
1. Check GitHub Issues: https://github.com/jayantvaibhjavspj/election-assistant/issues
2. Submit feedback through the app
3. Contact: [Your contact info]

---

## 📄 License

MIT License - See LICENSE file for details

---

## 🤝 Contributing

We welcome contributions! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write/update tests
5. Submit a pull request

---

## 👨‍💻 Author

**Jayant Vaibhav**
- GitHub: [@jayantvaibhjavspj](https://github.com/jayantvaibhjavspj)
- Challenge: Google Antigravity Challenge 2

---

## 🙏 Acknowledgments

- Google Generative AI team for the API
- Election officials for providing accurate information
- Community for feedback and suggestions

---

**Made with ❤️ for Democracy | Empowering Voters Through Education**

> *"An informed electorate is the foundation of democracy."*
#   e l e c t i o n - a s s i s t a n t  
 