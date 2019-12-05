import { BaseType } from "./BaseType";

export class DefinitionType extends BaseType {
    public constructor(private name: string | undefined, private type: BaseType) {
        super();
    }

    public getId(): string {
        return "def-" + this.type.getId();
    }

    public getName() {
        return this.name ? this.name.replace(/[^A-Za-z0-9]/g, "") : super.getName();
    }

    public getType(): BaseType {
        return this.type;
    }
}
