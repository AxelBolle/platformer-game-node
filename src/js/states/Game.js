export default class extends Phaser.State {
  init () {

  }
  preload () {

  }
  create () {
    //Start the Arcade Physics systems
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    //Change the background colour
    this.game.stage.backgroundColor = "#a9f0ff";

    //Add the tilemap and tileset image. The first parameter in addTilesetImage
    //is the name you gave the tilesheet when importing it into Tiled, the second
    //is the key to the asset in Phaser
    this.map = this.game.add.tilemap('newMap');
    this.map.addTilesetImage('mytiles', 'tiles');

    //Add both the background and ground layers. We won't be doing anything with the
    //GroundLayer though
    this.backgroundlayer = this.map.createLayer('Background');
    this.groundLayer = this.map.createLayer('Collision');

    //Before you can use the collide function you need to set what tiles can collide
    this.map.setCollisionBetween(1, 100, true, 'Collision');

    //Add the sprite to the game and enable arcade physics on it
    this.sprite = this.game.add.sprite(50, this.game.world.centerY, 'guy');
    this.game.physics.arcade.enable(this.sprite);

    //Change the world size to match the size of this layer
    this.groundLayer.resizeWorld();

    //Set some physics on the sprite
    this.sprite.body.bounce.y = 0.2;
    this.sprite.body.gravity.y = 2000;
    this.sprite.body.gravity.x = 20;
    this.sprite.body.velocity.x = 100;

    //Make the camera follow the sprite
    this.game.camera.follow(this.sprite);

    //Enable cursor keys so we can create some controls
    this.cursors = this.game.input.keyboard.createCursorKeys();
  }
  render () {
    console.log(this.sprite.body.velocity.y );
    this.sprite.body.velocity.x = 0;
    if (this.sprite.body.velocity.y >= 800) {
        this.sprite.body.velocity.y = 800;
    }
    this.sprite.body.velocity.x = 0;
    if(this.cursors.up.isDown) {
      this.sprite.body.velocity.y = -500;
    }
    else if (this.cursors.down.isDown)
    {
        this.sprite.body.velocity.y = 150;
    }
    if (this.cursors.left.isDown)
    {
        this.sprite.body.velocity.x = -350;
    }
    else if (this.cursors.right.isDown)
    {
        this.sprite.body.velocity.x = 350;
    }
  }
  update(){
    //Make the sprite collide with the ground layer
    this.game.physics.arcade.collide(this.sprite, this.groundLayer);

  }
}
