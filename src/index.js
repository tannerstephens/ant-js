import App from './app/app';
import './index.css';

document.addEventListener('DOMContentLoaded', () => {
  const app = new App({
    width: innerWidth,
    height: innerHeight,
    numAnts: 100,
    pheromoneAge: 500,
  });

  app.run();
})
