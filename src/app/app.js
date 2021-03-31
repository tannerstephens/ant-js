import { Ant } from './ant/ant';

import {
  Application, Container, ParticleContainer
} from 'pixi.js';

class App extends Application {
  /**
   * @param {Object} options
   */
  constructor(options) {
    super(options);

    const root = document.getElementById('root');
    root.parentNode.replaceChild(this.view, root);
    this.view.setAttribute('id', 'root');

    this.options = options;
  }

  run() {
    const ants = this.generateAnts();

    this.ticker.add(delta => {
      ants.forEach(ant => {
        ant.tick();
      })
    });
  }

  generateAnts() {
    const { numAnts = 10, pheromoneAge = 10 } = this.options;

    this.pheromoneContainer = new ParticleContainer(numAnts*pheromoneAge/10, {
      tint: true,
      position: true
    });
    this.stage.addChild(this.pheromoneContainer);

    return Array.from(new Array(numAnts)).map((_, i) => {
      const ant = new Ant(this, pheromoneAge, this.pheromoneContainer);

      this.stage.addChild(ant);

      return ant;
    });
  }
}

export default App;
