require('../styles/main.sass');
import BootState from './states/Boot'
import SplashState from './states/Splash'
import StartMenuState from './states/Start'
import OptionsMenuState from './states/Options'
import HighScoreState from './states/HighScore'
import GameState from './states/Game'

class Game extends Phaser.Game {
  constructor () {

    super(1366, 768, Phaser.CANVAS, 'game', null)
    // super(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'game', null)

    this.state.add('Boot', BootState, false)
    this.state.add('Splash', SplashState, false)
    this.state.add('Start', StartMenuState, false)
    this.state.add('Options', OptionsMenuState, false)
    this.state.add('HighScore', HighScoreState, false)
    this.state.add('Game', GameState, false)

    this.state.start('Boot')
  }
}
window.game = new Game()
