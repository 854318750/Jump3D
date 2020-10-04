import { _decorator, Component, Node, EventTouch, Vec3 } from 'cc';
import { ThirdPersonController } from './ThirdPersonController';
const { ccclass, property } = _decorator;

@ccclass('TouchController')
export class TouchController extends Component {
    public static instance: TouchController;

    protected inputVector: Vec3 = new Vec3();

    public touchId: number = -1;

    public get Horizontal(): number {
        return this.inputVector.x;
    }
    public get Vertical(): number {
        return this.inputVector.y;
    }

    onLoad() {
        TouchController.instance = this;
    }

    private _target: ThirdPersonController;
    setTarget(t: ThirdPersonController) {
        this._target = t;
        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    onTouchStart(e: EventTouch) {
        if (this.touchId != e.getID()) {
            this.touchId = e.getID();
        }
    }

    onTouchMove(e: EventTouch) {
        if (this.touchId == e.getID()) {
            let dir = e.getLocation().subtract(e.getStartLocation());
            this.inputVector.set(dir.normalize().x, dir.normalize().y);
        }
    }

    onTouchEnd(e: EventTouch) {
        if (this.touchId == e.getID()) {
            this.inputVector = new Vec3();
            this._target.Move(new Vec3(-this.Horizontal, 0, this.Vertical), 0);
        }
    }

    update(dt) {
        if (this._target && (this.Vertical != 0 || this.Horizontal != 0)) {
            this._target.Move(new Vec3(-this.Horizontal, 0, this.Vertical), dt);
        }
    }
}
