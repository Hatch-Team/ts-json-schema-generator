import * as ts from "typescript";
import { NodeParser } from "./NodeParser";
import { Schema } from "./Schema/Schema";
import { TypeFormatter } from "./TypeFormatter";
export declare class SchemaGenerator {
    private readonly program;
    private readonly nodeParser;
    private readonly typeFormatter;
    constructor(program: ts.Program, nodeParser: NodeParser, typeFormatter: TypeFormatter);
    createSchema(fullName: string | undefined): Schema;
    private getRootNodes;
    private findNamedNode;
    private getRootTypeDefinition;
    private appendRootChildDefinitions;
    private partitionFiles;
    private appendTypes;
    private inspectNode;
    private isExportType;
    private isGenericType;
    private getFullName;
}
