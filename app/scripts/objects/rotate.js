import Action from './action';

export default class Rotate extends Action {
  /**
   *  A simple prefab (extended game object class), displaying a spinning
   *  Phaser 3 logo.
   *
   *  @extends Action
   */
  constructor(scene) {
    super(scene, 0, 0, 'rotate');

    this.setPosition(288, 570);
    this.on('pointerdown', this.rotateItem, this);
  }

  update() {
  }

  rotateItem() {
    this.pickItem(false);
    this.scene.blockAllButtons();

    this.scene.tweens.add({
      targets: this.scene.pet,
      angle: '720',
      duration: 1000,
      ease: 'Linear',
      completeDelay: 0,
      onComplete: () =>  {
        this.scene.unblockAllButtons();
        this.clearSelection();
        this.scene.pet.stats.fun += 10;
        this.scene.updateStatText();
      }
    });
  }
}
