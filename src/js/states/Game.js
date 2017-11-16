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

    //Background
    this.scrollingBackground = this.game.add.tileSprite(0, 0, 1366,768, 'scrollingBackgroundImage');
    this.scrollingBackground.fixedToCamera = true;

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
    // Sound
    this.bier = this.game.add.audio('einBeer');
    this.yay = this.game.add.audio('yay');
    this.quake = this.game.add.audio('quake');
    this.quake.volume = 0.2;
    this.munch = this.game.add.audio('munch');
    this.munch.volume = 0.5;
    this.jump = this.game.add.audio('jump');
    this.jump.volume = 0.5;
    this.beerCrash = this.game.add.audio('beerCrash');
    this.beerCrash.volume = 0.5;
    this.gameOverSound = this.game.add.audio('gameOver');
    this.gameOverSound.volume = 0.3
    // Beer meter
    this.beers = this.game.add.group();
    this.beers.enableBody = true;
    // Food
    this.food = this.game.add.group();
    this.food.enableBody = true;
    // Enemies
    this.enemies = this.game.add.group();
    this.enemies.enableBody = true;
    // Endboss
    this.endboss = this.game.add.group();
    this.endboss.enableBody = true;
    // WinGame
    this.wingame = this.game.add.group();
    this.wingame.enableBody = true;
    // Lastboss - waves
    this.lastboss0 = this.game.add.group();
    this.lastboss0.enableBody = true;

    this.lastboss1 = this.game.add.group();
    this.lastboss1.enableBody = true;

    this.lastboss2 = this.game.add.group();
    this.lastboss2.enableBody = true;

    this.lastboss3 = this.game.add.group();
    this.lastboss3.enableBody = true;

    this.lastboss4 = this.game.add.group();
    this.lastboss4.enableBody = true;

    this.lastboss5 = this.game.add.group();
    this.lastboss5.enableBody = true;

    this.lastboss6 = this.game.add.group();
    this.lastboss6.enableBody = true;

    this.lastboss7 = this.game.add.group();
    this.lastboss7.enableBody = true;

    this.lastboss8 = this.game.add.group();
    this.lastboss8.enableBody = true;

    this.lastboss9 = this.game.add.group();
    this.lastboss9.enableBody = true;

    // Objects
    this.map.createFromObjects('Powerups', 76, 'powerups', 0, true, false, this.food);
    this.map.createFromObjects('Powerups', 77, 'powerups', 1, true, false, this.beers);
    this.map.createFromObjects('Enemies', 78, 'enemies', 0, true, false, this.enemies);
    this.map.createFromObjects('Enemies', 79, 'enemies', 1, true, false, this.enemies);
    this.map.createFromObjects('Endboss', 82, 'endboss', 0, true, false, this.endboss);
    this.map.createFromObjects('Endboss', 83, 'endboss', 1, true, false, this.wingame);
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
    // this.player = this.game.add.sprite(4770, 40, 'edward');
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
    this.lightSprite.blendMode = Phaser.blendModes.DARKEN;
    // Meters
    this.beerMeter = game.add.text(100, 100, "Beers: ", { font: "50px Futura", fill: "white", align: "center" });
    this.beerMeter.addColor('#ffffff', 25);
    this.beerMeter.fixedToCamera = true;
    // Food meter
    this.foodMeter = game.add.text(100, 200, "Food: ", { font: "50px Futura", fill: "white", align: "center" });
    this.foodMeter.fixedToCamera = true;
    // Player Alive
    this.playerAlive = true;
    // Scoring
    this.beerCounter = 0
    this.foodCounter = 100
    this.foodCounterPoints = 100
    this.checkWin = false;
    // Input
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.xKey = game.input.keyboard.addKey(Phaser.Keyboard.X);
    this.zKey = game.input.keyboard.addKey(Phaser.Keyboard.Z);
    this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);
    this.game.time.events.repeat(Phaser.Timer.QUARTER,9999999, this.checkBeer, this);
  }
  update(){
    if (this.playerAlive == false) {
      if (this.foodCounter >= 10) {
        this.foodCounter--
      } else {
        this.state.start('Start')
      }
    }
    if (this.checkWin) {
      if (this.lastboss9.children[0].alive == false && this.lastboss9.children[1].alive == false && this.lastboss9.children[2].alive == false && this.lastboss9.children[3].alive == false) {
        this.lowerTheFood()
      }
    }
    // Camera
    this.scrollingBackground.tilePosition.x = this.groundLayer.x * -0.7;
    this.camera.focusOnXY(this.player.position.x, (this.player.position.y - 300))

    // // Apply Shadow Texture
    this.updateShadowTexture(this.player, this.foodCounter*10);

    // Collision
    this.game.physics.arcade.collide(this.player, this.groundLayer);
    this.game.physics.arcade.collide(this.enemies, this.groundLayer);
    this.game.physics.arcade.collide(this.wingame, this.groundLayer);
    this.game.physics.arcade.collide(this.enemies, this.enemies);
    this.game.physics.arcade.overlap(this.player, this.beers, this.collectBeer, null, this);
    this.game.physics.arcade.overlap(this.player, this.food, this.collectFood, null, this);
    this.game.physics.arcade.collide(this.weapon.bullets, this.groundLayer, this.hitEnemy, null, this);
    this.game.physics.arcade.collide(this.player, this.enemies, this.killEnemy, null, this);
    this.game.physics.arcade.collide(this.player, this.endboss, this.endbossReact, null, this);
    this.game.physics.arcade.collide(this.player, this.wingame, this.winTheGame, null, this);
    //Endgame
    this.game.physics.arcade.collide(this.lastboss0, this.groundLayer);
    this.game.physics.arcade.collide(this.player, this.lastboss0, this.killLastboss, null, this);
    //
    this.game.physics.arcade.collide(this.lastboss1, this.groundLayer);
    this.game.physics.arcade.collide(this.player, this.lastboss1, this.killLastboss, null, this);
    //
    this.game.physics.arcade.collide(this.lastboss2, this.groundLayer);
    this.game.physics.arcade.collide(this.player, this.lastboss2, this.killLastboss, null, this);
    //
    this.game.physics.arcade.collide(this.lastboss3, this.groundLayer);
    this.game.physics.arcade.collide(this.player, this.lastboss3, this.killLastboss, null, this);
    //
    this.game.physics.arcade.collide(this.lastboss4, this.groundLayer);
    this.game.physics.arcade.collide(this.player, this.lastboss4, this.killLastboss, null, this);
    //
    this.game.physics.arcade.collide(this.lastboss5, this.groundLayer);
    this.game.physics.arcade.collide(this.player, this.lastboss5, this.killLastboss, null, this);
    //
    this.game.physics.arcade.collide(this.lastboss6, this.groundLayer);
    this.game.physics.arcade.collide(this.player, this.lastboss6, this.killLastboss, null, this);
    //
    this.game.physics.arcade.collide(this.lastboss7, this.groundLayer);
    this.game.physics.arcade.collide(this.player, this.lastboss7, this.killLastboss, null, this);
    //
    this.game.physics.arcade.collide(this.lastboss8, this.groundLayer);
    this.game.physics.arcade.collide(this.player, this.lastboss8, this.killLastboss, null, this);

    this.game.physics.arcade.collide(this.lastboss9, this.groundLayer);
    this.game.physics.arcade.collide(this.player, this.lastboss9, this.killLastboss, null, this);
    //

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
    if (this.zKey.isDown && this.foodCounter >= 1) {
      this.foodCounter--
      this.player.body.velocity.y = -500;
    }
    // Player Movement
    // Make Player stand still if not actively moving
    this.player.body.velocity.x = 0;

    if (this.cursors.down.isDown) {
      this.player.body.velocity.y = 150;
    }
    // Normal mode JUMP
    if (this.spaceKey.isDown && this.player.body.onFloor()) {
      this.player.body.velocity.y = -700;
      if (this.game.state.states['Options'].quakeModeOption) {
        this.quake.play();
      } else {
        this.jump.play()
      }
    }
    // GOD MODE
    // if (this.spaceKey.isDown) {
    //   this.player.body.velocity.y = -700;
    // }
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
  endbossReact(player, enemy){
    enemy.kill()
    this.game.time.events.add(Phaser.Timer.SECOND * 1, this.spawnEnemies0, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 2, this.spawnEnemies1, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 3, this.spawnEnemies2, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 4, this.spawnEnemies3, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 5, this.spawnEnemies4, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 6, this.spawnEnemies5, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 7, this.spawnEnemies6, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 8, this.spawnEnemies7, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 9, this.spawnEnemies8, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 10, this.spawnEnemies9, this);
  }
  spawnEnemies0(){
    for (var i = 0; i < 4; i++) {
      this.lastboss0.create(5100 + Math.random() * 1000, 120 + Math.random() * 200, 'lastboss');
      this.lastboss0.physicsBodyType = Phaser.Physics.ARCADE;
      this.lastboss0.setAll('anchor.set', 0.5,0.5);
      this.lastboss0.setAll('body.bounce.x', 1);
      this.lastboss0.setAll('body.bounce.y', 0.2);
      this.lastboss0.setAll('body.gravity.y', 500);
      this.lastboss0.setAll('body.velocity.x', Math.random() * 200, 250);
    }
  }
  spawnEnemies1(){
    for (var i = 0; i < 4; i++) {
      this.lastboss1.create(5100 + Math.random() * 1000, 120 + Math.random() * 200, 'lastboss');
      this.lastboss1.physicsBodyType = Phaser.Physics.ARCADE;
      this.lastboss1.setAll('anchor.set', 0.5,0.5);
      this.lastboss1.setAll('body.bounce.x', 1);
      this.lastboss1.setAll('body.bounce.y', 0.2);
      this.lastboss1.setAll('body.gravity.y', 500);
      this.lastboss1.setAll('body.velocity.x', Math.random() * -200, -100);
    }
  }
  spawnEnemies2(){
    for (var i = 0; i < 4; i++) {
      this.lastboss2.create(5100 + Math.random() * 1000, 120 + Math.random() * 200, 'lastboss');
      this.lastboss2.physicsBodyType = Phaser.Physics.ARCADE;
      this.lastboss2.setAll('anchor.set', 0.5,0.5);
      this.lastboss2.setAll('body.bounce.x', 1);
      this.lastboss2.setAll('body.bounce.y', 0.2);
      this.lastboss2.setAll('body.gravity.y', 500);
      this.lastboss2.setAll('body.velocity.x', Math.random() * -200, -100);
    }
  }
  spawnEnemies3(){
    for (var i = 0; i < 4; i++) {
      this.lastboss3.create(5100 + Math.random() * 1000, 120 + Math.random() * 200, 'lastboss');
      this.lastboss3.physicsBodyType = Phaser.Physics.ARCADE;
      this.lastboss3.setAll('anchor.set', 0.5,0.5);
      this.lastboss3.setAll('body.bounce.x', 1);
      this.lastboss3.setAll('body.bounce.y', 0.2);
      this.lastboss3.setAll('body.gravity.y', 500);
      this.lastboss3.setAll('body.velocity.x', Math.random() * -200, 200);
    }
  }
  spawnEnemies4(){
    for (var i = 0; i < 4; i++) {
      this.lastboss4.create(5100 + Math.random() * 1000, 120 + Math.random() * 200, 'lastboss');
      this.lastboss4.physicsBodyType = Phaser.Physics.ARCADE;
      this.lastboss4.setAll('anchor.set', 0.5,0.5);
      this.lastboss4.setAll('body.bounce.x', 1);
      this.lastboss4.setAll('body.bounce.y', 0.2);
      this.lastboss4.setAll('body.gravity.y', 500);
      this.lastboss4.setAll('body.velocity.x', Math.random() * -200, 200);
    }
  }
  spawnEnemies5(){
    for (var i = 0; i < 4; i++) {
      this.lastboss5.create(5100 + Math.random() * 1000, 120 + Math.random() * 200, 'lastboss');
      this.lastboss5.physicsBodyType = Phaser.Physics.ARCADE;
      this.lastboss5.setAll('anchor.set', 0.5,0.5);
      this.lastboss5.setAll('body.bounce.x', 1);
      this.lastboss5.setAll('body.bounce.y', 0.2);
      this.lastboss5.setAll('body.gravity.y', 500);
      this.lastboss5.setAll('body.velocity.x', Math.random() * -200, 200);
    }
  }
  spawnEnemies6(){
    for (var i = 0; i < 4; i++) {
      this.lastboss6.create(5100 + Math.random() * 1000, 120 + Math.random() * 200, 'lastboss');
      this.lastboss6.physicsBodyType = Phaser.Physics.ARCADE;
      this.lastboss6.setAll('anchor.set', 0.5,0.5);
      this.lastboss6.setAll('body.bounce.x', 1);
      this.lastboss6.setAll('body.bounce.y', 0.2);
      this.lastboss6.setAll('body.gravity.y', 500);
      this.lastboss6.setAll('body.velocity.x', Math.random() * -200, 200);
    }
  }
  spawnEnemies7(){
    for (var i = 0; i < 4; i++) {
      this.lastboss7.create(5100 + Math.random() * 1000, 120 + Math.random() * 200, 'lastboss');
      this.lastboss7.physicsBodyType = Phaser.Physics.ARCADE;
      this.lastboss7.setAll('anchor.set', 0.5,0.5);
      this.lastboss7.setAll('body.bounce.x', 1);
      this.lastboss7.setAll('body.bounce.y', 0.2);
      this.lastboss7.setAll('body.gravity.y', 500);
      this.lastboss7.setAll('body.velocity.x', Math.random() * -200, 200);
    }
  }
  spawnEnemies8(){
    for (var i = 0; i < 4; i++) {
      this.lastboss8.create(5100 + Math.random() * 1000, 120 + Math.random() * 200, 'lastboss');
      this.lastboss8.physicsBodyType = Phaser.Physics.ARCADE;
      this.lastboss8.setAll('anchor.set', 0.5,0.5);
      this.lastboss8.setAll('body.bounce.x', 1);
      this.lastboss8.setAll('body.bounce.y', 0.2);
      this.lastboss8.setAll('body.gravity.y', 500);
      this.lastboss8.setAll('body.velocity.x', Math.random() * -200, 200);
    }
  }
  spawnEnemies9(){
    for (var i = 0; i < 4; i++) {
      this.lastboss9.create(5100 + Math.random() * 1000, 120 + Math.random() * 200, 'lastboss');
      this.lastboss9.physicsBodyType = Phaser.Physics.ARCADE;
      this.lastboss9.setAll('anchor.set', 0.5,0.5);
      this.lastboss9.setAll('body.bounce.x', 1);
      this.lastboss9.setAll('body.bounce.y', 0.2);
      this.lastboss9.setAll('body.gravity.y', 500);
      this.lastboss9.setAll('body.velocity.x', Math.random() * -200, 200);
      this.checkWin = true;
    }
  }
  winTheGame(player, enemy){
    this.game.state.states['Start'].backgroundMusic.stop()
    player.body.moves = false
    enemy.body.moves = false
    this.yay.play()
    this.game.time.events.add(Phaser.Timer.SECOND * 0.7,this.goToHighScore, this);
  }
  lowerTheFood(){
    this.wingame.physicsBodyType = Phaser.Physics.ARCADE;
    this.wingame.setAll('anchor.set', 0.5,0.5);
    this.wingame.setAll('body.bounce.x', 1);
    this.wingame.setAll('body.bounce.y', 0.2);
    this.wingame.setAll('body.gravity.y', 500);
  }
  goToHighScore(){
    this.foodCounter = 200
    this.state.start('HighScore')
  }
  checkBeer(){
    this.foodCounter--
  }
  killEnemy(player, enemy) {
    if (player.body.touching.down == true) {
      enemy.kill()
      this.player.body.velocity.y = -400;
    } else {
      this.foodCounter = 100
      this.game.state.states['Start'].backgroundMusic.stop()
      player.body.moves = false
      enemy.body.moves = false
      this.gameOverSound.play()
      this.game.time.events.add(Phaser.Timer.SECOND * 0.7, this.gameOver, this);
    }
  }
  killLastboss(player, enemy) {
    if (player.body.touching.down == true) {
      enemy.kill()
      this.player.body.velocity.y = -600;
      this.foodCounter++
    } else {
      this.foodCounter = 100
      this.game.state.states['Start'].backgroundMusic.stop()
      this.player.body.moves = false
      enemy.body.moves = false
      this.gameOverSound.play()
      this.game.time.events.add(Phaser.Timer.SECOND * 0.7, this.gameOver, this);
    }
  }
  gameOver(){
    this.playerAlive = false;

  }
  // Throw Beer
  hitEnemy(bullet, groundLayer) {
    let facing = (this.player.scale.x == 1) ? "right" : "left"
    let tiledX = Math.round(bullet.x/32);
    let tiledY = Math.round(bullet.y/(32));
    this.beerCrash.play()
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
    this.bier.stop();
    this.bier.play();
  }
  collectFood(player, food) {
    food.kill();
    this.munch.stop()
    this.munch.play()
    this.foodCounter += 10;
    this.foodCounterPoints += 10
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
    this.foodMeter.setText('Food: ' + this.foodCounter)
  }
  gameResized(){
    this.game.scale.setUserScale(this.game.width/2, this.game.height/2, 0, 0);
  }
}
