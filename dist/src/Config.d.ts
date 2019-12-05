export interface Config {
    path?: string;
    type?: string;
    tsconfig?: string;
    expose: "all" | "none" | "export";
    exposeNamingStrategy?: "default" | "alphanumeric";
    topRef: boolean;
    jsDoc: "none" | "extended" | "basic";
    sortProps?: boolean;
    strictTuples?: boolean;
    skipTypeCheck?: boolean;
    extraTags?: string[];
}
export declare const DEFAULT_CONFIG: Config;
