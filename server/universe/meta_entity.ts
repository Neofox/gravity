import * as matter from 'matter-js';

export type Physics = matter.World | matter.Body | matter.Composite | matter.Constraint;

interface IMetaEntityAwarePhysics<T extends Physics> {
    readonly meta: MetaEntity<T>;
}

export abstract class MetaEntity<T extends Physics> {
    public readonly physics: IMetaEntityAwarePhysics<T> & T;

    constructor() {
        const matter = this.synthetize();

        this.physics = { ...matter as any, meta: this };
    }

    protected abstract synthetize(): T;
}
