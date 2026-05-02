import { Router, Request, Response } from 'express';
import electionAssistantService from '../services/aiService';
import { isValidQuestion, sanitizeInput, isValidEmail } from '../utils/validators';
import { AppError, asyncHandler } from '../middleware/errorHandler';
import logger from '../utils/logger';

const router = Router();

// Health check endpoint
router.get('/health', (_req: Request, res: Response): void => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Election Assistant',
  });
});

// Ask a question about election process
router.post(
  '/ask',
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { question, sessionId = 'default', userLevel = 'intermediate' } = req.body;

    // Validation
    const questionValidation = isValidQuestion(question);
    if (!questionValidation.isValid) {
      throw new AppError(400, 'INVALID_QUESTION', questionValidation.errors.join(', '));
    }

    // Sanitize input
    const sanitizedQuestion = sanitizeInput(question);

    logger.info('Processing question', { sessionId, userLevel });

    try {
      const response = await electionAssistantService.generateResponse(
        sanitizedQuestion,
        sessionId,
        userLevel as 'beginner' | 'intermediate' | 'advanced',
      );

      res.status(200).json({
        success: true,
        data: response,
      });
    } catch (error) {
      logger.error('Error in /ask endpoint', { error });
      throw new AppError(500, 'GENERATION_ERROR', 'Failed to generate response. Please try again.');
    }
  }),
);

// Get election timeline
router.get(
  '/timeline/:election/:year',
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { election, year } = req.params;
    const userLevel = (req.query.userLevel as string) || 'intermediate';

    if (!election || !year) {
      throw new AppError(400, 'MISSING_PARAMS', 'Election and year parameters are required');
    }

    const response = await electionAssistantService.getElectionTimeline(
      sanitizeInput(election),
      sanitizeInput(year),
      userLevel as 'beginner' | 'intermediate' | 'advanced',
    );

    res.status(200).json({
      success: true,
      data: response,
    });
  }),
);

// Explain a process
router.post(
  '/explain',
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { process: processName, userLevel = 'beginner' } = req.body;

    if (!processName) {
      throw new AppError(400, 'MISSING_PROCESS', 'Process name is required');
    }

    const response = await electionAssistantService.explainElectionProcess(
      sanitizeInput(processName),
      userLevel as 'beginner' | 'intermediate' | 'advanced',
    );

    res.status(200).json({
      success: true,
      data: response,
    });
  }),
);

// Get voting methods
router.get(
  '/voting-methods',
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const userLevel = (req.query.userLevel as string) || 'beginner';

    const response = await electionAssistantService.getVotingMethods(
      userLevel as 'beginner' | 'intermediate' | 'advanced',
    );

    res.status(200).json({
      success: true,
      data: response,
    });
  }),
);

// Get conversation history
router.get(
  '/history/:sessionId',
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { sessionId } = req.params;

    const history = electionAssistantService.getConversationHistory(sessionId);

    if (!history) {
      throw new AppError(404, 'SESSION_NOT_FOUND', 'No conversation history found for this session');
    }

    res.status(200).json({
      success: true,
      data: history,
    });
  }),
);

// Clear conversation history
router.delete(
  '/history/:sessionId',
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { sessionId } = req.params;

    electionAssistantService.clearConversationHistory(sessionId);

    res.status(200).json({
      success: true,
      message: 'Conversation history cleared',
    });
  }),
);

// Feedback endpoint for accessibility and improvement
router.post(
  '/feedback',
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { sessionId, rating, feedback, email } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      throw new AppError(400, 'INVALID_RATING', 'Rating must be between 1 and 5');
    }

    if (email && !isValidEmail(email)) {
      throw new AppError(400, 'INVALID_EMAIL', 'Please provide a valid email address');
    }

    logger.info('Feedback received', { sessionId, rating, feedback });

    res.status(201).json({
      success: true,
      message: 'Thank you for your feedback!',
      data: {
        sessionId,
        rating,
        feedbackReceived: true,
      },
    });
  }),
);

export default router;
