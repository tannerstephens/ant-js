import App from './app/app';
import './index.css';

document.addEventListener('DOMContentLoaded', () => {
  const app = new App({
    width: innerWidth,
    height: innerHeight,
    numAnts: Math.floor(innerWidth*innerHeight/11656),
    pheromoneAge: 500,
  });

  app.run();
})
