import { _decorator, Component, Node, Prefab, instantiate } from 'cc';
import { Resources } from '../Resources';
import { LoadingView } from '../UI/LoadingView';
const { ccclass, property } = _decorator;

@ccclass('StartLoading')
export class StartLoading extends Component {
    onLoad() {
        Resources.loadFab("LoadingView", {
            Success: (fab: Prefab) => {
                let node = instantiate(fab);
                this.node.addChild(node);

                let loadView = node.getComponent(LoadingView);
                loadView.loadGameScene();
            },
            Fail: () => {

            }
        })
    }
}
