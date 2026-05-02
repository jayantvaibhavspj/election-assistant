import { isValidQuestion, isValidEmail, sanitizeInput, isValidElectionData } from '../src/utils/validators';

describe('Validators', () => {
  describe('isValidQuestion', () => {
    it('should validate a valid question', () => {
      const result = isValidQuestion('What is voter registration?');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject empty question', () => {
      const result = isValidQuestion('');
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should reject very short question', () => {
      const result = isValidQuestion('ab');
      expect(result.isValid).toBe(false);
    });

    it('should reject very long question', () => {
      const result = isValidQuestion('a'.repeat(1001));
      expect(result.isValid).toBe(false);
    });
  });

  describe('isValidEmail', () => {
    it('should validate correct email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user@domain.co.uk')).toBe(true);
    });

    it('should reject invalid email addresses', () => {
      expect(isValidEmail('invalid.email')).toBe(false);
      expect(isValidEmail('user@')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
    });
  });

  describe('sanitizeInput', () => {
    it('should sanitize HTML tags', () => {
      const input = '<script>alert("xss")</script>';
      const result = sanitizeInput(input);
      expect(result).not.toContain('<script>');
      expect(result).not.toContain('</script>');
    });

    it('should trim whitespace', () => {
      const input = '  hello world  ';
      const result = sanitizeInput(input);
      expect(result).toBe('hello world');
    });

    it('should escape quotes', () => {
      const input = 'He said "hello"';
      const result = sanitizeInput(input);
      expect(result).toContain('&quot;');
    });
  });

  describe('isValidElectionData', () => {
    it('should validate correct election dates', () => {
      const data = {
        registrationDeadline: '2024-11-05',
        votingDate: '2024-11-05',
      };
      const result = isValidElectionData(data);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid dates', () => {
      const data = {
        registrationDeadline: 'invalid-date',
      };
      const result = isValidElectionData(data);
      expect(result.isValid).toBe(false);
    });
  });
});
