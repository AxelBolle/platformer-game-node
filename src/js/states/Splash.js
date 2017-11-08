export default class extends Phaser.State {
  init () {}

  preload () {
    game.load.spritesheet('edward', 'assets/images/sprites/edward.png', 32, 64);
    game.load.spritesheet('powerups', 'assets/images/sprites/powerups.png', 32, 64);
    game.load.spritesheet('enemies', 'assets/images/sprites/enemies.png', 32, 64);
    game.load.image('beer', 'assets/images/sprites/beer.png', 16, 32);
    game.load.image('milk', 'assets/images/sprites/laktosfri.png', 32, 64);
    game.load.image('becel', 'assets/images/sprites/becel.png', 64, 32);
    game.load.image('tiles', 'assets/images/maps/mapTiles.png');
    game.load.tilemap('map', 'assets/images/maps/edward.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.audio('einBeer', ['assets/audio/1beer.wav']);
  }
  create () {
    this.state.start('Start')
  }
}
