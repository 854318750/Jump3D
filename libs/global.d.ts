interface AndroidToJs {
    /**
     * 打印日志
     */
    setEventDispatcher(disPatcher: any): void;

    CallJs(funcName: string, param): void
}
declare const AndroidToJs: AndroidToJs;

