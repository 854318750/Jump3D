import { _decorator, Component, Node, JsonAsset, Vec3, Prefab, loader, instantiate, Quat, CCObject, Label } from 'cc';
import { BalkCom } from '../Component/BalkCom';
import { Label3D } from '../Component/Label3D';
import { RotateCom } from '../Component/RotateCom';
import { MyConfig } from '../MyConfig';
import { Resources } from '../Resources';
import CameraFollowController from './CameraFollowController';
import { GameController } from './GameController';
import { ThirdPersonController } from './ThirdPersonController';
import { TouchController } from './TouchController';
const { ccclass, property } = _decorator;

@ccclass('LeveController')
export class LeveController extends Component {

    public static instance: LeveController;


    @property({
        type: Node
    })
    labels: Node = null;

    //关卡中的节点字典
    levelMap: Map<string, Node> = new Map();
    //方块的模型字典
    blockFab: Map<string, Prefab> = new Map();
    //方块的类
    blockClas: Map<string, any> = new Map();
    //可以移动的方块列表
    blockMap: Map<number, Node> = new Map();

    paths: Array<Vec3> = [];

    frontLabel: Label3D;
    rightLabel: Label3D;
    backLabel: Label3D;
    leftLabel: Label3D;

    /**
     * 当前关卡加载
     */
    curLevelModelIndex: number = 0;
    /**
     * 当前方块加载索引
     */
    curBlockIndex: number = 0;
    /**
     * 当前加载长度
     */
    curLoadCount: number = 0;
    /**
     * 关卡总长度
     */
    levelZCount: number = 0;

    levelJson: JsonAsset = null;

    onLoad() {
        LeveController.instance = this;
    }

    start() {
        this.blockClas.set('RotateCom', RotateCom);
        this.blockClas.set('BalkCom', BalkCom);

        this.frontLabel = this.labels.children[0].getComponent(Label3D);
        this.leftLabel = this.labels.children[1].getComponent(Label3D);
        this.rightLabel = this.labels.children[2].getComponent(Label3D);
        this.backLabel = this.labels.children[3].getComponent(Label3D);
    }

    loadConfig(level: number, callBack: Function) {
        loader.loadRes("Config/Level_" + level, JsonAsset, (err: Error, json: JsonAsset) => {
            if (err) {
                return console.log(err);
            }
            this.levelJson = json;
            let exportLevelModel = this.levelJson.json as ExportLevelModel;
            for (let i = 0; i < exportLevelModel.list.length; i++) {
                if (exportLevelModel.list[i].pn != 'Path') {
                    for (let j = 0; j < exportLevelModel.list[i].list.length; j++) {
                        this.levelZCount++;
                    }
                }
            }

            callBack && callBack();
        })
    }

    public resetLabelStr(level: number) {
        this.frontLabel.string = "关卡：" + level;
        this.leftLabel.string = "关卡：" + level;
        this.rightLabel.string = "关卡：" + level;
        this.backLabel.string = "关卡：" + level;
    }

    public loadBlock(cp: Function, callBack: Function) {
        let exportLevelModel = this.levelJson.json as ExportLevelModel;
        cp(this.curLoadCount, this.levelZCount);

        if (this.curLevelModelIndex >= exportLevelModel.list.length) {
            callBack && callBack();
        } else {
            let exportModel = exportLevelModel.list[this.curLevelModelIndex];
            if (exportModel.pn == 'Path') {
                for (let i = 0; i < exportModel.list.length; i++) {
                    this.paths.push(new Vec3(exportModel.list[i].x, exportModel.list[i].y, exportModel.list[i].z));
                }
                this.curLevelModelIndex++;
                this.loadBlock(cp, callBack);
            } else {
                let node = this.levelMap.get(exportModel.pn);
                if (node == null) {
                    node = new Node(exportModel.pn);
                    this.node.addChild(node);
                    node.worldPosition = new Vec3(exportModel.x, exportModel.y, exportModel.z);
                    this.levelMap.set(exportModel.pn, node);
                }
                let blockModel = exportModel.list[this.curBlockIndex];
                let fab = this.blockFab.get(blockModel.bn);
                if (fab == null) {
                    Resources.loadFab(blockModel.bn, {
                        Success: (fab: Prefab) => {
                            this.blockFab.set(blockModel.bn, fab);
                            this.createBlock(fab, node, blockModel);
                            this.curBlockIndex++;
                            if (this.curBlockIndex >= exportModel.list.length) {
                                this.curBlockIndex = 0;
                                this.curLevelModelIndex++;
                            }
                            this.curLoadCount++;
                            this.loadBlock(cp, callBack);
                        },
                        Fail: () => {
                            GameController.instance.loadingView.showLoadFail();
                        }
                    })
                } else {
                    if (fab == null) console.log(blockModel.bn);
                    this.createBlock(fab, node, blockModel);
                    this.curBlockIndex++;
                    if (this.curBlockIndex >= exportModel.list.length) {
                        this.curBlockIndex = 0;
                        this.curLevelModelIndex++;
                    }
                    this.curLoadCount++;
                    this.loadBlock(cp, callBack);
                }
            }
        }
    }

    public createBlock(fab: Prefab, parcent: Node, model: Block) {
        let clas = this.blockClas.get(model.cn);
        let n = instantiate(fab);
        parcent.addChild(n);

        n.position = new Vec3(model.x, model.y, model.z);
        n.rotation = new Quat(model.rx, model.ry, model.rz, model.rw);
        n.scale = new Vec3(model.sx, model.sy, model.sz);

        if (parcent.name == 'Block') {
            this.setBlockMap(Math.round(model.x), Math.round(model.z), n);
        }
        if (clas == null) {
            return null;
        } else {
            let com: any = n.addComponent(clas);
            com.init(model);
            return com;
        }
    }

    public setBlockMap(x, z, node: Node) {
        let key = x * 100000 + z;
        this.blockMap.set(key, node);
    }

    public getBlockByPos(pos: Vec3) {
        let k = Math.round(pos.x) * 100000 + Math.round(pos.z);
        return this.getBlock(k);
    }

    public getBlock(key: number) {
        return this.blockMap.get(key);
    }

    public clearLoadCount() {
        this.curLevelModelIndex = 0;
        this.curBlockIndex = 0;
        this.curLoadCount = 0;
    }
}
