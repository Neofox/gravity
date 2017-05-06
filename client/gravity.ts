import { Application } from 'pixi.js';
import './realtime/client';
import canvas from './ui/canvas';

//=> Create a Pixi.js application
const app = new Application(0, 0, { view: canvas, autoResize: true });

//=> Handle window resizing
function resizeRenderer(): void {
    app.renderer.resize(window.innerWidth, window.innerHeight);
}

resizeRenderer();
window.addEventListener('resize', resizeRenderer);
