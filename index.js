import {
  Project,
  Sprite,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Player from "./Player/Player.js";
import Enemies from "./Enemies/Enemies.js";
import LivesAmmo from "./LivesAmmo/LivesAmmo.js";
import Buttons from "./Buttons/Buttons.js";
import Numbers from "./Numbers/Numbers.js";
import OnScreenEffects from "./OnScreenEffects/OnScreenEffects.js";
import PlayerBullets from "./PlayerBullets/PlayerBullets.js";
import Shop from "./Shop/Shop.js";
import Settings from "./Settings/Settings.js";
import EnemyProjectiles from "./EnemyProjectiles/EnemyProjectiles.js";
import SpecialEffects from "./SpecialEffects/SpecialEffects.js";
import Collectables from "./Collectables/Collectables.js";

const stage = new Stage({ costumeNumber: 4 });

const sprites = {
  Player: new Player({
    x: -150,
    y: -140,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 4,
    size: 75,
    visible: false,
    layerOrder: 3,
  }),
  Enemies: new Enemies({
    x: 254,
    y: 105,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 5,
    size: 55.00000000000001,
    visible: false,
    layerOrder: 2,
  }),
  LivesAmmo: new LivesAmmo({
    x: 135,
    y: 110,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 3,
    size: 100,
    visible: false,
    layerOrder: 6,
  }),
  Buttons: new Buttons({
    x: 0,
    y: -140,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 6,
    size: 100.41025641025641,
    visible: false,
    layerOrder: 8,
  }),
  Numbers: new Numbers({
    x: 191,
    y: 105,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 12,
    size: 130,
    visible: false,
    layerOrder: 4,
  }),
  OnScreenEffects: new OnScreenEffects({
    x: 0,
    y: 0,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 2,
    size: 100,
    visible: false,
    layerOrder: 5,
  }),
  PlayerBullets: new PlayerBullets({
    x: 135,
    y: 110,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 7,
  }),
  Shop: new Shop({
    x: 0,
    y: 0,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 4,
    size: 100,
    visible: false,
    layerOrder: 1,
  }),
  Settings: new Settings({
    x: 0,
    y: 0,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 4,
    size: 100,
    visible: false,
    layerOrder: 10,
  }),
  EnemyProjectiles: new EnemyProjectiles({
    x: 0,
    y: 0,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 9,
  }),
  SpecialEffects: new SpecialEffects({
    x: 36,
    y: 28,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 11,
  }),
  Collectables: new Collectables({
    x: -159,
    y: 95,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 12,
  }),
};

const project = new Project(stage, sprites, {
  frameRate: 30, // Set to 60 to make your project run faster
});
export default project;
