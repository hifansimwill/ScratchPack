/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Buttons extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Start", "./Buttons/costumes/Start.svg", { x: 99, y: 39 }),
      new Costume("Shop", "./Buttons/costumes/Shop.svg", {
        x: 99,
        y: 39.00000000000003,
      }),
      new Costume("Settings", "./Buttons/costumes/Settings.svg", {
        x: 99,
        y: 39.00000000000003,
      }),
      new Costume("Play Again", "./Buttons/costumes/Play Again.svg", {
        x: 117.63293319782214,
        y: 46.16651505898366,
      }),
      new Costume("Menu", "./Buttons/costumes/Menu.svg", {
        x: 119.11932129401086,
        y: 46.738212817604335,
      }),
      new Costume("Return", "./Buttons/costumes/Return.svg", {
        x: 15.964054912813111,
        y: 18.33855180273622,
      }),
      new Costume("Pause", "./Buttons/costumes/Pause.svg", {
        x: 46.69590994555355,
        y: 46.695909945553524,
      }),
      new Costume("Play", "./Buttons/costumes/Play.svg", {
        x: 46.69590994555355,
        y: 46.695909945553524,
      }),
    ];

    this.sounds = [new Sound("pop", "./Buttons/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.BROADCAST, { name: "Menu" }, this.whenIReceiveMenu),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.CLICKED, this.whenthisspriteclicked),
      new Trigger(Trigger.BROADCAST, { name: "Play" }, this.whenIReceivePlay),
      new Trigger(Trigger.CLONE_START, this.startAsClone2),
      new Trigger(Trigger.BROADCAST, { name: "Death" }, this.whenIReceiveDeath),
      new Trigger(Trigger.BROADCAST, { name: "Shop" }, this.whenIReceiveShop),
      new Trigger(Trigger.BROADCAST, { name: "Shop" }, this.whenIReceiveShop2),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Settings" },
        this.whenIReceiveSettings
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone3),
    ];

    this.vars.clone = 3;
  }

  *whenIReceiveMenu() {
    this.vars.clone = 0;
    this.visible = false;
    for (let i = 0; i < 3; i++) {
      this.vars.clone++;
      this.createClone();
      yield;
    }
  }

  *startAsClone() {
    this.visible = true;
    this.moveAhead();
    while (true) {
      if (this.toNumber(this.vars.clone) === 1) {
        this.costume = "Start";
        this.goto(0, 0);
      }
      if (this.toNumber(this.vars.clone) === 2) {
        this.costume = "Shop";
        this.goto(0, -70);
      }
      if (this.toNumber(this.vars.clone) === 3) {
        this.costume = "Settings";
        this.goto(0, -140);
      }
      if (this.toNumber(this.vars.clone) === 4) {
        this.costume = "Play Again";
        this.goto(0, -30);
      }
      if (this.toNumber(this.vars.clone) === 5) {
        this.costume = "Menu";
        this.goto(0, -130);
      }
      if (this.toNumber(this.vars.clone) === 6) {
        this.costume = "Return";
        this.goto(-200, 160);
        this.effects.pixelate = 10;
      }
      yield;
    }
  }

  *whenthisspriteclicked() {
    if (this.toNumber(this.vars.clone) === 1) {
      this.broadcast("Play");
    }
    if (this.toNumber(this.vars.clone) === 2) {
      this.broadcast("Shop");
    }
    if (this.toNumber(this.vars.clone) === 3) {
      this.broadcast("Settings");
    }
    if (this.toNumber(this.vars.clone) === 4) {
      this.broadcast("Play");
    }
    if (this.toNumber(this.vars.clone) === 5) {
      this.broadcast("Menu");
    }
    if (this.toNumber(this.vars.clone) === 6) {
      this.broadcast("Menu");
    }
  }

  *whenIReceivePlay() {
    this.deleteThisClone();
  }

  *startAsClone2() {
    while (true) {
      if (this.touching("mouse")) {
        this.size += (85 - this.size) / 2;
      } else {
        this.size += (80 - this.size) / 2;
      }
      this.effects.brightness = (105 - this.size) / 2;
      yield;
    }
  }

  *whenIReceiveDeath() {
    yield* this.wait(3);
    this.vars.clone = 3;
    this.visible = false;
    for (let i = 0; i < 2; i++) {
      this.vars.clone++;
      this.createClone();
      yield;
    }
  }

  *whenIReceiveShop() {
    this.deleteThisClone();
  }

  *whenIReceiveShop2() {
    this.vars.clone = 5;
    this.visible = false;
    for (let i = 0; i < 1; i++) {
      this.vars.clone++;
      this.createClone();
      yield;
    }
  }

  *whenIReceiveSettings() {
    this.vars.clone = 5;
    this.visible = false;
    for (let i = 0; i < 1; i++) {
      this.vars.clone++;
      this.createClone();
      yield;
    }
  }

  *startAsClone3() {
    while (true) {
      if (this.touching("mouse")) {
        yield* this.playSoundUntilDone("pop");
        while (!!this.touching("mouse")) {
          yield;
        }
      }
      yield;
    }
  }
}
