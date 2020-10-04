import { Vec2, Prefab, instantiate, tween, Vec3, Node } from "cc";

//公用工具类
export class PubUtils {


    /**
     * 储存游戏数据
     * @param game 游戏名字
     * @param key 需要储存的key值
     * @param data 数据
     */
    public static SetGameLocalData(game: string, key: string, data: any) {
        this.SetLocalData(game + key, data);
    }

    /**
     * 储存数据到本地
     * @param key 
     * @param data 
     */
    public static SetLocalData(key: string, data: any) {
        if (typeof data == "object") {
            data = JSON.stringify(data);
        }
        localStorage.setItem(key, data);
    }

    /**
     * 获取本地储存的数据
     * @param key 
     * @returns string
     */
    public static GetLocalData(key: string): any {
        let data = localStorage.getItem(key);
        if (data == null || data == "" || typeof data == null || data == 'NaN') {
            return null;
        }
        data = JSON.parse(data);
        return data;
    }

    /**
     * 获取本地游戏数据
     * @param game 游戏名字
     * @param key 
     */
    public static GetGameLocalData(game: string, key: string) {
        return this.GetLocalData(game + key);
    }

    public static ClearLocalData(key: string) {
        if (key == null || key == "") return;
        localStorage.removeItem(key);
    }

    public static ClearGameLocalData(game: string, key: string) {
        this.ClearLocalData(game + key);
    }

    public static Range(min: number, max: number): number {
        return Math.floor(Math.random() * 100000) % (max - min) + min;
    }

    public static randomNum(maxNum, minNum, decimalNum): number {
        var max = 0, min = 0;
        minNum <= maxNum ? (min = minNum, max = maxNum) : (min = maxNum, max = minNum);
        switch (arguments.length) {
            case 1:
                return Math.floor(Math.random() * (max + 1));
            case 2:
                return Math.floor(Math.random() * (max - min + 1) + min);
            case 3:
                return parseFloat((Math.random() * (max - min) + min).toFixed(decimalNum));
            default:
                return Math.random();
        }
    }


    // Interpolates between /a/ and /b/ by /t/. /t/ is clamped between 0 and 1.
    public static Lerp(a: number, b: number, t: number): number {
        return a + (b - a) * this.Clamp01(t);
    }

    // Clamps value between 0 and 1 and returns value
    public static Clamp01(value: number): number {
        if (value < 0)
            return 0;
        else if (value > 1)
            return 1;
        else
            return value;
    }

    public static EaseOutQuart(t) {
        t = this.Clamp(t, 0, 1);
        t--;
        return -(t * t * t * t - 1);
    }

    public static Clamp(value: number, min: number, max: number): number {
        if (value < min)
            value = min;
        else if (value > max)
            value = max;
        return value;
    }

    // Degrees-to-radians conversion constant (RO).
    public static Deg2Rad = Math.PI * 2 / 360;

    // Radians-to-degrees conversion constant (RO).
    public static get Rad2Deg() {
        return 1 / this.Deg2Rad;
    };

    static MathMoveTowards(current: number, target: number, maxDelta: number) {
        if (Math.abs(target - current) <= maxDelta)
            return target;
        return current + Math.sign(target - current) * maxDelta;
    }

    
    //将一个点/当前点/直线移动到A/目标/点。
    static MoveTowards(current, target, maxDistanceDelta) {
        // avoid vector ops because current scripting backends are terrible at inlining
        //避免使用向量操作，因为当前脚本后端在内联时非常糟糕
        let toVector_x = target.x - current.x;
        let toVector_y = target.y - current.y;
        let toVector_z = target.z - current.z;

        let sqdist = toVector_x * toVector_x + toVector_y * toVector_y + toVector_z * toVector_z;

        if (sqdist == 0 || sqdist <= maxDistanceDelta * maxDistanceDelta)
            return target;
        let dist = Math.sqrt(sqdist);
        return new Vec3(current.x + toVector_x / dist * maxDistanceDelta,
            current.y + toVector_y / dist * maxDistanceDelta,
            current.z + toVector_z / dist * maxDistanceDelta);
    }

