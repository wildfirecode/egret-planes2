import { loadImage, cloneBitmap } from "./assetUtil";
import Background from "./Background";
import IOnTick from "./IOnTick";
import Enemy from "./Enemy";

class Main extends egret.DisplayObjectContainer {
    _IOnTicks: IOnTick[];
    _bitmaps: egret.Bitmap[];
    _hero: egret.Bitmap;
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
        const bitmaps = await loadImage(assets) as egret.Bitmap[];
        this._bitmaps = bitmaps;

        this.createGame();

        this._IOnTicks = [];
        egret.startTick(this.onTick, this);
    }

    async createGame() {
        const [bg, hero, enemy] = this._bitmaps;
        this.addChild(bg);
        const bg2 = cloneBitmap(bg);
        this.addChild(bg2);
        this.addChild(hero);
        this.addChild(enemy);
        this._hero = hero;

        //设置飞机的锚点为飞机中心点
        this.centerAnchor(hero);
        this.centerAnchor(enemy);

        new Enemy(enemy);

        hero.x = this.stage.stageWidth / 2;
        hero.y = this.stage.stageHeight - 100;

        const background = new Background(bg, bg2);
        this._IOnTicks.push(background);
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