declare const middlewares: {
    authMiddleware: (req: import("./auth.middleware.js").authRequest, res: import("express").Response, next: import("express").NextFunction) => import("express").Response<any, Record<string, any>> | undefined;
};
export default middlewares;
//# sourceMappingURL=index.d.ts.map