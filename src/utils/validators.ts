import { ElectionProcessData, ValidationResult } from '../types/index.js';

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidQuestion(question: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!question || question.trim().length === 0) {
    errors.push('Question cannot be empty');
  }

  if (question.length < 3) {
    errors.push('Question must be at least 3 characters long');
  }

  if (question.length > 1000) {
    errors.push('Question must be less than 1000 characters');
  }

  if (!question.includes('?') && !question.includes('how') && !question.includes('what') && !question.includes('when')) {
    warnings.push('Question might not be clear - consider rephrasing');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>\"']/g, (match) => {
      const escapeMap: Record<string, string> = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
      };
      return escapeMap[match];
    });
}

export function isValidElectionData(data: Partial<ElectionProcessData>): ValidationResult {
  const errors: string[] = [];

  if (data.registrationDeadline && isNaN(Date.parse(data.registrationDeadline))) {
    errors.push('Invalid registration deadline date');
  }

  if (data.votingDate && isNaN(Date.parse(data.votingDate))) {
    errors.push('Invalid voting date');
  }

  if (data.earlyVotingPeriod) {
    if (isNaN(Date.parse(data.earlyVotingPeriod.start))) {
      errors.push('Invalid early voting start date');
    }
    if (isNaN(Date.parse(data.earlyVotingPeriod.end))) {
      errors.push('Invalid early voting end date');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function formatDateForDisplay(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
}

export function parseTimelineFromText(text: string): Record<string, string> {
  const timeline: Record<string, string> = {};
  const lines = text.split('\n');

  for (const line of lines) {
    if (line.includes(':')) {
      const [key, value] = line.split(':').map((s) => s.trim());
      if (key && value) {
        timeline[key] = value;
      }
    }
  }

  return timeline;
}
