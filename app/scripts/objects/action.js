export default class Action extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, health=0, fun=0) {
    super(scene, x, y, texture);

    this.setOrigin(0.5);
    this.setInteractive();
    this.isBlocked = false;

    this.health = health;
    this.fun = fun;
  }

  pickItem(isSetSelected=true) {
    if (!this.isBlocked) {
      this.clearSelection();
      this.setAlpha(0.5);

      if (isSetSelected) {
        this.scene.selectItem(this);
      }
    }
  }

  clearSelection() {
    this.scene.actionButtons.forEach((button) => {
      button.setAlpha(1);
      this.scene.selectItem(null);
    });
  }


}
