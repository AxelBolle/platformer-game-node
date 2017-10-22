import Phaser from 'phaser-ce'

export default class extends Phaser.State {
  init () {

  }
  preload () {

  }
  create () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.stage.backgroundColor = 0x4488cc;
    this.map = this.game.add.tilemap('map');
    this.map.addTilesetImage('tileset_01', 'tiles');

    this.groundLayer = this.map.createLayer('Collision');

    this.map.setCollisionBetween(1, 100, true, 'Collision');

    this.sprite = this.game.add.sprite(50, this.game.world.centerY, 'guy');
    this.game.physics.arcade.enable(this.sprite);

    this.groundLayer.resizeWorld();

    this.sprite.anchor.set(0.5, 0.5)
    this.sprite.body.bounce.y = 0.2;
    this.sprite.body.gravity.y = 2000;
    this.sprite.body.gravity.x = 20;
    this.sprite.body.velocity.x = 100;

    this.game.camera.follow(this.sprite);

    this.shadowTexture = this.game.add.bitmapData(this.map.width*32, this.map.height*32);
    this.lightSprite = this.game.add.image(0, 0, this.shadowTexture);
    this.lightSprite.blendMode = Phaser.blendModes.MULTIPLY;
    this.cursors = this.game.input.keyboard.createCursorKeys();
  }
  update(){
    this.updateShadowTexture(this.sprite, 300);
    this.game.physics.arcade.collide(this.sprite, this.groundLayer);
    if (this.cursors.down.isDown) {
      this.sprite.body.velocity.y = 150;
    }
    else if(this.cursors.up.isDown) {
      this.sprite.body.velocity.y = -500;
    }
  }
  render () {
    this.sprite.body.velocity.x = 0;
    if (this.sprite.body.velocity.y >= 800) {
        this.sprite.body.velocity.y = 800;
    }
    this.sprite.body.velocity.x = 0;

    if (this.cursors.left.isDown){
        this.sprite.body.velocity.x = -350;
    }
    else if (this.cursors.right.isDown){
        this.sprite.body.velocity.x = 350;
    }
  }
  updateShadowTexture (whatToGiveLightTo, LIGHT_RADIUS) {

      this.shadowTexture.context.fillStyle = 'rgb(0, 0, 0)';
      this.shadowTexture.context.fillRect(0, 0, (this.map.width*32), (this.map.width*32));

      this.shadowTexture.context.beginPath();
      this.shadowTexture.context.fillStyle = 'rgb(255, 255, 255)';
      this.shadowTexture.context.arc(whatToGiveLightTo.x, whatToGiveLightTo.y, LIGHT_RADIUS, 0, Math.PI*2);
      // this.shadowTexture.context.arc(this.game.input.x + this.camera.x, this.game.input.y + this.camera.y, this.LIGHT_RADIUS, 0, Math.PI*2);
      this.shadowTexture.context.fill();

      // This just tells the engine it should update the texture cache
      this.shadowTexture.dirty = true;
  };
}
