
declare module tt {
    export function login(obj:any);

    export function showMoreGamesModal(obj: any): void;

    export function vibrateShort(obj: _vibrateTTShortObject): void;

    export function vibrateLong(obj: _vibrateTTShortObject): void;

    export function getGameRecorderManager(): _ttGameRecorderManager;

    export function shareAppMessage(obj: any): any;

    export function createBannerAd(obj: any): any;

    export function getSystemInfoSync(): any;

    export function createRewardedVideoAd(obj: any): any;

    export function getStorageSync(key: string): any;

    export function setStorageSync(key: string, value: any): any;

    export function createMoreGamesButton(obj: any): any;

    export function showFavoriteGuide(obj: any): any;

    export function showToast(obj: any): any;

    export function createInterstitialAd(obj: any): any;

    export function getOpenDataContext(): OpenDataContext;

    export function setUserCloudStorage(obj:any);

    export function setUserGroup(obj:any);

    export function getSetting(obj:any);

    export function getUserInfo(obj:any);

    export function authorize(obj:any);
    /**
     * 1.3.0+
     * 打开设置页面，返回用户设置过的授权结果。设置页面只包含用户请求过的权限
     */
    export function openSetting(obj:any);
}

interface OpenDataContext {
    canvas: any;
    postMessage(message: any);
}

interface _vibrateTTShortObject {
    /**
     * 接口调用成功的回调函数
     */
    success: (res) => void;

    /**
     * 接口调用失败的回调函数
     */
    fail: (res) => void;
}


interface _ttGameRecorderManager {
    /**
     * 开始录屏。可以通过 onStart 接口监听录屏开始事件。
     */
    start: (obj: _ttGameRecorderStartParam) => void;

    /**
     * 监听录屏开始事件
     */
    onStart: (callback: Function) => void;

    /**
     * 记录精彩的视频片段，调用时必须是正在录屏，以调用时的录屏时刻为基准，
     * 指定前 x 秒，后 y 秒为将要裁剪的片段，可以多次调用，记录不同时刻。
     * 在结束录屏时，可以调用 clipVideo 接口剪辑并合成记录的片段。
     */
    recordClip: (obj: _ttGameRecordClipParam) => void;

    /**
     * 剪辑精彩的视频片段
     */
    clipVideo: (obj: _ttGameRecordClipVideoParam) => void;

    /**
     * 暂停录屏 1.6.1+
     */
    pause: () => void;

    /**
     * 监听录屏暂停事件
     */
    onPause: () => void;

    /**
     * 继续录屏 1.6.1+
     */
    resume: () => void;

    /**
     * 监听录屏继续事件
     */
    onResume: (callback: Function) => void;

    /**
     * 停止录屏。可以通过 onStop 接口监听录屏结束事件，获得录屏地址。
     */
    stop: () => void;

    /**
    * 监听录屏结束事件。可以通过 onStop接口监听录屏结束事件，获得录屏地址。
    */
    onStop: (callback: Function) => void;

    /**
     *监听录屏错误事件
     */
    onError: (callback: Function) => void;

    /**
     *监听录屏中断开始。
     */
    onInterruptionBegin: (callback: Function) => void;

    /**
     *监听录屏中断结束
     */
    onInterruptionEnd: (callback: Function) => void;
}

interface _ttGameRecorderStartParam {
    /**
     * 录屏的时长，单位 s，必须大于 3s，最大值 300s（5 分钟）
     */
    duration: number;
}

interface _ttGameRecordClipParam {
    /**
     * 默认值 [3, 3]	数组的值表示记录这一时刻的前后时间段内的视频，单位是 s
     */
    timeRange?: Array<number>;

    /**
     * 记录剪辑片段成功的回调函数   支持版本1.20.0
     */
    success?: () => void;
    fail?: () => void;
    complete?: () => void;

}

interface _ttGameRecordClipVideoParam {
    /**
     * 	path 的值为停止录屏拿到的视频地址
     */
    path: string;

    /**
    * 裁剪的范围，用法含义与recordClip 中的timeRange，完全相同，只是记录时相对的当前时刻规定为录屏结束时刻  支持版本1.13.9
    */
    timeRange?: Array<number>;

    /**
     *指定要裁剪的范围，数组中每一项为调用 recordClip 得到返回值  支持版本1.20.0
     */
    clipRange?: Array<number>;

    /**
     * 剪辑成功的回调函数   支持版本1.20.0
     */
    success?: () => void;
    fail?: () => void;
}