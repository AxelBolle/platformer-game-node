import Phaser from 'phaser-ce'

export default class extends Phaser.State {
  init () {

  }
  preload () {
    this.game.time.advancedTiming = true;
  }
  create () {
    // Start Physics
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // Map Setup
    this.game.stage.backgroundColor = 0x4488cc;
    this.map = this.game.add.tilemap('map');
    this.map.addTilesetImage('mapTiles', 'tiles');
    this.map.addTilesetImage('powerups', 'powerups');

    // Map Layers
    this.groundLayer = this.map.createLayer('Collision');
    this.backgroundLayer = this.map.createLayer('Background');

    // Collision
    this.map.setCollisionBetween(1, 100, true, 'Collision');

    // Beer meter
    this.beers = this.game.add.group();
    this.beers.enableBody = true;
    this.beerMeter = game.add.text(100, 100, "Beers: ")
    this.beerMeter.fixedToCamera = true;
    // Food meter
    this.food = this.game.add.group();
    this.food.enableBody = true;
    // Enemies
    this.enemies = this.game.add.group();
    this.enemies.enableBody = true;
    // Objects
    this.map.createFromObjects('Powerups', 76, 'powerups', 0, true, false, this.food);
    this.map.createFromObjects('Powerups', 77, 'powerups', 1, true, false, this.beers);
    this.map.createFromObjects('Enemies', 78, 'enemies', 0, true, false, this.enemies);
    this.map.createFromObjects('Enemies', 79, 'enemies', 1, true, false, this.enemies);
    // Object Gravity
    this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
    this.enemies.setAll('anchor.set', 0.5,0.5);
    this.enemies.setAll('body.bounce.x', 1);
    this.enemies.setAll('body.bounce.y', 0.2);
    this.enemies.setAll('body.gravity.y', 1000);
    this.enemies.setAll('body.velocity.x', 200);

    // World Resize
    this.groundLayer.resizeWorld();

    // Sprites
    this.player = this.game.add.sprite(50, 450, 'edward');
    this.game.physics.arcade.enable(this.player);
    this.player.animations.add('walk');
    this.player.anchor.set(0.5, 0.5);
    this.player.body.bounce.y = 0.2;
    this.player.body.gravity.y = 2000;
    this.player.body.gravity.x = 20;
    this.player.body.velocity.x = 100;

    // Weapon
    this.weapon = this.game.add.weapon(1, 'beer');
    this.weapon.allowGravity = true;
    this.weapon.bulletSpeed = 900;
    this.weapon.bulletGravity.set(1000);
    this.weapon.trackSprite(this.player, 0, -5, false);
    // Camera
    // this.game.camera.follow(this.player);
    this.style = 'STYLE_PLATFORMER';
    // Lights
    this.shadowTexture = this.game.add.bitmapData(this.map.width*32, this.map.height*32);
    this.lightSprite = this.game.add.image(0, 0, this.shadowTexture);
    this.lightSprite.blendMode = Phaser.blendModes.MULTIPLY;

    // Scoring
    this.beerCounter = 0
    this.foodCounter = 0
    // Input
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.xKey = game.input.keyboard.addKey(Phaser.Keyboard.X);
    this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);
  }
  update(){
    // Camera
    this.camera.focusOnXY(this.player.position.x, (this.player.position.y - 300))

    // // Apply Shadow Texture
    // this.updateShadowTexture(this.sprite, 300);

    // Collision
    this.game.physics.arcade.collide(this.player, this.groundLayer);
    this.game.physics.arcade.collide(this.enemies, this.groundLayer);
    this.game.physics.arcade.collide(this.enemies, this.enemies);
    this.game.physics.arcade.overlap(this.player, this.beers, this.collectBeer, null, this);
    this.game.physics.arcade.overlap(this.player, this.food, this.collectFood, null, this);
    this.game.physics.arcade.collide(this.weapon.bullets, this.groundLayer, this.hitEnemy, null, this);
    this.game.physics.arcade.collide(this.player, this.enemies, this.killEnemy, null, this);

    // Change fire Direction
    if (this.xKey.isDown && this.beerCounter >= 1) {
      if (this.player.scale.x == 1) {
        this.weapon.bulletAngleOffset = 0;
        this.weapon.fireAngle = Phaser.ANGLE_RIGHT;
        this.weapon.fireOffset(-10, 0);
      } else if (this.player.scale.x == -1) {
        this.weapon.bulletAngleOffset = 180;
        this.weapon.fireAngle = Phaser.ANGLE_LEFT;
        this.weapon.fireOffset(10, 0);
      }
      this.beerCounter--
      this.weapon.fire();

    }
    // Player Movement
    // Make Player stand still if not actively moving
    this.player.body.velocity.x = 0;

    if (this.cursors.down.isDown) {
      this.player.body.velocity.y = 150;
    }
    if (this.spaceKey.isDown && this.player.body.onFloor()) {
      this.player.body.velocity.y = -700;
    }
    if (this.player.body.velocity.y >= 800) {
        this.player.body.velocity.y = 800;
    }
    if (this.cursors.left.isDown){
      // Flip Direction of the Sprite Positive for Right Facing Negative for Left Facing
      this.player.scale.x = -1;
      this.player.body.velocity.x = -350;
      this.player.animations.play('walk', 10, true);
    } else if (this.cursors.right.isDown){
      // Flip Direction of the Sprite Positive for Right Facing Negative for Left Facing
      this.player.scale.x = 1;
      this.player.body.velocity.x = 350;
      this.player.animations.play('walk', 10, true);
    } else {
      this.player.body.velocity.x = 0;
      this.player.animations.stop();
    }
    this.updateBeerMeter()
  }
  render () {

  }
  killEnemy(player, enemy) {
    console.log(player.body.touching);
    if (player.body.touching.down == true) {
      enemy.kill()
    } else {
      player.kill()
    }
  }
  hitEnemy(bullet, groundLayer) {
    let facing = (this.player.scale.x == 1) ? "right" : "left"
    let tiledX = Math.round(bullet.x/32);
    let tiledY = Math.round(bullet.y/(32));
    if (facing == "right") {
      this.map.removeTile(tiledX+1, tiledY-2, this.groundLayer)
      this.map.removeTile(tiledX+1, tiledY-1, this.groundLayer)
      this.map.removeTile(tiledX+1, tiledY, this.groundLayer)
      this.map.removeTile(tiledX+2, tiledY-2, this.groundLayer)
      this.map.removeTile(tiledX+2, tiledY-1, this.groundLayer)
      this.map.removeTile(tiledX+2, tiledY, this.groundLayer)
      this.map.removeTile(tiledX+3, tiledY-2, this.groundLayer)
      this.map.removeTile(tiledX+3, tiledY-1, this.groundLayer)
      this.map.removeTile(tiledX+3, tiledY, this.groundLayer)
    }
    if (facing == "left") {
      this.map.removeTile(tiledX-1, tiledY-2, this.groundLayer)
      this.map.removeTile(tiledX-1, tiledY-1, this.groundLayer)
      this.map.removeTile(tiledX-1, tiledY, this.groundLayer)
      this.map.removeTile(tiledX-2, tiledY-2, this.groundLayer)
      this.map.removeTile(tiledX-2, tiledY-1, this.groundLayer)
      this.map.removeTile(tiledX-2, tiledY, this.groundLayer)
      this.map.removeTile(tiledX-3, tiledY-2, this.groundLayer)
      this.map.removeTile(tiledX-3, tiledY-1, this.groundLayer)
      this.map.removeTile(tiledX-3, tiledY, this.groundLayer)
    }
    bullet.kill()
  }
  collectBeer(player, beer) {
    beer.kill();
    this.beerCounter++;
    this.bier = this.game.add.audio('einBeer');
    this.bier.play();
  }
  collectFood(player, food) {
    food.kill();
    this.foodCounter++;
  }
  updateShadowTexture (whatToGiveLightTo, LIGHT_RADIUS) {
    this.shadowTexture.context.fillStyle = 'rgb(0, 0, 0)';
    this.shadowTexture.context.fillRect(0, 0, (this.map.width*32), (this.map.width*32))
    this.shadowTexture.context.beginPath();
    this.shadowTexture.context.fillStyle = 'rgb(255, 255, 255)';
    this.shadowTexture.context.arc(whatToGiveLightTo.x, whatToGiveLightTo.y, LIGHT_RADIUS, 0, Math.PI*2);
    this.shadowTexture.context.fill()
    this.shadowTexture.dirty = true;
    // this.shadowTexture.context.arc(this.game.input.x + this.camera.x, this.game.input.y + this.camera.y, this.LIGHT_RADIUS, 0, Math.PI*2);
    // This just tells the engine it should update the texture cache
  };
  updateBeerMeter (){
    this.beerMeter.setText('Beers: ' + this.beerCounter)
  }
}
