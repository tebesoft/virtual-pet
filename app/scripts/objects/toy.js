import Action from './action';

export default class Toy extends Action {
  /**
   *  A simple prefab (extended game object class), displaying a spinning
   *  Phaser 3 logo.
   *
   *  @extends Action
   */
  constructor(scene) {
    super(scene, 0, 0, 'toy', 0, 20);

    this.setPosition(216, 570);
    this.on('pointerdown', this.pickItem, this);
  }

  /**
   *  Increment the angle smoothly.
   */
  update() {

  }
}
