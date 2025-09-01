declare const controllers: {
    authControllers: {
        registration: (req: import("express").Request, res: import("express").Response) => Promise<import("express").Response<any, Record<string, any>> | undefined>;
        signin: (req: import("express").Request, res: import("express").Response) => Promise<import("express").Response<any, Record<string, any>> | undefined>;
    };
    userControlllers: {
        profileUpdate: (req: import("../middlewares/auth.middleware.js").authRequest, res: import("express").Response) => Promise<import("express").Response<any, Record<string, any>>>;
    };
};
export default controllers;
//# sourceMappingURL=index.d.ts.map