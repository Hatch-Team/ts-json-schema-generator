"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DefinitionType_1 = require("../Type/DefinitionType");
const uniqueArray_1 = require("../Utils/uniqueArray");
class DefinitionTypeFormatter {
    constructor(childTypeFormatter, nameFormatter) {
        this.childTypeFormatter = childTypeFormatter;
        this.nameFormatter = nameFormatter;
    }
    supportsType(type) {
        return type instanceof DefinitionType_1.DefinitionType;
    }
    getDefinition(type) {
        return { $ref: "#/definitions/" + this.nameFormatter(type.getName(), type) };
    }
    getChildren(type) {
        return uniqueArray_1.uniqueArray([type, ...this.childTypeFormatter.getChildren(type.getType())]);
    }
}
exports.DefinitionTypeFormatter = DefinitionTypeFormatter;
//# sourceMappingURL=DefinitionTypeFormatter.js.map