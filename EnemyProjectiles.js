/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class EnemyProjectiles extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume(
        "EnemyBullet1",
        "./EnemyProjectiles/costumes/EnemyBullet1.svg",
        { x: 17.75, y: 4.75 }
      ),
    ];

    this.sounds = [new Sound("pop", "./EnemyProjectiles/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.BROADCAST, { name: "Death" }, this.whenIReceiveDeath),
      new Trigger(Trigger.BROADCAST, { name: "Menu" }, this.whenIReceiveMenu),
      new Trigger(Trigger.CLONE_START, this.startAsClone2),
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }

  *startAsClone() {
    this.visible = true;
    this.goto(
      this.toNumber(this.itemOf(this.stage.vars.enemyprojectile, 0)),
      this.toNumber(this.itemOf(this.stage.vars.enemyprojectile, 1))
    );
    while (
      !(
        this.compare(this.x, -200) < 0 ||
        this.toNumber(this.stage.vars.lives) === 0
      )
    ) {
      this.x -= 15;
      yield;
    }
    this.deleteThisClone();
  }

  *whenIReceiveDeath() {
    this.deleteThisClone();
  }

  *whenIReceiveMenu() {
    this.deleteThisClone();
  }

  *startAsClone2() {
    while (true) {
      if (this.touching(this.sprites["Player"].andClones())) {
        this.stage.vars.lives--;
        this.broadcast("Player Hurt");
        this.deleteThisClone();
      }
      yield;
    }
  }
}
