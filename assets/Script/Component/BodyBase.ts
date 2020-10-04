import { _decorator, Component, Node, Quat,  Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BodyBase')
export class BodyBase extends Component {
    public LookRotation(dir: Vec3): Quat {
        let q = new Quat();
        q = Quat.rotationTo(q, new Vec3(0, 0, 1), dir);
        return q;
    }

    public LookAt(direction: Vec3) {
        this.node.rotation = this.LookRotation(direction);
    }

    public myDestory(){
        this.node.destroy();
        
    }
}
