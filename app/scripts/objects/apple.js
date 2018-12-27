import Action from './action';

export default class Apple extends Action {
  /**
   *  A simple prefab (extended game object class), displaying a spinning
   *  Phaser 3 logo.
   *
   *  @extends Phaser.GameObjects.Sprite
   */
  constructor(scene) {
    super(scene, 0, 0, 'apple', 20, -5);

    this.setPosition(72, 570);
    this.on('pointerdown', this.pickItem, this);
  }

  /**
   *  Increment the angle smoothly.
   */
  update() {

  }
}
