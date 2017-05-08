import { Bodies, Body, Vector } from 'matter-js';
import { MetaEntity } from './meta_entity';

export class Spaceship extends MetaEntity<Body> {
    protected synthetize(): Body {
        const arrowShape: Vector[] = [{ x: 0, y: 15 }, { x: -10, y: -15 }, { x: 10, y: -15 }];

        return Bodies.fromVertices(0, 0, [arrowShape], { label: 'Spaceship' });
    }
}
