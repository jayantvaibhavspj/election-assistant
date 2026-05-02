export interface ElectionQuestion {
  topic: string;
  subtopic?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

export interface AssistantResponse {
  question: string;
  answer: string;
  relatedTopics: string[];
  resources?: string[];
  sources?: string[];
  timestamp: string;
  accuracy_score?: number;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface ConversationContext {
  sessionId: string;
  messages: ChatMessage[];
  currentTopic?: string;
  userLevel?: 'beginner' | 'intermediate' | 'advanced';
  country?: string;
}

export interface ElectionProcessData {
  registrationDeadline: string;
  votingDate: string;
  earlyVotingPeriod?: {
    start: string;
    end: string;
  };
  absenteeBallotDeadline?: string;
  electionOfficers?: string[];
  votingMethods?: string[];
}

export interface APIError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  timestamp: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings?: string[];
}
