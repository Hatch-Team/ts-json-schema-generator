import { Definition } from "../Schema/Definition";
import { SubTypeFormatter } from "../SubTypeFormatter";
import { BaseType } from "../Type/BaseType";
import { DefinitionType } from "../Type/DefinitionType";
import { TypeFormatter } from "../TypeFormatter";
export declare class DefinitionTypeFormatter implements SubTypeFormatter {
    private childTypeFormatter;
    private nameFormatter;
    constructor(childTypeFormatter: TypeFormatter, nameFormatter: (name: string, type: BaseType) => string);
    supportsType(type: DefinitionType): boolean;
    getDefinition(type: DefinitionType): Definition;
    getChildren(type: DefinitionType): BaseType[];
}
