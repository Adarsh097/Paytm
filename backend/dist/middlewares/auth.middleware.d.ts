import type { NextFunction, Request, Response } from "express";
import type { JwtPayload } from "jsonwebtoken";
export interface authRequest extends Request {
    userId?: string | JwtPayload;
}
declare const authMiddleware: (req: authRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export default authMiddleware;
//# sourceMappingURL=auth.middleware.d.ts.map