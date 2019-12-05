import * as ts from "typescript";
import { Context } from "./NodeParser";
export declare type ExposeNamingStrategyFunction = (node: ts.Node, context: Context, typeChecker: ts.TypeChecker) => string;
export declare type ExposeNamingStrategyNames = "default" | "alphanumeric";
export declare const ExposeNamingStrategies: Map<"default" | "alphanumeric", ExposeNamingStrategyFunction>;
