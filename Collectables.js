/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Collectables extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Coin 1", "./Collectables/costumes/Coin 1.svg", {
        x: 25.5,
        y: 25.5,
      }),
      new Costume("Coin 2", "./Collectables/costumes/Coin 2.svg", {
        x: 22.75000000000003,
        y: 25.5,
      }),
      new Costume("Coin 3", "./Collectables/costumes/Coin 3.svg", {
        x: 19.49999999999997,
        y: 25.5,
      }),
      new Costume("Coin 4", "./Collectables/costumes/Coin 4.svg", {
        x: 15.875,
        y: 25.5,
      }),
      new Costume("Coin 5", "./Collectables/costumes/Coin 5.svg", {
        x: 13.124999999999972,
        y: 25.5,
      }),
      new Costume("Coin 6", "./Collectables/costumes/Coin 6.svg", {
        x: 9.125,
        y: 25.5,
      }),
      new Costume("Coin 7", "./Collectables/costumes/Coin 7.svg", {
        x: 4.875,
        y: 25.5,
      }),
      new Costume("Coin 8", "./Collectables/costumes/Coin 8.svg", {
        x: 9.125,
        y: 25.5,
      }),
      new Costume("Coin 9", "./Collectables/costumes/Coin 9.svg", {
        x: 13.124999999999972,
        y: 25.5,
      }),
      new Costume("Coin 10", "./Collectables/costumes/Coin 10.svg", {
        x: 15.875,
        y: 25.5,
      }),
      new Costume("Coin 11", "./Collectables/costumes/Coin 11.svg", {
        x: 19.5,
        y: 25.5,
      }),
      new Costume("Coin 12", "./Collectables/costumes/Coin 12.svg", {
        x: 22.75,
        y: 25.5,
      }),
      new Costume("Coin 13", "./Collectables/costumes/Coin 13.svg", {
        x: 25.5,
        y: 25.5,
      }),
    ];

    this.sounds = [new Sound("Coin", "./Collectables/sounds/Coin.wav")];

    this.triggers = [
      new Trigger(Trigger.BROADCAST, { name: "Menu" }, this.whenIReceiveMenu),
      new Trigger(Trigger.BROADCAST, { name: "Play" }, this.whenIReceivePlay),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.CLONE_START, this.startAsClone2),
      new Trigger(Trigger.CLONE_START, this.startAsClone3),
    ];
  }

  *whenIReceiveMenu() {
    this.visible = false;
    this.deleteThisClone();
  }

  *whenIReceivePlay() {
    yield* this.wait(1);
    while (!(this.compare(this.stage.vars.lives, 1) < 0)) {
      yield* this.wait(this.random(5, 15));
      yield* this.instaclone(5);
      yield;
    }
  }

  *startAsClone() {
    this.visible = true;
    this.goto(230, this.y);
    while (true) {
      this.moveBehind();
      this.costume = "Coin 1";
      while (!(this.costumeNumber === 13)) {
        this.costumeNumber++;
        yield;
      }
      while (!(this.costumeNumber === 1)) {
        this.costume = this.costumeNumber - 1;
        yield;
      }
      yield;
    }
  }

  *instaclone(times) {
    this.y = this.random(170, -170);
    for (let i = 0; i < this.toNumber(times); i++) {
      this.createClone();
      yield* this.wait(0.2);
      yield;
    }
  }

  *startAsClone2() {
    while (!(this.compare(this.x, -230) < 0)) {
      this.x -= 5;
      if (this.touching(this.sprites["Player"].andClones())) {
        this.stage.vars.money++;
        if (this.toNumber(this.stage.vars.soundeffects) === 1) {
          yield* this.startSound("Coin");
        }
        this.deleteThisClone();
      }
      yield;
    }
    this.deleteThisClone();
  }

  *startAsClone3() {
    while (true) {
      while (true) {
        if (this.compare(this.stage.vars.lives, 1) < 0) {
          this.deleteThisClone();
        }
        yield;
      }
      yield;
    }
  }
}
