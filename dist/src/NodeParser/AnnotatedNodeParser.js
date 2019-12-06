"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
const ExtendedAnnotationsReader_1 = require("../AnnotationsReader/ExtendedAnnotationsReader");
const AnnotatedType_1 = require("../Type/AnnotatedType");
const removeUndefined_1 = require("../Utils/removeUndefined");
const DefinitionType_1 = require("./../Type/DefinitionType");
const UnionType_1 = require("./../Type/UnionType");
class AnnotatedNodeParser {
    constructor(childNodeParser, annotationsReader) {
        this.childNodeParser = childNodeParser;
        this.annotationsReader = annotationsReader;
    }
    supportsNode(node) {
        return this.childNodeParser.supportsNode(node);
    }
    createType(node, context, reference) {
        const baseType = this.childNodeParser.createType(node, context, reference);
        const annotatedNode = this.getAnnotatedNode(node);
        let annotations = this.annotationsReader.getAnnotations(annotatedNode);
        if (node.getSourceFile().fileName.match(/[/\\]typescript[/\\]lib[/\\]lib\.[^/\\]+\.d\.ts$/i)) {
            let specialCase = false;
            if (node.kind === ts.SyntaxKind.TypeAliasDeclaration &&
                node.name.text === "Exclude") {
                let t = context.getArgument("T");
                if (t instanceof UnionType_1.UnionType) {
                    t = removeUndefined_1.removeUndefined(t).newType;
                }
                if (t instanceof DefinitionType_1.DefinitionType) {
                    t = t.getType();
                }
                if (t instanceof AnnotatedType_1.AnnotatedType) {
                    annotations = t.getAnnotations();
                    specialCase = true;
                }
            }
            if (!specialCase) {
                return baseType;
            }
        }
        const nullable = this.getNullable(annotatedNode);
        return !annotations && !nullable ? baseType : new AnnotatedType_1.AnnotatedType(baseType, annotations || {}, nullable);
    }
    getNullable(annotatedNode) {
        return this.annotationsReader instanceof ExtendedAnnotationsReader_1.ExtendedAnnotationsReader
            ? this.annotationsReader.isNullable(annotatedNode)
            : false;
    }
    getAnnotatedNode(node) {
        if (!node.parent) {
            return node;
        }
        else if (node.parent.kind === ts.SyntaxKind.PropertySignature) {
            return node.parent;
        }
        else if (node.parent.kind === ts.SyntaxKind.PropertyDeclaration) {
            return node.parent;
        }
        else if (node.parent.kind === ts.SyntaxKind.IndexSignature) {
            return node.parent;
        }
        else if (node.parent.kind === ts.SyntaxKind.Parameter) {
            return node.parent;
        }
        else {
            return node;
        }
    }
}
exports.AnnotatedNodeParser = AnnotatedNodeParser;
//# sourceMappingURL=AnnotatedNodeParser.js.map