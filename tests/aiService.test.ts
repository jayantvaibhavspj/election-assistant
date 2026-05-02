// Mock Google Generative AI
jest.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
    getGenerativeModel: jest.fn().mockReturnValue({
      startChat: jest.fn().mockReturnValue({
        sendMessage: jest.fn().mockResolvedValue({
          response: {
            text: jest.fn().mockReturnValue('This is a mock response about elections.'),
          },
        }),
      }),
    }),
  })),
}));

import electionAssistantService from '../src/services/aiService.js';

describe('ElectionAssistantService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('generateResponse', () => {
    it('should generate a response for a valid question', async () => {
      const response = await electionAssistantService.generateResponse(
        'What is voter registration?',
        'test-session',
        'beginner',
      );

      expect(response).toHaveProperty('question');
      expect(response).toHaveProperty('answer');
      expect(response).toHaveProperty('relatedTopics');
      expect(response).toHaveProperty('timestamp');
    });

    it('should handle conversation history', async () => {
      const sessionId = 'test-session-history';

      const response1 = await electionAssistantService.generateResponse(
        'What is voting?',
        sessionId,
        'beginner',
      );

      expect(response1).toBeDefined();

      const history = electionAssistantService.getConversationHistory(sessionId);
      expect(history).toBeDefined();
      expect(history?.messages.length).toBeGreaterThan(0);
    });

    it('should update conversation history correctly', async () => {
      const sessionId = 'test-session-' + Date.now();

      await electionAssistantService.generateResponse('Question 1?', sessionId, 'intermediate');
      let history = electionAssistantService.getConversationHistory(sessionId);
      expect(history?.messages.length).toBe(2); // 1 user + 1 assistant

      await electionAssistantService.generateResponse('Question 2?', sessionId, 'intermediate');
      history = electionAssistantService.getConversationHistory(sessionId);
      expect(history?.messages.length).toBe(4); // 2 user + 2 assistant
    });
  });

  describe('getElectionTimeline', () => {
    it('should retrieve election timeline', async () => {
      const response = await electionAssistantService.getElectionTimeline('presidential', '2024', 'beginner');

      expect(response).toHaveProperty('answer');
      expect(response.answer).toBeDefined();
    });
  });

  describe('explainElectionProcess', () => {
    it('should explain an election process', async () => {
      const response = await electionAssistantService.explainElectionProcess('voter registration', 'beginner');

      expect(response).toHaveProperty('answer');
      expect(response).toHaveProperty('relatedTopics');
    });
  });

  describe('getVotingMethods', () => {
    it('should get voting methods information', async () => {
      const response = await electionAssistantService.getVotingMethods('beginner');

      expect(response).toHaveProperty('answer');
      expect(response).toBeDefined();
    });
  });

  describe('clearConversationHistory', () => {
    it('should clear conversation history for a session', async () => {
      const sessionId = 'test-session-clear-' + Date.now();

      await electionAssistantService.generateResponse('Test question', sessionId, 'beginner');
      let history = electionAssistantService.getConversationHistory(sessionId);
      expect(history).toBeDefined();

      electionAssistantService.clearConversationHistory(sessionId);
      history = electionAssistantService.getConversationHistory(sessionId);
      expect(history).toBeUndefined();
    });
  });
});
