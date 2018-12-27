export default class Background extends Phaser.GameObjects.Sprite {
  constructor(scene) {
    super(scene, 0, 0, 'backyard');
    this.setOrigin(0, 0);
    this.setInteractive();
  }
}
