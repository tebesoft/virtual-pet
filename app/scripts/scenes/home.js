import Background from '@/objects/background';

export default class Home extends Phaser.Scene {

  constructor() {
    super({key: 'Home'});
  }

  init(data) {
    this.message = data.message;
  }

  create() {
    //  We have nothing left to do here. Start the next scene.
    this.background = this.add.existing(new Background(this));
    this.background.on('pointerdown', this.startGame, this);
    this.message = this.message ? this.message : '';

    let style = {
      font: '35px Arial',
      fill: 'white',
      align: 'center'
    };
    this.messageText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY+200, 'Touch to start'.toUpperCase(), style);
    this.messageText.setOrigin(0.5);

    style = {
      font: '35px Arial',
      fill: 'white',
      align: 'center'
    };
    this.gameOverText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY+100, this.message.toUpperCase(), style);
    this.gameOverText.setOrigin(0.5);
  }

  startGame() {

    this.scene.start('Game');
  }
}
