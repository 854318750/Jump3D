import { Node, Quat, Vec3, _decorator } from "cc";
import { BodyBase } from "../Component/BodyBase";
import { PubUtils } from "../Core/PubUtils";
const { ccclass, property } = _decorator;


const pos = new Vec3();
@ccclass('CameraFollowController')
export default class CameraFollowController extends BodyBase {

    @property
    moveSpeed: number = 0.4;

    _target: Node;

    public static instance: CameraFollowController;

    public curPos: Vec3;

    public toPos: Vec3;

    _curRotate: Vec3 = new Vec3(0, 0, 1);

    onLoad() {
        CameraFollowController.instance = this;
    }

    public setTarget(t: Node) {
        this._target = t;
    }

    public setRotate(r: Vec3) {
        this._curRotate.set(r.x, r.y, r.z);
    }

    lateUpdate(dt) {
        if (this._target) {
            this.node.setWorldPosition(PubUtils.MoveTowards(this.node.getWorldPosition(), this._target.getWorldPosition(), this.moveSpeed * dt));

            let q = this.LookRotation(this._curRotate);

            let q2 = new Quat();

            Quat.slerp(q2, this.node.getWorldRotation(), q, 5 * dt);

            this.node.rotation = q2;
        }
    }
}