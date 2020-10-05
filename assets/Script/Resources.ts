// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import { Prefab, JsonAsset, loader, AudioClip } from "cc";

const FabDir = 'Prefab/';
const Config = 'Config/';
const AudioDir = 'Audio/';

enum LoadType {
    /**
     * 正常
     */
    None,
    /**
     * 加载中
     */
    Loding,
    /**
     * 加载完成
     */
    Over,
    /**
     * 加载失败
     */
    Fail
}

export class Resources {
    static fabs: Map<string, Prefab> = new Map();
    static jsons: Array<JsonAsset> = [];
    static audios: Map<string, AudioClip> = new Map();
    static initFabs(fabs: Array<Prefab>) {
        for (let i = 0; i < fabs.length; i++) {
            this.fabs.set(fabs[i].data.name, fabs[i]);
        }
    }

    static addFabs(fab: Prefab) {
        let name = fab.data.name;
        if (!this.fabs.get(name)) {
            this.fabs.set(name, fab);
        } else {
            console.log("addFabs  Exit -----------  " + name);
        }
    }

    static addRes(res: any) {
        if (res instanceof Prefab) {
            this.addFabs(res);
        } else if (res instanceof JsonAsset) {
            this.jsons.push(res);
        } else if (res instanceof AudioClip) {
            this.audios.set(res.name, res);
        }
    }

    static resLoadMap: Map<string, LoadType> = new Map();
    static resLoadCount: Map<string, number> = new Map();
    static resLoadCallBacks: Map<string, Array<AdCallBack>> = new Map();

    /**
     * 预加载需要用到的界面
     */
    static preloadFabs() {
        let list = [];

        for (let i = 0; i < list.length; i++) {
            this.loadFab(list[i], {
                Success: () => {

                },
                Fail: () => {

                }
            })
        }
    }

    /**
     * 
     * @param level 预加载开始关卡
     */
    static preloadStartLevelFabs(level: number) {
        let list = [];

        // list.push(this.DangerHit1);
        // list.push(this.TargetHit2);
        // list.push(this.FireSwing);
        // list.push(this.Swing);

        for (let i = 0; i < list.length; i++) {
            this.loadFab(list[i], {
                Success: () => {

                },
                Fail: () => {

                }
            })
        }
    }

    static preloadLevelFabs(level: number) {
        let list = [];

        for (let i = 0; i < list.length; i++) {
            this.loadFab(list[i], {
                Success: () => {

                },
                Fail: () => {

                }
            })
        }
    }


    static loadFab(url: string, callBack: AdCallBack) {
        //检查该资源是否处于加载中
        let type = this.resLoadMap.get(url) || LoadType.None;
        if (type == LoadType.None) {
            let count = this.resLoadCount.get(url) || 0;
            if (count > 3) {
                console.log("资源加载失败-------------请检查路径" + url);
                this.resLoadMap.set(url, LoadType.Fail);
                this.CallLoadCallBack(url, null);
                return;
            }
            count++;
            this.resLoadCount.set(url, count);

            this.resLoadMap.set(url, LoadType.Loding);
            this.AddLoadCallBacks(url, callBack);
            loader.loadRes(FabDir + url, Prefab, (err: any, fab: Prefab) => {
                if (err) {
                    this.loadFab(url, callBack);
                } else {
                    this.fabs.set(url, fab);
                    this.resLoadMap.set(url, LoadType.Over);
                    this.CallLoadCallBack(url, fab);
                }
            })
        } else if (type == LoadType.Over) {
            callBack.Success(this.fabs.get(url));
        } else if (type == LoadType.Loding) {
            this.AddLoadCallBacks(url, callBack);
        }
    }

    static loadAudio(url, callBack: AdCallBack) {
        let type = this.resLoadMap.get(url) || LoadType.None;
        if (type == LoadType.None) {
            let count = this.resLoadCount.get(url) || 0;
            if (count > 3) {
                console.log("资源加载失败-------------请检查路径" + url);
                this.resLoadMap.set(url, LoadType.Fail);
                this.CallLoadCallBack(url, null);
                return;
            }
            count++;
            this.resLoadCount.set(url, count);

            this.resLoadMap.set(url, LoadType.Loding);
            this.AddLoadCallBacks(url, callBack);
            loader.loadRes(AudioDir + url, AudioClip, (err: any, audio: AudioClip) => {
                if (err) {
                    this.loadAudio(url, callBack);
                } else {
                    this.audios.set(url, audio);
                    this.resLoadMap.set(url, LoadType.Over);
                    this.CallLoadCallBack(url, audio);
                }
            })
        } else if (type == LoadType.Over) {
            callBack.Success(this.audios.get(url));
        } else if (type == LoadType.Loding) {
            this.AddLoadCallBacks(url, callBack);
        }
    }

    static AddLoadCallBacks(url: string, callBack: AdCallBack) {
        let list = this.resLoadCallBacks.get(url);
        if (list == null) {
            list = [];
            this.resLoadCallBacks.set(url, list);
        }
        list.push(callBack);
    }

    static CallLoadCallBack(url: string, fab: any) {
        let list = this.resLoadCallBacks.get(url);
        if (list) {
            while (list.length > 0) {
                let callBack = list.shift();
                if (fab) {
                    callBack.Success(fab);
                } else {
                    callBack.Fail();
                }
            }
        }
    }
}
