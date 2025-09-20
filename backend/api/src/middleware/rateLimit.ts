import { RateLimiterMemory } from "rate-limiter-flexible"

export const emailLimiter = new RateLimiterMemory({
  points: 5,
  duration: 600,
});

export const ipLimiter = new RateLimiterMemory({
  points: 50,
  duration: 600,
});