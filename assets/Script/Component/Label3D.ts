
import { _decorator, Component, Node, ModelComponent, Texture2D, Color } from 'cc';
// import { PlatformManager } from '../../Platform/PlatformManager';
// import { PlatformType } from '../../Platform/PlatformType';
const { ccclass, property } = _decorator;

@ccclass('Label3D')
export class Label3D extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;

    @property
    size: number = 256;

    @property({
        type: Color
    })
    color: Color = new Color();

    @property
    public str: string = '';


    model: ModelComponent = null;

    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    texture: Texture2D;

    private _string: string = '';

    start() {
        this.string = this.str;
    }

    public get string() {
        return this._string;
    }

    public set string(v: string) {
        if (this._string != v) {
            if (this.canvas == null) {
                this.model = this.getComponent(ModelComponent);

                this.makeTextCanvas('', this.size, this.size);
                this.texture = new Texture2D();
                this.texture.create(this.size, this.size, Texture2D.PixelFormat.RGBA8888);
            }
            this.changeText(v);
        }
    }

    public setColor(c: Color) {
        this.color = c;
        if (this.model) {
            this.ctx.fillStyle = 'rgb(' + this.color.r + ',' + this.color.g + ',' + this.color.b + ')';
            this.texture.uploadData(this.canvas);
            this.model.material.setProperty('mainTexture', this.texture);
        }
    }

    // 将文字放在画布中间
    makeTextCanvas(text, width, height) {
        this.canvas = document.createElement('canvas');
        //console.log("makeTextCanvas", width, height)
        this.canvas.width = width;
        this.canvas.height = height;

        var textCtx = this.canvas.getContext("2d");
        this.ctx = textCtx;
        // if (PlatformManager.platform == PlatformType.OppoMinGame) {
        //     textCtx.font = "40px sans-serif";
        //     // textCtx.fillStyle = this.color.toHEX('#rrggbb');
        //     textCtx.fillStyle = 'rgb(' + this.color.r + ',' + this.color.g + ',' + this.color.b + ')';
        //     textCtx.textAlign = "center";
        // } else {
        textCtx.font = "40px Arial";
        textCtx.fillStyle = 'rgb(' + this.color.r + ',' + this.color.g + ',' + this.color.b + ')';
        //水平居中
        textCtx.textAlign = "center";
        // }

        //垂直居中
        textCtx.textBaseline = "middle";

        textCtx.clearRect(0, 0, this.size, this.size);
        textCtx.fillText(text, this.size / 2, this.size / 2);

        // if (PlatformManager.platform != PlatformType.OppoMinGame)
        this.canvas = textCtx.canvas;
    }

    /**
     * 
     * @param str 修改文字
     */
    changeText(str: string) {
        this.ctx.clearRect(0, 0, this.size, this.size);
        this.ctx.fillText(str, this.size / 2, this.size / 2);

        this.texture.uploadData(this.canvas);
        this.model.material.setProperty('mainTexture', this.texture);
    }
}

