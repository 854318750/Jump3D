import { _decorator, Component, Node, EventTouch, Vec3, UITransform } from 'cc';
import { ThirdPersonController } from './ThirdPersonController';
const { ccclass, property } = _decorator;

@ccclass('TouchController')
export class TouchController extends Component {
    public static instance: TouchController;

    @property({
        type: Node,
        tooltip: "虚拟摇杆的底图"
    })
    rockerBg: Node = null;

    @property({
        type: Node,
        tooltip: "虚拟摇杆"
    })
    rocker: Node = null;

    protected inputVector: Vec3 = new Vec3();

    public touchId: number = -1;

    public get Horizontal(): number {
        return this.inputVector.x;
    }
    public get Vertical(): number {
        return this.inputVector.y;
    }

    public handleLimit: number = 0;

    onLoad() {
        TouchController.instance = this;

        let t = this.rockerBg.getComponent(UITransform);
        this.handleLimit = t.width / 2;


        this.setRockerVisible(false);
    }

    private _target: ThirdPersonController;
    setTarget(t: ThirdPersonController) {
        this._target = t;

        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);

    }

    setRockerVisible(v: boolean) {
        this.rocker.active = v;
        this.rockerBg.active = v;
    }

    onTouchStart(e: EventTouch) {
        if (this.touchId != e.getID()) {
            this.touchId = e.getID();
            let pos = e.getUILocation();

            let touchPos = new Vec3(pos.x, pos.y);
            this.rockerBg.setWorldPosition(touchPos);
            this.rocker.setWorldPosition(touchPos);
            this.setRockerVisible(true);
        }
    }

    onTouchMove(e: EventTouch) {
        if (this.touchId == e.getID()) {
            let dir = e.getUILocation().subtract(e.getUIStartLocation());
            const touchPos = new Vec3(e.getUILocation().x, e.getUILocation().y, 0);

            const distance = dir.clone().length();
            if (this.handleLimit > distance) {
                this.rocker.setWorldPosition(touchPos);

                this.inputVector.set(dir.normalize().x, dir.normalize().y);
            } else {
                let p = dir.clone().normalize();
                // 控杆永远保持在圈内，并在圈内跟随触摸更新角度
                const x = this.rockerBg.worldPosition.x + p.x * this.handleLimit;
                const y = this.rockerBg.worldPosition.y + p.y * this.handleLimit;
                this.rocker.setWorldPosition(new Vec3(x, y, 0));
                dir.divide2f(this.handleLimit, this.handleLimit);
                this.inputVector.set(dir.x, dir.y);
            }
        }
    }

    onTouchEnd(e: EventTouch) {
        if (this.touchId == e.getID()) {
            this.inputVector = new Vec3();
            this._target.Move(new Vec3(-this.Horizontal, 0, this.Vertical), 0);
            this.touchId = -1;
            this.setRockerVisible(false);
        }
    }

    update(dt) {
        if (this._target && (this.Vertical != 0 || this.Horizontal != 0)) {
            this._target.Move(new Vec3(-this.Horizontal, 0, this.Vertical), dt);
        }
    }
}
