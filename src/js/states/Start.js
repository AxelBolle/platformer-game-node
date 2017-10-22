export default class extends Phaser.State {
  init () {}

  preload () {
  }
  create () {
    let style = {align: "center", font: "50px Arial", fill: '#ffffff'}
    let menu = []
    let menuItem1 = game.add.text(this.game.world.centerX, this.game.world.centerY, 'Play', style)
    let menuItem2 = game.add.text(this.game.world.centerX, this.game.world.centerY + menuItem1.height, 'Levels', style)
    let menuItem3 = game.add.text(this.game.world.centerX, this.game.world.centerY + menuItem1.height*2, 'Options', style)
    menu.push(menuItem1, menuItem2, menuItem3)
    menu.forEach(function(menuItem){
      menuItem.anchor.setTo(0.5, 0.5)
      menuItem.inputEnabled = true
      menuItem.events.onInputOver.add(hover, this);menuItem.events.onInputOut.add(out, this);
    });
    menuItem1.events.onInputDown.add(startGame, this);


    function startGame() {
      this.state.start('Game')
    }
    function hover(menuItem) {
      menuItem.addColor('#f4f142', 0)
    }
    function out(menuItem) {
      menuItem.addColor('#ffffff', 0)
    }
  }
  render () {
    this.state.start('Game')
    // game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && this.state.start('Game')
    // game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && this.sky.tilePosition.x--
  }
}
