"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
const DefinitionType_1 = require("./Type/DefinitionType");
class ExposeNodeParser {
    constructor(typeChecker, subNodeParser, expose, exposeNamingStrategy) {
        this.typeChecker = typeChecker;
        this.subNodeParser = subNodeParser;
        this.expose = expose;
        this.exposeNamingStrategy = exposeNamingStrategy;
    }
    supportsNode(node) {
        return this.subNodeParser.supportsNode(node);
    }
    createType(node, context, reference) {
        const baseType = this.subNodeParser.createType(node, context, reference);
        if (!this.isExportNode(node)) {
            return baseType;
        }
        return new DefinitionType_1.DefinitionType(this.getDefinitionName(node, context), baseType);
    }
    isExportNode(node) {
        if (this.expose === "all") {
            return node.kind !== ts.SyntaxKind.TypeLiteral;
        }
        else if (this.expose === "none") {
            return false;
        }
        const localSymbol = node.localSymbol;
        return localSymbol ? "exportSymbol" in localSymbol : false;
    }
    getDefinitionName(node, context) {
        return this.exposeNamingStrategy(node, context, this.typeChecker);
    }
}
exports.ExposeNodeParser = ExposeNodeParser;
//# sourceMappingURL=ExposeNodeParser.js.map