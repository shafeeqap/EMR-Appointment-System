import dotenv from "dotenv";
import { compareHash, hashValue } from "../utils/hashUtils.js";
import {
  createSessionRepo,
  deleteSessionRepo,
  findSession,
} from "../repositories/sesseionRepository.js";
dotenv.config();

// =============> Enforce Session Limit <=============
export const enforceSessionLimit = async (userId) => {
  const MAX_SESSIONS = Number(process.env.MAX_SESSIONS) || 5;

  const sessions = await findSession({ userId }).sort({
    createdAt: 1,
  });

  if (sessions.length >= MAX_SESSIONS) {
    const sessionsToDelete = sessions.slice(
      0,
      sessions.length - MAX_SESSIONS + 1
    );

    for (const session of sessionsToDelete) {
      await deleteSessionRepo({ _id: session._id });
    }
  }
};

// =============> Create Session <=============
export const createSession = async (userId, refreshToken, device) => {
  const hashedToken = await hashValue(refreshToken);

  return await createSessionRepo({
    userId,
    refreshToken: hashedToken,
    device,
  });
};

// =============> Find Validate Session <=============
export const findValidationSession = async (userId, refreshToken) => {
  const sessions = await findSession({ userId });

  for (const session of sessions) {
    const isValid = await compareHash(refreshToken, session.refreshToken);

    if (isValid) {
      return session;
    }
  }

  return null;
};

// =============> Rotate Refresh Token <=============
export const rotateRefreshToken = async (session, newToken) => {
  const hashedToken = await hashValue(newToken);

  session.refreshToken = hashedToken;

  await session.save();
  
};

// =============> Delete Session <=============
export const deleteSession = async (sessionId) => {
  await deleteSessionRepo({ _id: sessionId });
};
