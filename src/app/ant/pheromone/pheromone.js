import { Graphics, Sprite, Renderer } from 'pixi.js';

let pheromoneTextureCache = null;
/**
 * Creates a new pheromone texture
 * @param {Renderer} renderer
 * @returns
 */
const createPheromoneTexture = renderer => {
  if(pheromoneTextureCache == null) {
    const graphics = new Graphics();

    graphics.beginFill(0xffffff)
      .drawCircle(0,0,2)
      .endFill();

      pheromoneTextureCache = renderer.generateTexture(graphics);
  }
  return pheromoneTextureCache;
};

export class Pheromone extends Sprite {
  constructor(renderer, x, y, age=100, tint=0x0080ff) {
    const texture = createPheromoneTexture(renderer);

    super(texture);

    this.position.set(x, y);
    this.anchor.set(0.5);

    this.age = age;
    this.maxAge = age;

    this.tint = tint;
  }

  tick() {
    this.age -= 1;

    this.alpha = this.age / this.maxAge;
  }

  resetAge() {
    this.age = this.maxAge;
  }
}
