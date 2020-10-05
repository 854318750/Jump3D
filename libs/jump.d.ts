interface Block {
    bn: string;
    /// <summary>
    /// 位置
    /// </summary>
    x: number;
    y: number;
    z: number;
    /// <summary>
    /// 旋转
    /// </summary>
    rx: number;
    ry: number;
    rz: number;
    rw: number;
    /// <summary>
    /// 缩放
    /// </summary>
    sx: number;
    sy: number;
    sz: number;

    /// <summary>
    /// 组件名字
    /// </summary>
    cn: string;
    /// <summary>
    /// 组件上的所有参数
    /// </summary>
    p: string;
}

interface ExportModel {
    readonly pn: string;
    readonly x: number;
    readonly y: number;
    readonly z: number;

    readonly list: Array<Block>;
}

interface ExportLevelModel {
    readonly list: Array<ExportModel>;
}