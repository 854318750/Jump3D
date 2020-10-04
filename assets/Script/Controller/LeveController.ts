import { _decorator, Component, Node, JsonAsset, Vec3, Prefab, loader, instantiate, Quat, CCObject } from 'cc';
import { BalkCom } from '../Component/BalkCom';
import { RotateCom } from '../Component/RotateCom';
import CameraFollowController from './CameraFollowController';
import { ThirdPersonController } from './ThirdPersonController';
import { TouchController } from './TouchController';
const { ccclass, property } = _decorator;

@ccclass('LeveController')
export class LeveController extends Component {

    public static instance: LeveController;

    @property(JsonAsset)
    levelJson: JsonAsset = null;

    //关卡中的节点字典
    levelMap: Map<string, Node> = new Map();
    //方块的模型字典
    blockFab: Map<string, Prefab> = new Map();
    //方块的类
    blockClas: Map<string, any> = new Map();
    //可以移动的方块列表
    blockMap: Map<number, Node> = new Map();

    paths: Array<Vec3> = [];


    curLevelModelIndex: number = 0;
    curBlockIndex: number = 0;
    onLoad() {
        LeveController.instance = this;
    }
    start() {
        this.blockClas.set('RotateCom', RotateCom);
        this.blockClas.set('BalkCom', BalkCom);

        this.loadBlock(this.loadBlockOver.bind(this));
    }

    loadBlock(callBack: Function) {
        let exportLevelModel = this.levelJson.json as ExportLevelModel;
        if (this.curLevelModelIndex >= exportLevelModel.list.length) {
            console.log("生成完成");
            callBack && callBack();
        } else {
            let exportModel = exportLevelModel.list[this.curLevelModelIndex];
            if (exportModel.pn == 'Path') {
                for (let i = 0; i < exportModel.list.length; i++) {
                    this.paths.push(new Vec3(exportModel.list[i].x, exportModel.list[i].y, exportModel.list[i].z));
                }
                this.curLevelModelIndex++;
                this.loadBlock(callBack);
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
                    loader.loadRes("Prefab/" + blockModel.bn, Prefab, (err: any, fab: Prefab) => {
                        this.blockFab.set(blockModel.bn, fab);
                        this.createBlock(fab, node, blockModel);
                        this.curBlockIndex++;
                        if (this.curBlockIndex >= exportModel.list.length) {
                            this.curBlockIndex = 0;
                            this.curLevelModelIndex++;
                        }
                        this.loadBlock(callBack);
                    });
                } else {
                    if (fab == null) console.log(blockModel.bn);
                    this.createBlock(fab, node, blockModel);
                    this.curBlockIndex++;
                    if (this.curBlockIndex >= exportModel.list.length) {
                        this.curBlockIndex = 0;
                        this.curLevelModelIndex++;
                    }
                    this.loadBlock(callBack);
                }
            }
        }
    }

    createBlock(fab: Prefab, parcent: Node, model: Block) {
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

    setBlockMap(x, z, node: Node) {
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

    loadBlockOver() {
        this.loadPlayer();
    }

    loadPlayer() {
        loader.loadRes('Prefab/Red', Prefab, (err, fab: Prefab) => {
            if (err) return;

            let node = instantiate(fab);
            let parcent = this.levelMap.get('Block');
            this.node.addChild(node);

            let pos = parcent.children[0].worldPosition.clone().add3f(0, 2, 0);
            node.setWorldPosition(pos);
            
            let ctl = node.getComponent(ThirdPersonController);
            ctl.setPaths(this.paths);
            ctl.setStartPos(pos);
            let nor = this.paths[1].clone().subtract(this.paths[0]).normalize();
            ctl.LookAt(nor.clone());
            ctl.setRotate(nor.clone());


            CameraFollowController.instance.setTarget(node);
            CameraFollowController.instance.setRotate(nor.clone());
            
            TouchController.instance.setTarget(ctl);
        });
    }
}
