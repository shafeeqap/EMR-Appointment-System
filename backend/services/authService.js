import { findAuthOne } from "../repositories/authRepository.js";
import { findSession } from "../repositories/sesseionRepository.js";
import { compareHash } from "../utils/hashUtils.js";
import { deleteSession } from "./sessionService.js";
import jwt from "jsonwebtoken";
import { logAction } from "../utils/auditLogger.js";
import { AppError } from "../utils/AppError.js";

// =============> Authenticate User Service <=============
export const authenticateUserService = async (data, ip, deviceInfo) => {
  const { email, password } = data;

  const user = await findAuthOne({ email }).select("+password");

  if (!user) {
    await logAction({
      action: "LOGIN_FAILED",
      entity: "User",
      entityId: user?._id,
      metadata: {
        email,
        ip,
        reason: "Usre not found",
      },
    });

    throw new AppError("Invalid email", 401);
  }

  const isMatch = await compareHash(password, user.password);
 
  
  if (!isMatch) {
    await logAction({
      userId: user.id,
      role: user.role,
      action: "LOGIN_FAILED",
      entity: "User",
      entityId: user._id,
      metadata: {
        email,
        ip,
        reason: "Invalid password",
      },
    });

    throw new AppError("Invalid password", 401);
  }

  await logAction({
    userId: user.id,
    role: user.role,
    action: "LOGIN_SUCCESS",
    entity: "User",
    entityId: user._id,
    metadata: { ip },
  });

  const browser = deviceInfo?.browser?.name || "Unknown Browser";
  const os = deviceInfo?.os?.name || "Unknown OS";
  const deviceType = deviceInfo?.device?.type || "desktop";

  user.lastLoginIP = ip;
  user.lastDevice = `${browser} on ${os} (${deviceType})`;
  await user.save();

  return user;
};

// =============> Logout User Service <=============
export const logoutUserService = async (token) => {
  if (!token) {
    throw new AppError("No refresh token", 401);
  }

  const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

  const sessions = await findSession({ userId: decoded.id });

  for (const session of sessions) {
    const isValid = await compareHash(token, session.refreshToken);

    if (isValid) {
      await deleteSession(session._id);
      break;
    }
  }
};
