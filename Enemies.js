/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Enemies extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Enemy1", "./Enemies/costumes/Enemy1.svg", {
        x: 54.631081927236465,
        y: 46.3251004501482,
      }),
      new Costume("Enemy2", "./Enemies/costumes/Enemy2.svg", {
        x: 81.74933147228623,
        y: 74.96782776381353,
      }),
      new Costume("Enemy3", "./Enemies/costumes/Enemy3.svg", {
        x: 79.27143840846739,
        y: 66.23052195570709,
      }),
      new Costume("Enemy4", "./Enemies/costumes/Enemy4.svg", {
        x: 80.72027499999999,
        y: 62.268685235633924,
      }),
      new Costume("BossGobo", "./Enemies/costumes/BossGobo.svg", {
        x: 47,
        y: 55,
      }),
    ];

    this.sounds = [
      new Sound("pop", "./Enemies/sounds/pop.wav"),
      new Sound("recording1", "./Enemies/sounds/recording1.wav"),
      new Sound("recording2", "./Enemies/sounds/recording2.wav"),
    ];

    this.triggers = [
      new Trigger(Trigger.BROADCAST, { name: "Play" }, this.whenIReceivePlay),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.CLONE_START, this.startAsClone2),
      new Trigger(Trigger.BROADCAST, { name: "Death" }, this.whenIReceiveDeath),
      new Trigger(Trigger.CLONE_START, this.startAsClone3),
      new Trigger(Trigger.CLONE_START, this.startAsClone4),
    ];

    this.vars.enemyspeed = 10;
  }

  *whenIReceivePlay() {
    yield* this.wait(5);
    for (let i = 0; i < 2; i++) {
      this.stage.vars.enemyprojectile.push("");
      yield;
    }
    while (!(this.compare(this.stage.vars.lives, 1) < 0)) {
      if (this.toNumber(this.stage.vars.difficulty) === 0) {
        yield* this.wait(this.random(2, 10));
      } else {
        if (this.toNumber(this.stage.vars.difficulty) === 1) {
          yield* this.wait(this.random(1, 8));
        } else {
          if (this.toNumber(this.stage.vars.difficulty) === 2) {
            yield* this.wait(this.random(0.5, 5));
          }
        }
      }
      this.createClone();
      yield;
    }
    /* TODO: Implement stop other scripts in sprite */ null;
    this.deleteThisClone();
  }

  *startAsClone() {
    this.visible = true;
    this.y = this.random(-140, 140);
    while (
      !(
        this.compare(this.x, -240) < 0 ||
        this.toNumber(this.stage.vars.lives) === 0
      )
    ) {
      this.x += this.toNumber(this.vars.enemyspeed) * -1;
      if (this.touching(this.sprites["PlayerBullets"].andClones())) {
        this.stage.vars.score += 10;
        yield* this.wait(0.01);
        this.deleteThisClone();
      }
      yield;
    }
    this.deleteThisClone();
  }

  *startAsClone2() {
    while (true) {
      if (this.touching(this.sprites["Player"].andClones())) {
        this.stage.vars.lives--;
        this.broadcast("Player Hurt");
        yield* this.wait(3);
      }
      yield;
    }
  }

  *whenIReceiveDeath() {
    this.deleteThisClone();
  }

  *startAsClone3() {
    if (this.compare(this.stage.vars.score, 50) < 0) {
      this.costume = "Enemy1";
    } else {
      if (
        this.compare(this.stage.vars.score, 100) < 0 &&
        this.compare(this.stage.vars.score, 50) > 0
      ) {
        this.costume = this.random(1, 2);
      } else {
        if (
          this.compare(this.stage.vars.score, 150) < 0 &&
          this.compare(this.stage.vars.score, 100) > 0
        ) {
          this.costume = this.random(1, 3);
        } else {
          if (this.compare(this.stage.vars.score, 150) > 0) {
            this.costume = this.random(2, 4);
          } else {
            null;
          }
        }
      }
    }
  }

  *startAsClone4() {
    yield* this.wait(0.01);
    if (this.costumeNumber === 1) {
      this.vars.enemyspeed = 10;
    } else {
      if (this.costumeNumber === 2) {
        this.vars.enemyspeed = 8;
      } else {
        if (this.costumeNumber === 3) {
          this.vars.enemyspeed = 12;
        } else {
          if (this.costumeNumber === 4) {
            this.vars.enemyspeed = 10;
          }
        }
      }
    }
    while (
      !(
        this.compare(this.x, -240) < 0 ||
        this.toNumber(this.stage.vars.lives) === 0
      )
    ) {
      if (this.costumeNumber === 4) {
        yield* this.wait(0.5);
        this.stage.vars.enemyprojectile.splice(0, 0, this.x);
        this.stage.vars.enemyprojectile.splice(1, 0, this.y);
        this.sprites["EnemyProjectiles"].createClone();
      }
      yield;
    }
    this.deleteThisClone();
  }
}
