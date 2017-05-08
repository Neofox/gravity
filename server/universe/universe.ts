import { setInterval, clearInterval } from 'timers';
import { Engine } from 'matter-js';
import { Space } from './space';

export class Universe {
    // .engine and .space are the equivalent of space-time =)
    public readonly engine: Engine;
    public readonly space = new Space();

    private runnerInterval: NodeJS.Timer;

    constructor() {
        this.engine = Engine.create({ world: this.space.physics });
    }

    public run(): void {
        this.runnerInterval = setInterval(this.tick.bind(this), 1000 / 60);
    }

    public tick(): void {
        Engine.update(this.engine);
    }

    public stop(): void {
        clearInterval(this.runnerInterval);
    }
}
