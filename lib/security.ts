// Security utilities for payment processing (Edge-compatible)
// Rate limiting storage (in production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime: number;
}

export function checkRateLimit(
  identifier: string,
  maxRequests: number = 5,
  windowMs: number = 60000
): RateLimitResult {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);

  if (!record || now > record.resetTime) {
    // New window or expired window
    const newRecord = {
      count: 1,
      resetTime: now + windowMs
    };
    rateLimitStore.set(identifier, newRecord);
    
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetTime: newRecord.resetTime
    };
  }

  if (record.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: record.resetTime
    };
  }

  // Increment count
  record.count++;
  rateLimitStore.set(identifier, record);

  return {
    allowed: true,
    remaining: maxRequests - record.count,
    resetTime: record.resetTime
  };
}

// Simple hash function for basic encryption (in production, use proper encryption)
export function simpleHash(data: string): string {
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString(16);
}

// Mask card number for logging
export function maskCardNumber(cardNumber: string): string {
  if (!cardNumber || cardNumber.length < 13) return '****';
  const last4 = cardNumber.slice(-4);
  const first6 = cardNumber.slice(0, 6);
  return `${first6}****${last4}`;
}

// Get BIN (first 6 digits)
export function getCardBin(cardNumber: string): string {
  if (!cardNumber || cardNumber.length < 6) return '';
  return cardNumber.slice(0, 6);
}

// Validate card number (Luhn algorithm)
export function validateCardNumber(cardNumber: string): boolean {
  const sanitized = cardNumber.replace(/\D/g, '');
  
  if (sanitized.length < 13 || sanitized.length > 19) return false;
  
  let sum = 0;
  let isEven = false;
  
  for (let i = sanitized.length - 1; i >= 0; i--) {
    let digit = parseInt(sanitized[i], 10);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
}

// Detect suspicious activity
export interface SuspiciousActivity {
  isSuspicious: boolean;
  reason?: string;
  severity: 'low' | 'medium' | 'high';
}

export function detectSuspiciousActivity(
  userId: string,
  ip: string,
  failedAttempts: number,
  timeWindow: number
): SuspiciousActivity {
  const attemptsPerMinute = failedAttempts / (timeWindow / 60000);
  
  // High severity: More than 10 failed attempts in 1 minute
  if (attemptsPerMinute > 10) {
    return {
      isSuspicious: true,
      reason: 'Çok fazla başarısız ödeme denemesi',
      severity: 'high'
    };
  }
  
  // Medium severity: More than 5 failed attempts in 1 minute
  if (attemptsPerMinute > 5) {
    return {
      isSuspicious: true,
      reason: 'Yüksek sayıda başarısız ödeme denemesi',
      severity: 'medium'
    };
  }
  
  // Low severity: Same IP, different cards pattern
  // This would need database tracking in production
  
  return {
    isSuspicious: false,
    severity: 'low'
  };
}