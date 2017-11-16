export default class extends Phaser.State {
  init () {}

  preload () {
  }
  create () {
    this.backgroundImage = game.add.sprite(0, 0, 'backgroundImage');
    this.backgroundImageChoose = game.add.sprite(175, 0, 'evilFace');
    this.backgroundImageChoose.alpha = 0
    this.backgroundImageChoose.inputEnabled = true;
    this.backgroundImageChoose.events.onInputDown.add(this.startGame, this);
    this.backgroundImageChoose.events.onInputOver.add(this.hover, this);
    this.backgroundImageChoose.events.onInputOut.add(this.out, this);

    this.cogwheel = game.add.sprite(1075, 20, 'cogwheel');
    this.cogwheel.inputEnabled = true;
    this.cogwheel.alpha = 0.4
    this.cogwheel.events.onInputDown.add(this.optionsMenu, this);
    this.cogwheel.events.onInputOver.add(this.hoverOptions, this);
    this.cogwheel.events.onInputOut.add(this.outOptions, this);



    this.backgroundMusic = this.game.add.audio('backgroundMusic');
    this.backgroundMusic.volume = 0.1;
    // this.backgroundMusic.play()
    this.backgroundMusic.loopFull()
    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  }
  render () {
    // this.state.start('Game')
    if (this.spaceKey.isDown) {
      this.state.start('Game')
    }
  }
  startGame() {
    this.state.start('Game')
  }
  optionsMenu() {
    this.state.start('Options')
  }
  hover(menuItem) {
    console.log("hello");
    this.backgroundImageChoose.alpha = 1;
  }
  out(menuItem) {
    this.backgroundImageChoose.alpha = 0;
  }
  hoverOptions(menuItem) {
    console.log("hello");
    this.cogwheel.alpha = 1;
  }
  outOptions(menuItem) {
    this.cogwheel.alpha = 0.4;
  }
}
