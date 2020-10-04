import { _decorator, Component, Node, Vec3, Collider, ITriggerEvent } from 'cc';
import { ThirdPersonController } from '../Controller/ThirdPersonController';
import { BaseCom } from './BaseCom';
const { ccclass, property } = _decorator;

@ccclass('BalkCom')
export class BalkCom extends BaseCom {
    model: Block;
    dir: Vec3;
    init(model: Block) {
        super.init(model);
        let ary = model.p.split(',');
        this.dir = new Vec3(parseFloat(ary[0]), parseFloat(ary[1]), parseFloat(ary[2]));

        let collider = this.getComponent(Collider);
        collider.on('onTriggerEnter', this.onTriggerEnter, this);
    }

    onTriggerEnter(t: ITriggerEvent) {
        let ctl = t.otherCollider.getComponent(ThirdPersonController);
        if (ctl) {
            ctl.Jump(this.dir.clone());
        }
    }

}
