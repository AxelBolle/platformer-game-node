export default class extends Phaser.State {
  init () {}

  preload () {
    game.load.spritesheet('edward', 'assets/images/sprites/edward.png', 32, 64);
    game.load.spritesheet('powerups', 'assets/images/sprites/powerups.png', 32, 64);
    game.load.spritesheet('enemies', 'assets/images/sprites/enemies.png', 32, 64);
    game.load.spritesheet('endboss', 'assets/images/sprites/endboss.png', 32, 64);
    game.load.image('scrollingBackgroundImage', 'assets/images/background.png');
    game.load.image('lastboss', 'assets/images/sprites/lastboss.png');
    game.load.image('evilFace', 'assets/images/sprites/stargameEvil.png');
    game.load.image('cogwheel', 'assets/images/sprites/cogwheel.png');
    game.load.image('backgroundImage', 'assets/images/startScreen.png');
    game.load.image('beer', 'assets/images/sprites/beer.png', 16, 32);
    game.load.image('milk', 'assets/images/sprites/laktosfri.png', 32, 64);
    game.load.image('becel', 'assets/images/sprites/becel.png', 64, 32);
    game.load.image('tiles', 'assets/images/maps/mapTiles.png');
    game.load.tilemap('map', 'assets/images/maps/edward.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.audio('einBeer', ['assets/audio/1beer.wav']);
    game.load.audio('quake', ['assets/audio/quake.mp3']);
    game.load.audio('munch', ['assets/audio/munch.wav']);
    game.load.audio('jump', ['assets/audio/jump.wav']);
    game.load.audio('yay', ['assets/audio/yay.mp3']);
    game.load.audio('beerCrash', ['assets/audio/beerCrash.wav']);
    game.load.audio('gameOver', ['assets/audio/gameover.wav']);
    this.game.load.audio('backgroundMusic', ['assets/audio/backgroundMusic.wav']);
  }
  create () {
    // Set base options
    this.game.global = {
      quakeModeOption : false
    }
    this.state.start('Start')
  }
}
