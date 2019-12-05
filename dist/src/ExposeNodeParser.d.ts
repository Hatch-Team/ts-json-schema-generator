import * as ts from "typescript";
import { Context } from "./NodeParser";
import { SubNodeParser } from "./SubNodeParser";
import { BaseType } from "./Type/BaseType";
import { ReferenceType } from "./Type/ReferenceType";
import { ExposeNamingStrategyFunction } from "./ExposeNodeParserNamingStrategy";
export declare class ExposeNodeParser implements SubNodeParser {
    private typeChecker;
    private subNodeParser;
    private expose;
    private exposeNamingStrategy;
    constructor(typeChecker: ts.TypeChecker, subNodeParser: SubNodeParser, expose: "all" | "none" | "export", exposeNamingStrategy: ExposeNamingStrategyFunction);
    supportsNode(node: ts.Node): boolean;
    createType(node: ts.Node, context: Context, reference?: ReferenceType): BaseType;
    private isExportNode;
    private getDefinitionName;
}
