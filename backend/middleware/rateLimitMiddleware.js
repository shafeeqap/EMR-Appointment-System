import rateLimit from "express-rate-limit";

// Important assumption: Rate limiting works per IP(same IP), not per user
export const otpLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5, // only 5 requests within 10 min
  message: "Too many OTP requests",
});

export const verifyLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: "Too many verification attempts. Try again later."
});
