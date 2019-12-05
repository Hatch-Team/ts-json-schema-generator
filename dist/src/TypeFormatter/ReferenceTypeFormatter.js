"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DefinitionType_1 = require("../Type/DefinitionType");
const ReferenceType_1 = require("../Type/ReferenceType");
class ReferenceTypeFormatter {
    constructor(childTypeFormatter, nameFormatter) {
        this.childTypeFormatter = childTypeFormatter;
        this.nameFormatter = nameFormatter;
    }
    supportsType(type) {
        return type instanceof ReferenceType_1.ReferenceType;
    }
    getDefinition(type) {
        return { $ref: "#/definitions/" + this.nameFormatter(type.getName(), type) };
    }
    getChildren(type) {
        if (type.getType() instanceof DefinitionType_1.DefinitionType) {
            return [];
        }
        return this.childTypeFormatter.getChildren(new DefinitionType_1.DefinitionType(type.getName(), type.getType()));
    }
}
exports.ReferenceTypeFormatter = ReferenceTypeFormatter;
//# sourceMappingURL=ReferenceTypeFormatter.js.map