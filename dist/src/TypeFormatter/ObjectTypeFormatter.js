"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AnyType_1 = require("../Type/AnyType");
const BaseType_1 = require("../Type/BaseType");
const ObjectType_1 = require("../Type/ObjectType");
const UndefinedType_1 = require("../Type/UndefinedType");
const UnionType_1 = require("../Type/UnionType");
const allOfDefinition_1 = require("../Utils/allOfDefinition");
const derefType_1 = require("../Utils/derefType");
const preserveAnnotation_1 = require("../Utils/preserveAnnotation");
const removeUndefined_1 = require("../Utils/removeUndefined");
const uniqueArray_1 = require("../Utils/uniqueArray");
class ObjectTypeFormatter {
    constructor(childTypeFormatter) {
        this.childTypeFormatter = childTypeFormatter;
    }
    supportsType(type) {
        return type instanceof ObjectType_1.ObjectType;
    }
    getDefinition(type) {
        const types = type.getBaseTypes();
        if (types.length === 0) {
            return this.getObjectDefinition(type);
        }
        return types.reduce(allOfDefinition_1.getAllOfDefinitionReducer(this.childTypeFormatter, false), this.getObjectDefinition(type));
    }
    getChildren(type) {
        const properties = type.getProperties();
        const additionalProperties = type.getAdditionalProperties();
        const children = [
            ...type
                .getBaseTypes()
                .reduce((result, baseType) => [
                ...result,
                ...this.childTypeFormatter.getChildren(baseType).slice(1),
            ], []),
            ...(additionalProperties instanceof BaseType_1.BaseType
                ? this.childTypeFormatter.getChildren(additionalProperties)
                : []),
            ...properties.reduce((result, property) => [
                ...result,
                ...this.childTypeFormatter.getChildren(property.getType()),
            ], []),
        ];
        return uniqueArray_1.uniqueArray(children);
    }
    getObjectDefinition(type) {
        const objectProperties = type.getProperties();
        const additionalProperties = type.getAdditionalProperties();
        const preparedProperties = objectProperties.map(property => this.prepareObjectProperty(property));
        const required = preparedProperties
            .filter(property => property.isRequired())
            .map(property => property.getName());
        const properties = preparedProperties.reduce((result, property) => (Object.assign(Object.assign({}, result), { [property.getName()]: this.childTypeFormatter.getDefinition(property.getType()) })), {});
        return Object.assign(Object.assign(Object.assign({ type: "object" }, (Object.keys(properties).length > 0 ? { properties } : {})), (required.length > 0 ? { required } : {})), (additionalProperties === true || additionalProperties instanceof AnyType_1.AnyType
            ? {}
            : {
                additionalProperties: additionalProperties instanceof BaseType_1.BaseType
                    ? this.childTypeFormatter.getDefinition(additionalProperties)
                    : additionalProperties,
            }));
    }
    prepareObjectProperty(property) {
        const propertyType = property.getType();
        const propType = derefType_1.derefType(propertyType);
        if (propType instanceof UndefinedType_1.UndefinedType) {
            return new ObjectType_1.ObjectProperty(property.getName(), propertyType, false);
        }
        else if (!(propType instanceof UnionType_1.UnionType)) {
            return property;
        }
        const { newType: newPropType, numRemoved } = removeUndefined_1.removeUndefined(propType);
        if (numRemoved == 0) {
            return property;
        }
        return new ObjectType_1.ObjectProperty(property.getName(), preserveAnnotation_1.preserveAnnotation(propertyType, newPropType), false);
    }
}
exports.ObjectTypeFormatter = ObjectTypeFormatter;
//# sourceMappingURL=ObjectTypeFormatter.js.map