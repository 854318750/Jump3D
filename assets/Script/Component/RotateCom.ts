import { _decorator, Component, Node, Vec3 } from 'cc';
import { BaseCom } from './BaseCom';
const { ccclass, property } = _decorator;

@ccclass('RotateCom')
export class RotateCom extends BaseCom {
    model: Block;
    dir: Vec3;
    speed: number;
    init(model: Block) {
        super.init(model);
        let ary = model.p.split(',');
        this.dir = new Vec3(parseFloat(ary[0]), parseFloat(ary[1]), parseFloat(ary[2]));
        this.speed = parseFloat(ary[3]);
    }

    update(dt) {
        if (this.model) {
            this.node.eulerAngles = this.node.eulerAngles.add(this.dir.clone().multiplyScalar(this.speed * dt));
        }
    }
}
