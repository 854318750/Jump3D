import { _decorator, Component, Node, Prefab, instantiate, TERRAIN_MAX_LEVELS } from 'cc';
import { MyConfig } from '../MyConfig';
import { Resources } from '../Resources';
import { LoadingView } from '../UI/LoadingView';
import { LeveController } from './LeveController';
import { ThirdPersonController } from './ThirdPersonController';
import { TouchController } from './TouchController';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {


    @property({
        type: Node
    })
    canvasNode: Node = null;

    public static instance: GameController;

    loadingView: LoadingView;

    onLoad() {
        GameController.instance = this;

        Resources.loadFab('LoadingView', {
            Success: (fab: Prefab) => {
                let loading = instantiate(fab);
                this.canvasNode.addChild(loading);

                this.loadingView = loading.getComponent(LoadingView);

                this.loadLevel();
            },
            Fail: () => {

            }
        });
    }

    loadLevel() {
        this.loadingView.node.active = true;
        this.loadingView.setCallBack(() => {
            this.loadLevel();
        })

        LeveController.instance.loadConfig(MyConfig.CurLevel, () => {
            this.loadingView.setPercent(0.1);
            this.loadBlock();
        })
    }

    loadBlock() {
        this.loadingView.setCallBack(() => {
            LeveController.instance.clearLoadCount();
            this.loadBlock();
        })

        LeveController.instance.resetLabelStr(MyConfig.CurLevel);
        LeveController.instance.loadBlock((c, z) => {
            this.loadingView.setPercent(c / z * 0.8 + 0.1);
        }, () => {
            this.loadPlayers();
        });
    }

    loadPlayers() {
        this.loadingView.setCallBack(() => {
            this.loadPlayers();
        })

        Resources.loadFab('Red', {
            Success: (fab: Prefab) => {
                let node = instantiate(fab);
                let parcent = LeveController.instance.levelMap.get('Block');
                this.node.addChild(node);

                let pos = parcent.children[0].getWorldPosition().add3f(0, 2, 0);

                let ctl = node.getComponent(ThirdPersonController);
                ctl.init(LeveController.instance.paths, pos, true);

                TouchController.instance.setTarget(ctl);

                this.loadingView.setPercent(1);
                setTimeout(() => {
                    this.startGame();
                }, 100);
            },
            Fail: () => {

            }
        })
    }

    startGame() {
        this.loadingView.node.active = false;
    }
}
