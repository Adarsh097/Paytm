declare const controllers: {
    authControllers: {
        registration: (req: import("express").Request, res: import("express").Response) => Promise<import("express").Response<any, Record<string, any>> | undefined>;
        signin: (req: import("express").Request, res: import("express").Response) => Promise<import("express").Response<any, Record<string, any>> | undefined>;
    };
};
export default controllers;
//# sourceMappingURL=index.d.ts.map