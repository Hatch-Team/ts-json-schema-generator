import * as ts from "typescript";
import { NodeParser } from "./NodeParser";
import { Schema } from "./Schema/Schema";
import { BaseType } from "./Type/BaseType";
import { TypeFormatter } from "./TypeFormatter";
export declare class SchemaGenerator {
    private readonly program;
    private readonly nodeParser;
    private readonly typeFormatter;
    private readonly nameFormatter;
    constructor(program: ts.Program, nodeParser: NodeParser, typeFormatter: TypeFormatter, nameFormatter: (name: string, type: BaseType) => string);
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
