import { _decorator, Node, Vec3, RigidBody, Quat, Collider, ICollisionEvent } from 'cc';
import { BodyBase } from '../Component/BodyBase';
import CameraFollowController from './CameraFollowController';
import { LeveController } from './LeveController';
const { ccclass, property } = _decorator;
@ccclass('ThirdPersonController')
export class ThirdPersonController extends BodyBase {
    @property({
        tooltip: "移动速度"
    })
    moveSpeed: number = 5;

    @property({
        type: RigidBody,
        tooltip: '身体'
    })
    body: RigidBody = null;

    @property({
        type: Node,
        tooltip: '球节点'
    })
    ball: Node = null;

    @property({
        type: Node,
        tooltip: '球'
    })
    ballNode: Node = null;
    /**
     * 场景中的路径点
     */
    paths: Array<Vec3> = [];
    /**
     * 当前索引
     */
    pathIndex: number = 1;
    /**
     * 当前移动方向
     */
    curMoveDir: Vec3 = new Vec3();

    _curRotate: Vec3 = new Vec3(0, 0, 1);
    
    /**
     * 是否跳跃
     */
    isJump: boolean = false;
    /**
     * 开始位置
     */
    startPos: Vec3 = new Vec3();

    onLoad() {
        let collider = this.getComponent(Collider);

        collider.on('onCollisionEnter', this.onCollisionEnter, this);
    }

    public setPaths(ary: Array<Vec3>) {
        this.paths = [].concat(ary);
        this.pathIndex = 1;
    }

    public setStartPos(pos: Vec3) {
        this.startPos.set(pos.x, pos.y, pos.z);
    }

    public Move(moveVector: Vec3, dt: number) {
        if (!this.isJump) {
            let p = moveVector.multiplyScalar(this.moveSpeed).multiplyScalar(dt);
            let formPos = this.node.getPosition();
            this.node.translate(p, 0);
            let toPos = this.node.getPosition();

            let block = LeveController.instance.getBlockByPos(toPos);
            if (!block) {
                this.node.setPosition(formPos);
            }
            this.curMoveDir.set(moveVector.z * 160, 0, -1 * moveVector.x * 160);
        }
    }

    public LookAt(v: Vec3) {
        let p = v.clone();
        p.y = 0;
        super.LookAt(p);
    }

    public setRotate(r: Vec3) {
        this._curRotate.set(r.x, r.y, r.z);
    }

    public Jump(pos: Vec3) {
        this.isJump = true;
        this.body.applyImpulse(pos);
    }

    public update(dt) {
        if (!this.isJump) {

            this.ballNode.eulerAngles = this.ballNode.eulerAngles.add3f(this.curMoveDir.x, 0, 0);
            this.ball.eulerAngles = this.ball.eulerAngles.add3f(0, 0, this.curMoveDir.z);

            if (Vec3.distance(this.node.getWorldPosition(), this.paths[this.pathIndex - 1]) >= 1) {
                if (Vec3.distance(this.node.getWorldPosition(), this.paths[this.pathIndex]) <= 1) {

                    let p1 = this.paths[this.pathIndex + 1];
                    let p2 = this.paths[this.pathIndex];

                    CameraFollowController.instance.setRotate(p1.clone().subtract(p2).normalize());

                    this._curRotate = p1.clone().subtract(p2).normalize();

                    this.pathIndex++;
                }
            }

            let q = this.LookRotation(this._curRotate);
            let q2 = new Quat();
            Quat.slerp(q2, this.node.getWorldRotation(), q, 10 * dt);
            this.node.rotation = q2;

        }

        if (this.node.worldPosition.y <= 0) {
            this.myClear();
        }
    }

    clearVelocity() {
        this.body.setLinearVelocity(new Vec3());
        this.body.setAngularVelocity(new Vec3());
    }

    myClear() {
        this.isJump = false;
        this.node.setWorldPosition(this.startPos);

        let p1 = this.paths[1];
        let p2 = this.paths[0];
        CameraFollowController.instance.setRotate(p1.clone().subtract(p2).normalize());
        this.setRotate(p1.clone().subtract(p2).normalize());

        this.pathIndex = 1;
        this.clearVelocity();
    }

    public onCollisionEnter(e: ICollisionEvent) {
        if (e.otherCollider.node.name == 'Rotation_Box_Three') {

            let point = new Vec3();
            let index = 0;
            if (e.contacts[index].isBodyA) {
                e.contacts[index].getWorldPointOnA(point);
            } else {
                e.contacts[index].getWorldPointOnB(point);
            }
            let pos = this.node.getWorldPosition();
            this.body.applyImpulse(pos.subtract(point).normalize().multiplyScalar(5));

        } else if (e.otherCollider.node.name == 'Cube') {

            if (this.isJump) {
                this.isJump = false;
                this.clearVelocity();
            }
        }
    }
}
