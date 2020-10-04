import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BaseCom')
export class BaseCom extends Component {
    model:any;
    public init(model:any) {
        this.model = model;
        
    }
}
