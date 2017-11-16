export default class extends Phaser.State {
  init () {}

  preload () {
  }
  create () {
    this.backgroundImage = game.add.sprite(0, 0, 'backgroundImage');
    this.quakeModeOption = false;
    let style = {align: "center", font: "50px Arial", fill: '#ffffff'}
    this.menuItem1 = game.add.text(this.game.world.centerX, this.game.world.centerY, 'QuakeMode : Off', style)
    this.menuItem2 = game.add.text(this.game.world.centerX, this.game.world.centerY + this.menuItem1.height*2, 'Spela', style)
    this.menuItem1.anchor.setTo(0.5, 0.5)
    this.menuItem1.inputEnabled = true
    this.menuItem1.events.onInputOver.add(hover, this);this.menuItem1.events.onInputOut.add(out, this);
    this.menuItem2.anchor.setTo(0.5, 0.5)
    this.menuItem2.inputEnabled = true
    this.menuItem2.events.onInputOver.add(hover, this);this.menuItem2.events.onInputOut.add(out, this);

    this.menuItem1.events.onInputDown.add(this.quakeMode, this);
    this.menuItem2.events.onInputDown.add(this.startGame, this);

    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    function hover(menuItem) {
      menuItem.addColor('#f4f142', 0)
    }
    function out(menuItem) {
      menuItem.addColor('#ffffff', 0)
    }
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
  quakeMode(){
    console.log("hello");
    console.log(this.quakeModeOption);
    if (this.quakeModeOption) {
      this.quakeModeOption = false;
      this.menuItem1.setText("QuakeMode : Off")
    } else {
      this.quakeModeOption = true;
      this.menuItem1.setText("QuakeMode : On")
    }

  }
}
