import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    game.load.spritesheet('guy', 'assets/images/sprites/guy.png', 32, 62);
    game.load.tilemap('newMap', 'assets/images/maps/newMap.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'assets/images/tilesheets/tileSheet.png');

    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
  }

  create () {
    this.state.start('Start')
  }
}
