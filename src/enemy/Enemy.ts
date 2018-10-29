import EnemyAI from "./EnemyAI";
import IOnTick from "../IOnTick";

export default class Enemy implements IOnTick {
    image: egret.Bitmap;
    initialX: number;
    initialY: number;
    AI: EnemyAI;
    constructor(image: egret.Bitmap) {
        this.image = image;
        this.setAI();
    }

    private setAI() {
        this.AI = new EnemyAI(this);
    }

    onTick() {
        this.AI && this.AI.onTick();
    }

    removeImage() {
        this.image.parent.removeChild(this.image);
    }

    destroy() {
        this.removeImage();
    }
}