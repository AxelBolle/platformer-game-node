export default class extends Phaser.State {
  init () {}

  preload () {
  }
  create () {
    game.stage.backgroundColor = "#000000";
    this.HighScore = this.game.state.states['Game'].foodCounterPoints
    console.log(this.HighScore);
    this.text = game.add.text(game.width/2, game.height/2, 'High Score: '+ this.HighScore +' ');

    //	Center align
    this.text.anchor.set(0.5);
    this.text.align = 'center';

    //	Font style
    this.text.font = 'Futura';
    this.text.fontSize = 50;
    this.text.fontWeight = 'bold';

    //	Stroke color and thickness
    this.text.stroke = '#ffffff';
    this.text.strokeThickness = 6;
    this.text.fill = '#000000';
  }
  render () {

  }
}
