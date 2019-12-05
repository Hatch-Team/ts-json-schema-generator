import * as ts from "typescript";
import { Context } from "./NodeParser";
import { symbolAtNode } from "..";

export type ExposeNamingStrategyFunction = (node: ts.Node, context: Context, typeChecker: ts.TypeChecker) => string;
export type ExposeNamingStrategyNames = "default" | "alphanumeric";
export const ExposeNamingStrategies = new Map<ExposeNamingStrategyNames, ExposeNamingStrategyFunction>();

const defaultStrategy = (node: ts.Node, context: Context, typeChecker: ts.TypeChecker) => {
    const symbol = symbolAtNode(node)!;
    const fullName = typeChecker.getFullyQualifiedName(symbol).replace(/^".*"\./, "");
    const argumentIds = context.getArguments().map(arg => arg.getName());

    return argumentIds.length ? `${fullName}<${argumentIds.join(",")}>` : fullName;
};

const alpanumericStrategy = (node: ts.Node, context: Context, typeChecker: ts.TypeChecker) => {
    return defaultStrategy(node, context, typeChecker).replace(/[^A-Za-z0-9]/g, "");
};

ExposeNamingStrategies.set("default", defaultStrategy);
ExposeNamingStrategies.set("alphanumeric", alpanumericStrategy);
