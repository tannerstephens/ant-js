import { Pheromone } from './pheromone/pheromone';

import { Graphics, Sprite, Renderer } from 'pixi.js';

let antTextureCache = null;
/**
 * Creates a new ant texture
 * @param {Renderer} renderer
 * @returns
 */
const createAntTexture = renderer => {
  if(antTextureCache == null) {
    const graphics = new Graphics();

    graphics.beginFill(0xffffff)
      .drawRect(0,0,3,9)
      .endFill();

    antTextureCache = renderer.generateTexture(graphics);
  }

  return antTextureCache;
};

export class Ant extends Sprite {
  constructor(app, pheromoneAge, pheromoneContainer, pTint=0x0080ff) {
    const texture = createAntTexture(app.renderer)

    super(texture);

    this.resetPosition();
    this.anchor.set(0.5);
    this.vx = Math.random()-0.5;
    this.vy = Math.random()-0.5;
    this.app = app;
    this.pheromones = [];
    this.pheromoneAge = pheromoneAge;
    this.pheromoneContainer = pheromoneContainer;
    this.pheromoneCounter = 10;
    this.pheromoneTint = pTint;
  }

  resetPosition() {
    this.position.set(
      Math.random()*innerWidth,
      Math.random()*innerHeight
    );
  }

  tick() {
    if(this.x < 0 || this.x > innerWidth) {
      this.vx = -this.vx;
    }

    if(this.y < 0 || this.y > innerHeight) {
      this.vy = -this.vy;
    }

    this.vx += (Math.random() - 0.5)*0.1;
    this.vy += (Math.random() - 0.5)*0.1;


    this.rotation = -Math.atan2(-this.vy, this.vx) + Math.PI/2;

    const dx = this.vx;
    const dy = this.vy;

    this.x += dx;
    this.y += dy;


    this.pheromoneCounter -= 1;

    this.pheromones.forEach(p => {
      p.tick();
    });

    if(this.pheromoneCounter == 0) {
      if(this.pheromones.length < this.pheromoneAge/10) {
        const p = new Pheromone(this.app.renderer, this.x, this.y, this.pheromoneAge, this.pheromoneTint);
        this.pheromoneContainer.addChild(p);

        this.pheromones.push(p);

        console.log('new')
      } else {
        const back = this.pheromones.splice(0, 1)[0];

        back.x = this.x;
        back.y = this.y;

        back.resetAge();

        this.pheromones.push(back);
      }

      this.pheromoneCounter = 10;
    }
  }
}

export default Ant;
