import Pet from '@/objects/pet';
import Apple from '@/objects/apple';
import Candy from '@/objects/candy';
import Rotate from '@/objects/rotate';
import Toy from '@/objects/toy';
import Background from '@/objects/background';

export default class Game extends Phaser.Scene {
  /**
   *  A sample Game scene, displaying the Phaser logo.
   *
   *  @extends Phaser.Scene
   */
  constructor() {
    super({key: 'Game'});
  }

  /**
   *  Called when a scene is initialized. Method responsible for setting up
   *  the game objects of the scene.
   *
   *  @protected
   *  @param {object} data Initialization parameters.
   */
  create(/* data */) {
    //  TODO: Replace this content with really cool game code here :)
    // this.logo = this.add.existing(new Logo(this));
    //this.background = this.add.sprite(0, 0,'backyard');
    this.background = this.add.existing(new Background(this));
    this.background.on('pointerdown', this.placeItem, this);

    this.pet = this.add.existing(new Pet(this));
    this.apple = this.add.existing(new Apple(this));
    this.candy = this.add.existing(new Candy(this));
    this.rotate = this.add.existing(new Rotate(this));
    this.toy = this.add.existing(new Toy(this));

    this.actionButtons = [ this.apple, this.candy, this.rotate, this.toy ];
    this.selectedItem = null;
    this.uiBlocked = false;

    // make pet draggble on scene
    this.input.setDraggable(this.pet);

    // drag object
    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    this.createAnimation(this.pet, this.pet.animKeys.eating, [0, 1, 2, 3, 2, 1, 0], 7, 0);
    this.pet.anims.load(this.pet.animKeys.eating);

    this.showStat();
  }

  createAnimation(sprite, animKey, frames, frameRate, repeat) {
    this.anims.create({
      key: animKey,
      frames: frames.map((frameNum) => ({ key: sprite.texture.key, frame: frameNum })),
      frameRate,
      repeat
    });
  }

  selectItem(item) {
    this.selectedItem = item;
  }

  blockAllButtons() {
    this.uiBlocked = true;
    this.setButtonsBlockState();
  }

  unblockAllButtons() {
    this.uiBlocked = false;
    this.setButtonsBlockState();
  }

  setButtonsBlockState() {
    this.actionButtons.forEach((button) => {
      button.isBlocked = this.uiBlocked;
    });
  }

  placeItem(pointer) {
    let x = pointer.x;
    let y = pointer.y;

    if (this.selectedItem != null && !this.uiBlocked) {
      let food = this.add.sprite(x, y, this.selectedItem.texture.key);

      this.blockAllButtons();
      this.pet.eatIt(x, y, () => {
        this.unblockAllButtons();
        food.destroy();
        this.pet.play(this.pet.animKeys.eating);

        for (let prop in this.selectedItem) {
          if (this.pet.stats.hasOwnProperty(prop)) {
            this.pet.stats[prop] += this.selectedItem[prop];
          }
        }
        this.updateStatText();
      });
    }
  }

  showStat() {
    this.showHealthText();
    this.showFunText();
    this.updateStatText();
  }

  updateStatText() {
    this.healthText.setText(`Health: ${this.pet.stats.health}`);
    this.funText.setText(`Fun: ${this.pet.stats.fun}`);
  }

  showHealthText() {
    var style = {
      font: '20px Arial',
      fill: 'black',
      align: 'center'
    };
    this.healthText = this.add.text(10, 20, '', style);
    this.healthText.setOrigin(0);
    this.healthText.visible = true;
  }

  showFunText() {
    var style = {
      font: '20px Arial',
      fill: 'black',
      align: 'center'
    };
    this.funText = this.add.text(140, 20, '', style);
    this.funText.setOrigin(0);
    this.funText.visible = true;
  }

  gameOver() {
    this.scene.start('Home', { message: 'Game over'});
  }

  /**
   *  Called when a scene is updated. Updates to game logic, physics and game
   *  objects are handled here.
   *
   *  @protected
   *  @param {number} t Current internal clock time.
   *  @param {number} dt Time elapsed since last update.
   */
  update(/* t, dt */) {
    this.pet.update();
  }
}
