interface PlatformManagerDelegate {
    platform: number;

    showNativeAdView(m: any, c: NativeInstertViewCallBack): void;

    ResumeGame(): void;

    StopGame(): void;

    playMusic(url: string): void;

    stopMusic(): void;

    playSound(url: string): void;

}

interface NativeInstertViewCallBack {
    CloseHandle(): void;
    ClickHandle(): void;
}

interface AgreementViewCallBack {
    AgreeHandle(): void;
    DisAgreeHandle(): void;
}

interface CompleteCallBack {
    CallBack(data?: any);
}

interface FailCallBack {
    /**
     * 关闭事件回调
     */
    CloseHandle();

    /**
     * 复活事件回调
     */
    ReviveHandle();
}

interface SigninManagerDelegate {
    getIsSignin(): boolean;
    signin_cumulative_count: number;
    signinCount(): void;
    getSigninCount(): number;
}

interface RewardCallBack {
    CloseHandle();
    RewardHandle();
}

interface RecorderCallBack {
    /**
     * 开始录屏回调事件
     */
    onStartHandle: (res: any) => void;
    /**
     * 停止录屏回调事件
     */
    onStopHandle: (res: any) => void;
    /**
     * 录屏失败回调事件
     */
    onErrorHandle: (res: any) => void;
}

interface AdCallBack {
    Success(data?: any): void;
    Fail(): void;
}

interface CoinAniViewModel {
    ToPos: any;
    AddCoin: number;
    CoinNode?: any;
    FirstHandle: (c: number) => void;
    ProgressHandle: (c: number, p: number) => void;
    EndHandle: (c: number) => void;
}

interface TrialCallBackDelegate {
    RewardCallBack(model);
    UseCallBack(model);
    SkipCallBack?();
}

interface NativeInstertViewCallBack {
    CloseHandle(): void;
    ClickHandle(): void;
}

interface AdCallBack {
    Success(data?): void;
    Fail(): void;
}


interface KillModel {
    //击杀的玩家id
    killUserId: string;
    //攻击者的id
    attackUserId: string;
}

interface RankItem {
    userId: string,
    userName: string,
    killNum: number,
    dieNum: number,
    coin?: number,
    rank?: number
}