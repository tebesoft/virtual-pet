export default class Pet extends Phaser.GameObjects.Sprite {
  /**
   *  A simple prefab (extended game object class), displaying a spinning
   *  Phaser 3 logo.
   *
   *  @extends Phaser.GameObjects.Sprite
   */
  constructor(scene) {
    super(scene, 0, 0, 'pet', 0);

    const x = scene.cameras.main.width / 2;
    const y = scene.cameras.main.height / 2;

    this.setPosition(x, y);
    this.setOrigin(0.5);
    this.animKeys = {
      eating: 'eating'
    };

    // enable input
    this.setInteractive();

    this.stats = {
      health: 100,
      fun: 100
    };

    this.statsDecreaser = this.scene.time.addEvent({
      delay: 5000,                // ms
      callback: this.reduceStats,
      //args: [],
      callbackScope: this,
      loop: true
    });
  }

  reduceStats() {
    this.stats.health -= 10;
    this.stats.fun -= 15;
    this.scene.updateStatText();
  }

  eatIt(x, y, onAte) {
    this.scene.tweens.add({
      targets: this,
      x: x,
      y: y,
      duration: 800,
      ease: 'Linear',
      completeDelay: 0,
      onComplete: onAte
    });
  }


  /**
   *  Increment the angle smoothly.
   */
  update() {
    if (this.stats.health <= 0 || this.stats.fun <= 0) {
      // set frame to dead
      this.setFrame(4);
      this.scene.blockAllButtons();
      this.scene.time.addEvent({
        delay: 3000,                // ms
        callback: this.scene.gameOver,
        //args: [],
        callbackScope: this.scene,
        loop: true
      });
    }
  }
}
