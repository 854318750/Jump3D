import { _decorator, Component, Node } from 'cc';
import { PubUtils } from './Core/PubUtils';
import { SwitchType } from './Core/SwitchType';
export class MyConfig {
    /**
     * 是否属于第一次登陆
     */
    public static isFirst: boolean = true;


    public static FLAG_SOUND: number = SwitchType.On;

    public static FLAG_MUSIC: number = SwitchType.On;

    public static FLAG_VIBRATE: number = SwitchType.On;

    public static IsClickDesktop: number = SwitchType.Off;

    /**
    * 上一次登录的时间
    */
    public static lastTimer: Date;

    /**
    * 是否属于第一次登陆
    */
    private static isFirstLogin: boolean = false;
    public static ZScore: number = 0;

    public static IsInitUserInfo: SwitchType = SwitchType.Off;

    public static CurLevel: number = 1;

    public static LoginTime: Date;
    /**
     * 分享视所获得的金币
     */
    public static ShareCoin: number = 50;

    static initLocalData() {
        let sound = PubUtils.GetLocalData("sound");
        if (sound != null && sound != "") {
            this.FLAG_SOUND = parseInt(sound);
        }

        let vib = PubUtils.GetLocalData("vibrate");
        if (vib != null && vib != "") {
            this.FLAG_VIBRATE = parseInt(vib);
        }

        let music = PubUtils.GetLocalData("music");
        if (music != null && music != "") {
            this.FLAG_MUSIC = parseInt(music);
        }

        let isd = PubUtils.GetLocalData("IsClickDesktop");
        if (isd != null && isd != "") {
            this.IsClickDesktop = parseInt(isd);
        }

        let score = PubUtils.GetLocalData("zscore");
        if (score != null && score != "") {
            this.ZScore = parseInt(score);
        }

        let IsInitUserInfo = PubUtils.GetLocalData("IsInitUserInfo");
        if (IsInitUserInfo != null && IsInitUserInfo != "") {
            this.IsInitUserInfo = parseInt(IsInitUserInfo);
        }

        /**
         * 初始化最后登录的时间
         */
        let last_time_str = PubUtils.GetLocalData("last_timer");
        if (last_time_str != null) {
            this.lastTimer = new Date();
            this.lastTimer.setTime(last_time_str);

            PubUtils.SetLocalData("last_timer", new Date().getTime());
        } else {
            this.isFirstLogin = true;
            this.lastTimer = new Date();
            PubUtils.SetLocalData("last_timer", this.lastTimer.getTime());
        }

        this.LoginTime = new Date();
    }

    public static InitUserInfo() {
        PubUtils.SetLocalData("IsInitUserInfo", SwitchType.On);
    }

    static getIsFirstLogin(): boolean {
        return this.isFirstLogin;
    }

    public static ResetFlagSound(flag: SwitchType) {
        PubUtils.SetLocalData("sound", flag);
        this.FLAG_SOUND = flag;
    }

    public static ResetFlagVibrate(flag: SwitchType) {
        PubUtils.SetLocalData("vibrate", flag);
        this.FLAG_VIBRATE = flag;
    }

    public static ResetFlagMusic(flag: SwitchType) {
        PubUtils.SetLocalData("music", flag);
        this.FLAG_MUSIC = flag;
    }

}
