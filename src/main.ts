import { loadImage } from "./assetUtil";
import Background from "./background";

class Main extends egret.DisplayObjectContainer {
    _bitmaps: egret.Bitmap[];
    _background: Background;
    _hero: egret.Bitmap;
    constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
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

        egret.startTick(this.onTick, this);
    }

    async createGame() {
        const [bg, hero, enemy] = this._bitmaps;
        this.addChild(bg);
        const bg2 = this.cloneBitmap(bg);
        this.addChild(bg2);
        this.addChild(hero);
        this.addChild(enemy);
        this._hero = hero;

        //设置飞机的锚点为飞机中心点
        this.centerAnchor(hero);
        this.centerAnchor(enemy);

        enemy.x = this.stage.stageWidth / 2;
        enemy.y = 200;

        hero.x = this.stage.stageWidth / 2;
        hero.y = this.stage.stageHeight - 100;

        this._background = new Background(bg, bg2)
    }

    onTick() {
        this._background.onTick();
        return false;
    }

    cloneBitmap(bitmap: egret.Bitmap) {
        return new egret.Bitmap(bitmap.texture);
    }

    centerAnchor(displayObject: egret.DisplayObject) {
        displayObject.anchorOffsetX = displayObject.width / 2;
        displayObject.anchorOffsetY = displayObject.height / 2;
    }
}


window['Main'] = Main;

egret.runEgret();