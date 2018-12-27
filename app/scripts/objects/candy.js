import Action from './action';

export default class Candy extends Action {
  /**
   *  A simple prefab (extended game object class), displaying a spinning
   *  Phaser 3 logo.
   *
   *  @extends Action
   */
  constructor(scene) {
    super(scene, 0, 0, 'candy', -10, 10);

    this.setPosition(144, 570);
    this.on('pointerdown', this.pickItem, this);
  }

  /**
   *  Increment the angle smoothly.
   */
  update() {

  }
}
