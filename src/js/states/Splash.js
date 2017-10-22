export default class extends Phaser.State {
  init () {}

  preload () {
    game.load.spritesheet('guy', 'assets/images/sprites/guy.png', 64, 32);
    game.load.tilemap('map', 'assets/images/maps/BlackAndWhite.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'assets/images/tilesheets/tilesheet1.png');
  }
  create () {
    this.state.start('Start')
  }
}
