import IOnTick from "./IOnTick";
import EnemyAI from "./EnemyAI";

export default class Enemy implements IOnTick {
    _image: egret.Bitmap;
    initialX: number;
    initialY: number;
    AI: EnemyAI;
    constructor(image: egret.Bitmap) {
        this._image = image;
        this._image.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    onAddToStage() {
        this.initialX = this._image.stage.stageWidth / 2;
        this.initialY = 200;
        this.setAI();
    }

    private setAI() {
        this.setInitialPosition();
        this.AI = new EnemyAI();
    }

    private setInitialPosition() {
        this._image.x = this.initialX;
        this._image.y = this.initialY;
    }

    onTick() {
        this.AI && this.AI.onTick();
    }
}