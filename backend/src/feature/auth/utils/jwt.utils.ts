import jwt, { JwtPayload } from "jsonwebtoken";

export type jwtPayload = {
  subjectId: number;
  username: string;
};

type keyType = "access" | "refresh";

export function signJwt(
  jwtPayload: jwtPayload,
  options?: jwt.SignOptions
): string {
  const signingKey = process.env.JWT_SECRET!; //FIXME should be a change later on

  return jwt.sign(jwtPayload, signingKey, {
    ...options,
  });
}

export function verifyJwt(
  token: string,
  keyType: keyType,
  options?: jwt.SignOptions
): {
  valid: boolean;
  expired?: boolean;
  decoded: JwtPayload | string | null;
} {
  const publicKey = process.env.PUBLIC_KEY!; //FIXME should be a change later on
  try {
    const decoded = jwt.verify(token, publicKey, {
      ...(options && options),
    });
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    console.error(e);
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
}
