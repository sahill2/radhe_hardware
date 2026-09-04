import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET environment variable is missing in server environment");
  }
  return secret;
}

export interface TokenPayload {
  id: string;
  email: string;
  name: string;
  role: "owner" | "admin";
}

export function signToken(payload: TokenPayload): string {
  const secret = getJwtSecret();
  return jwt.sign(payload, secret, { expiresIn: "7d" });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    const secret = getJwtSecret();
    return jwt.verify(token, secret) as TokenPayload;
  } catch {
    return null;
  }
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function getAdminSession(req?: NextRequest): Promise<TokenPayload | null> {
  let token: string | undefined;

  if (req) {
    const authHeader = req.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    }
    if (!token) {
      token = req.cookies.get("radhe_admin_token")?.value;
    }
  }

  if (!token) {
    try {
      const cookieStore = await cookies();
      token = cookieStore.get("radhe_admin_token")?.value;
    } catch {
      // In route handlers or middleware where cookies() might not be available directly
    }
  }

  if (!token) return null;
  return verifyToken(token);
}
