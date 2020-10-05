import { _decorator, Component, Node, Label, loader, director, SceneAsset } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LoadingView')
export class LoadingView extends Component {
    @property({
        type: Label
    })
    desLabel: Label = null;

    @property({
        type: Label
    })
    percentLabel: Label = null;

    @property({
        type: Node
    })
    btnFail: Node = null;
    callback: Function;
    
    onLoad() {
        this.btnFail.active = false;
    }

    loadGameScene() {
        let target = director._getSceneUuid('Scene');
        loader.load({
            uuid: target.uuid,
            type: 'uuid'
        }, (completedCount, totalCount, item) => {
            this.desLabel.string = "加载场景中请稍后！";
            this.percentLabel.string = Math.floor(completedCount / totalCount * 100).toString() + "%";
        }, (error, scene: SceneAsset) => {
            director.loadScene('Scene', () => {

            })
        })
    }

    public setPercent(p: number) {
        this.desLabel.string = "加载资源中，请稍后！"
        this.percentLabel.string = Math.floor(p * 100).toString() + '%';
    }

    public setCallBack(f: Function) {
        this.callback = f;
    }

    public showLoadFail() {
        this.btnFail.active = true;
    }

    onResetClick() {
        this.btnFail.active = false;

        this.callback && this.callback();
    }
}