    /**
    * 解析json到model属性上
    * @param model 
    * @param json 
    * @param types 
    */
    public static parseJsonToModel(model: any, json: any, types: any) {
        let keys = Object.keys(types);
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            let type = types[key];
            switch (type) {
                case "int": {
                    model[key] = parseInt(json[key]);
                    break;
                }
                case "float": {
                    model[key] = parseFloat(json[key]);
                    break;
                }
                case 'array-int': {
                    let s = json[key] as string;
                    let arry = s.split(',');
                    for (let i = 0; i < arry.length; i++) {
                        model[key].push(parseInt(arry[i]));
                    }
                    break;
                }
                case 'array-string': {
                    let s = json[key] as string;
                    let arry = s.split(',');
                    for (let i = 0; i < arry.length; i++) {
                        model[key].push(arry[i]);
                    }
                    break;
                }
                default: {
                    model[key] = json[key];
                    break;
                }
            }
        }
    }


    public static copyObject(from_obj, to_obj) {
        let keys = Object.keys(from_obj);
        for (let key in keys) {
            let k = keys[key]
            if (from_obj[k] instanceof Array) {
                to_obj[k] = [].concat(from_obj[k]);
            }
            else {
                to_obj[k] = from_obj[k];
            }
        }
    }

    // Gradually changes a value towards a desired goal over time.
    public static SmoothDamp(current, target, currentVelocity, smoothTime, maxSpeed: number = Number.POSITIVE_INFINITY, deltaTime) {
        // Based on Game Programming Gems 4 Chapter 1.10
        smoothTime = Math.max(0.0001, smoothTime);
        let omega = 2 / smoothTime;

        let x = omega * deltaTime;
        let exp = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);
        let change = current - target;
        let originalTo = target;

        // Clamp maximum speed
        let maxChange = maxSpeed * smoothTime;
        change = PubUtils.Clamp(change, -maxChange, maxChange);
        target = current - change;

        let temp = (currentVelocity + omega * change) * deltaTime;
        currentVelocity = (currentVelocity - omega * temp) * exp;
        let output = target + (change + temp) * exp;

        if (originalTo - current > 0.0 == output > originalTo) {
            output = originalTo;
            currentVelocity = (output - originalTo) / deltaTime;
        }

        return output;
    }


    public static SmoothDampToSpeed(current, target, currentVelocity, smoothTime, deltaTime,) {
        return this.SmoothDamp(current, target, currentVelocity, smoothTime, Number.POSITIVE_INFINITY, deltaTime);
    }

    /**
    * 随机生成手机号
    */
    public static getMoble() {
        var prefixArray = new Array("130", "131", "132", "133", "135", "137", "138", "170", "187", "189");
        var i = PubUtils.Range(0, prefixArray.length);
        var prefix = prefixArray[i];
        for (var j = 0; j < 8; j++) {
            prefix = prefix + Math.floor(Math.random() * 10);
        }
        return prefix;
    }

    public static phoneNameToName(str: string) {
        let str1 = str.slice(0, 3);
        let str2 = str.slice(-2);
        return str1 + "****" + str2;
    }

    // public static getNumColor(color: string): Color {
    //     let ns = this.getNums(color);
    //     return new Color(ns[0] / 255, ns[1] / 255, ns[2] / 255);
    // }

    public static getNums(color: string): Array<number> {
        let a = color.split(",");
        let ary = [];
        for (let i = 0; i < a.length; i++) {
            ary.push(parseInt(a[i]));
        }
        return ary;
    }

    // /**
    //  * 颜色rgb 转 颜色值
    //  * @param color 
    //  */
    // public static colorRGBtoHex(color: Color) {
    //     var hex = "#" + ((1 << 24) + ((color.r * 255) << 16) + ((color.g * 255) << 8) + (color.b * 255)).toString(16).slice(1);
    //     return hex;
    // }

    public static coinNumToStr(coin: number): string {
        if (coin < 1000) {
            return coin.toString();
        } else if (coin < 10000) {
            let c = (coin / 1000)
            c = this.toFixed(c, 2);
            return c + "K";
        } else if (coin < 100000000) {
            let c = coin / 10000;
            let length = 0;
            if (coin < 100000) {
                length = 2;
            } else if (coin < 1000000) {
                length = 1;
            }
            return this.toFixed(c, length) + "W";
        } else {
            return "9999W";
        }
    }

    /**
     * 返回指定小数点后几位  向下取舍
     * @param num  小数
     * @param fixed_length 指定位数
     * @param is_round
     */
    public static toFixed(num: number, fixed_length: number) {
        return Math.floor(num * Math.pow(10, fixed_length)) / Math.pow(10, fixed_length);
    }

    public static UUID: number = 1;
    public static generateUUID(): string {
        let d = new Date().getTime();
        if (window.performance && typeof window.performance.now === "function") {
            d += performance.now(); //use high-precision timer if available
        }
        let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        console.log(uuid);
        return uuid;
        // return (this.UUID++).toString();
    }

    public static getUUID(): string {
        return (this.UUID++).toString();
    }


    //全局调用
    //srcPos:开始位置,
    //dstPos:目标位置
    //radius:圆半径
    //goldCount:切分多少块,多少个金币
    //addGold:需要增加多少金币
    //callBack:动画结束回调
    static createGoldAnim(fabs: Prefab, parent: Node, srcPos: Vec3, dstPos: Vec3, srcNode: Node, radius: number, goldCount: number, addGold: number, callBack: Function) {

        var array = this.getPoint(radius, srcPos.x, srcPos.y, goldCount);

        var nodeArray = new Array();
        for (var i = 0; i < array.length; i++) {
            let gold = instantiate(fabs) as Node;
            let randPos = new Vec3(array[i].x + this.Range(0, 50), array[i].y + this.Range(0, 50));
            nodeArray.push({ gold: gold, randPos: randPos });
            parent.addChild(gold);
            gold.setWorldPosition(srcPos);
        }

        nodeArray.sort(function (a, b) {
            var disa = Vec3.distance(a.randPos, dstPos);
            var disb = Vec3.distance(b.randPos, dstPos);
            return disa - disb;
        });
        var notPlay = false;
        var targetGoldNode = srcNode;
        for (let i = 0; i < nodeArray.length; i++) {
            let pos = nodeArray[i].randPos;
            let node: Node = nodeArray[i].gold;
            tween(node).to(0.5, { worldPosition: pos }).delay(i * 0.03).to(0.5, { worldPosition: dstPos }).call(() => {
                if (!notPlay) {
                    notPlay = true;
                    tween(targetGoldNode).to(0.1, { scale: new Vec3(2, 2, 2) }).to(0.1, { scale: new Vec3(1, 1, 1) }).call(() => {
                        notPlay = false;
                    }).start();
                }

                if (i == nodeArray.length - 1) {
                    if (callBack != null) callBack(addGold);
                }
                node.destroy();
            }).start()
            nodeArray[i].gold.id = i;
        }
    }
    /*
   * 求圆周上等分点的坐标
   * ox,oy为圆心坐标
   * r为半径
   * count为等分个数
   */
    static getPoint(r, ox, oy, count) {
        var point = []; //结果
        var radians = Math.PI / 180 * Math.round(360 / count),
            //弧度
            i = 0;
        for (; i < count; i++) {
            var x = ox + r * Math.sin(radians * i),
                y = oy + r * Math.cos(radians * i);

            point.unshift({ x: x, y: y }); //为保持数据顺时针
        }
        return point;
    }
}