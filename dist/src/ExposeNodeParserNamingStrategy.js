"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
exports.ExposeNamingStrategies = new Map();
const defaultStrategy = (node, context, typeChecker) => {
    const symbol = __1.symbolAtNode(node);
    const fullName = typeChecker.getFullyQualifiedName(symbol).replace(/^".*"\./, "");
    const argumentIds = context.getArguments().map(arg => arg.getName());
    return argumentIds.length ? `${fullName}<${argumentIds.join(",")}>` : fullName;
};
const alpanumericStrategy = (node, context, typeChecker) => {
    return defaultStrategy(node, context, typeChecker).replace(/[^A-Za-z0-9]/g, "");
};
exports.ExposeNamingStrategies.set("default", defaultStrategy);
exports.ExposeNamingStrategies.set("alphanumeric", alpanumericStrategy);
//# sourceMappingURL=ExposeNodeParserNamingStrategy.js.map