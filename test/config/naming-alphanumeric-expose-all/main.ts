interface GenericInterface<T> {
    privateValue: T;
}

interface BaseInterface {
    field1: number;
    field2: string;
    field3: string;
}

interface Picked extends Omit<BaseInterface, "field1" | "field3"> {}

export interface MyObject {
    stringGenericInterface: GenericInterface<string>;
    pick: Picked;
}
