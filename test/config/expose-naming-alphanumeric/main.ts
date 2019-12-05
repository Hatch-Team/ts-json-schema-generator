interface GenericInterface<T> {
    privateValue: T;
}

export interface MyObject {
    stringGenericInterface: GenericInterface<string>;
}
