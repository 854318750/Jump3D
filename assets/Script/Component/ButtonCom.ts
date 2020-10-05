import { _decorator, Component, Node, EventHandler, Animation } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ButtonCom')
export class ButtonCom extends Component {
    @property({
        type: [EventHandler]
    })
    events: Array<EventHandler> = [];

    clickAni: Animation = null;


    isClick: boolean = false;
    start() {
        this.clickAni = this.getComponent(Animation);

        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    }

    onDestroy() {
        this.node.off(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.off(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.off(Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    }

    onTouchStart() {
        this.isClick = true;
        this.clickAni && this.clickAni.play();
    }

    onTouchEnd() {
        if (this.isClick) {
            EventHandler.emitEvents(this.events);
        }
    }

    onTouchCancel() {
        this.isClick = false;
    }



}
