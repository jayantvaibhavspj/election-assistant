import { GoogleGenerativeAI } from '@google/generative-ai';
import { AssistantResponse, ConversationContext } from '../types/index.js';
import logger from '../utils/logger.js';

class ElectionAssistantService {
  private genAI: GoogleGenerativeAI | null = null;
  private conversationHistories: Map<string, ConversationContext> = new Map();

  private static readonly ELECTION_SYSTEM_PROMPT = `You are an expert Election Process Assistant designed to help users understand voting processes, timelines, and election procedures. 

Your responsibilities:
1. Provide clear, accurate information about election processes
2. Explain registration procedures, voting methods, and timelines
3. Break down complex election topics into simple, understandable steps
4. Adapt explanations based on user's knowledge level
5. Provide regional context when asked about specific elections
6. Suggest reliable sources for official election information

Key topics you should cover:
- Voter registration procedures
- Early voting and absentee ballot information
- Polling place locations and hours
- Candidate information and platforms
- Election security and accessibility measures
- Timeline of key election dates
- Different voting methods (in-person, mail-in, etc.)
- Election results and processes

Always:
- Maintain non-partisan neutrality
- Provide factual, verified information
- Cite official sources when relevant
- Ask clarifying questions when needed
- Suggest related topics users might find helpful
- Ensure responses are accessible to all education levels`;

  private getGenAI(): GoogleGenerativeAI {
    if (!this.genAI) {
      const apiKey = process.env.GOOGLE_API_KEY;
      if (!apiKey) {
        throw new Error('GOOGLE_API_KEY environment variable is not set');
      }
      this.genAI = new GoogleGenerativeAI(apiKey);
    }
    return this.genAI;
  }

  async generateResponse(
    question: string,
    sessionId: string,
    userLevel: 'beginner' | 'intermediate' | 'advanced' = 'intermediate',
  ): Promise<AssistantResponse> {
    try {
      logger.debug('Generating response for question', { question, sessionId, userLevel });

      const genAI = this.getGenAI();
      const model = genAI.getGenerativeModel({ 
        model: 'gemini-pro',
        systemInstruction: {
          role: 'system',
          parts: [{ text: ElectionAssistantService.ELECTION_SYSTEM_PROMPT }]
        }
      });

      const contextHistory = this.conversationHistories.get(sessionId);
      let chatHistory = contextHistory?.messages || [];

      const messages = chatHistory.map((msg): { role: string; parts: { text: string }[] } => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }],
      }));

      const userMessage = {
        role: 'user' as const,
        parts: [{ text: `[User Level: ${userLevel}]\n\n${question}` }],
      };

      const chat = model.startChat({ history: messages });
      const response = await chat.sendMessage(userMessage.parts[0].text);
      const answerText = response.response.text();

      // Extract related topics and resources
      const relatedTopics = this.extractRelatedTopics(answerText);
      const resources = this.extractResources(answerText);

      const assistantResponse: AssistantResponse = {
        question,
        answer: answerText,
        relatedTopics,
        resources,
        sources: ['Google Generative AI', 'Official Election Resources'],
        timestamp: new Date().toISOString(),
        accuracy_score: this.calculateAccuracyScore(answerText),
      };

      // Update conversation history
      this.updateConversationHistory(sessionId, question, answerText, userLevel);

      logger.info('Response generated successfully', { sessionId });
      return assistantResponse;
    } catch (error) {
      logger.error('Error generating response', { error, question, sessionId });
      throw new Error(`Failed to generate response: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getElectionTimeline(election: string, year: string, userLevel: 'beginner' | 'intermediate' | 'advanced'): Promise<AssistantResponse> {
    const question = `What is the ${election} election timeline for ${year}? Include registration deadlines, early voting dates, and election day.`;
    const sessionId = `timeline-${election}-${year}`;
    return this.generateResponse(question, sessionId, userLevel);
  }

  async explainElectionProcess(
    processName: string,
    userLevel: 'beginner' | 'intermediate' | 'advanced' = 'beginner',
  ): Promise<AssistantResponse> {
    const question = `Please explain the ${processName} process in detail. Break it down into step-by-step instructions.`;
    const sessionId = `process-${processName}`;
    return this.generateResponse(question, sessionId, userLevel);
  }

  async getVotingMethods(userLevel: 'beginner' | 'intermediate' | 'advanced' = 'beginner'): Promise<AssistantResponse> {
    const question = 'What are the different ways to vote? Explain each method with its advantages and disadvantages.';
    const sessionId = 'voting-methods';
    return this.generateResponse(question, sessionId, userLevel);
  }

  private extractRelatedTopics(text: string): string[] {
    const topicsKeywords = ['registration', 'voting', 'timeline', 'candidates', 'polling', 'absentee', 'early voting', 'election day'];
    const found: string[] = [];

    for (const keyword of topicsKeywords) {
      if (text.toLowerCase().includes(keyword)) {
        found.push(keyword);
      }
    }

    return found.slice(0, 5);
  }

  private extractResources(text: string): string[] {
    const resources: string[] = [];
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urls = text.match(urlRegex);

    if (urls) {
      resources.push(...urls.slice(0, 3));
    }

    return resources;
  }

  private calculateAccuracyScore(text: string): number {
    // Simple heuristic-based accuracy scoring
    let score = 0.75; // Base score

    if (text.length > 100) score += 0.1;
    if (text.includes('according to')) score += 0.05;
    if (text.includes('official')) score += 0.05;
    if (text.includes('verified')) score += 0.05;

    return Math.min(1, score);
  }

  private updateConversationHistory(
    sessionId: string,
    userMessage: string,
    assistantMessage: string,
    userLevel: 'beginner' | 'intermediate' | 'advanced',
  ): void {
    let context = this.conversationHistories.get(sessionId);

    if (!context) {
      context = {
        sessionId,
        messages: [],
        userLevel,
      };
    }

    context.messages.push({
      role: 'user',
      content: userMessage,
      timestamp: new Date().toISOString(),
    });

    context.messages.push({
      role: 'assistant',
      content: assistantMessage,
      timestamp: new Date().toISOString(),
    });

    // Keep conversation history manageable (last 10 messages)
    if (context.messages.length > 20) {
      context.messages = context.messages.slice(-20);
    }

    this.conversationHistories.set(sessionId, context);
  }

  getConversationHistory(sessionId: string): ConversationContext | undefined {
    return this.conversationHistories.get(sessionId);
  }

  clearConversationHistory(sessionId: string): void {
    this.conversationHistories.delete(sessionId);
    logger.info('Conversation history cleared', { sessionId });
  }
}

export default new ElectionAssistantService();
