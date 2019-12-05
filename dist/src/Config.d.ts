import { BaseType } from "./Type/BaseType";
export interface Config {
    path?: string;
    type?: string;
    tsconfig?: string;
    expose: "all" | "none" | "export";
    definitionNameFormatter?: (name: string, type: BaseType) => string;
    topRef: boolean;
    jsDoc: "none" | "extended" | "basic";
    sortProps?: boolean;
    strictTuples?: boolean;
    skipTypeCheck?: boolean;
    extraTags?: string[];
}
export declare const DEFAULT_CONFIG: Config;
