import { cloneBitmap, loadImage } from "./assetUtil";
import Background from "./Background";
import Enemy from "./enemy/Enemy";
import IOnTick from "./IOnTick";
import EnemyAI from "./enemy/EnemyAI";

class Main extends egret.DisplayObjectContainer {
    _IOnTicks: IOnTick[];
    _bitmaps: egret.Bitmap[];
    _hero: egret.Bitmap;
    _enemyTemplate: egret.Bitmap;
    constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    async onAddToStage() {
        const assets = [
            'assets/background.png',
            'assets/hero.png',
            'assets/enemy.png',
        ];
        this._IOnTicks = [];

        const bitmaps = await loadImage(assets) as egret.Bitmap[];
        this._bitmaps = bitmaps;

        this.createGame();

        egret.startTick(this.onTick, this);
    }

    async createGame() {
        const [bg, hero, enemy] = this._bitmaps;
        this.addChild(bg);
        const bg2 = cloneBitmap(bg);
        this.addChild(bg2);
        this.addChild(hero);

        this._hero = hero;
        this._enemyTemplate = enemy;

        //设置飞机的锚点为飞机中心点
        this.centerAnchor(hero);
        hero.x = this.stage.stageWidth / 2;
        hero.y = this.stage.stageHeight - 100;

        const background = new Background(bg, bg2);

        this._IOnTicks.push(background);

        this.addEnemy();
    }

    addEnemy() {
        const enemy = cloneBitmap(this._enemyTemplate);
        this.addChild(enemy);
        this.centerAnchor(enemy);
        const enemyCtrl = new Enemy(enemy);
        enemyCtrl.AI.once('onEnemyDisappear', this.onEnemyDisappear, this);
        this._IOnTicks.push(enemyCtrl);
    }

    removeEnemy(enemyCtrl: Enemy) {
        const index = this._IOnTicks.indexOf(enemyCtrl);
        this._IOnTicks.splice(index, 1);
    }

    onEnemyDisappear(e: egret.Event) {
        const AI = e.currentTarget as EnemyAI;
        AI.enemy.destroy();
        this.removeEnemy(AI.enemy);
    }

    onTick() {
        this._IOnTicks.forEach(val => val.onTick());
        return false;
    }

    centerAnchor(displayObject: egret.DisplayObject) {
        displayObject.anchorOffsetX = displayObject.width / 2;
        displayObject.anchorOffsetY = displayObject.height / 2;
    }
}

window['Main'] = Main;

egret.runEgret();