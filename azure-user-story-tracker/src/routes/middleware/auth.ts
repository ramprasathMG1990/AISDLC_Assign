import { Request, Response, NextFunction } from "express";

export function auth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  const hasBearerToken = typeof header === "string" && header.startsWith("Bearer ");
  const devAuth = process.env.ALLOW_DEV_AUTH === "true";
  const hasDevHeaders =
    process.env.NODE_ENV !== "production" &&
    (req.headers["x-user-id"] !== undefined || req.headers["x-roles"] !== undefined);
  const localDevAuth = devAuth || hasDevHeaders;

  if (!localDevAuth && !hasBearerToken) {
    return res.status(401).json({ code: "UNAUTHORIZED", message: "Authentication required" });
  }

  const token = hasBearerToken ? header.slice(7) : undefined;
  const roleHeader = req.headers["x-roles"]?.toString();

  (req as any).identity = {
    sub: localDevAuth ? req.headers["x-user-id"]?.toString() ?? "dev-user" : token ?? "unknown",
    roles: localDevAuth ? roleHeader ? roleHeader.split(",").map((role) => role.trim()).filter(Boolean) : ["creator"] : ["creator"],
  };
  next();
}
