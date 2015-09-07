//程序入口
$(() => {
    var main = new MainActivity(<HTMLCanvasElement>$('canvas').get(0));
    var btn1 = new Button();
    btn1.left = 10;
    btn1.top = 30;
    btn1.name = 'NO.1'
    

    var btn2 = new Button();
    btn2.left = 10;
    btn2.top = 30;
    btn2.name = 'NO.2'

    var box1 = new Box(400,400);
    var box2 = new Box(200,200);
    box1.top = 100;
    box1.left = 10;

    box2.top = 50;
    box2.left = 20;

    main.addChild(btn2);
    main.addChild(box1);
    
    box1.addChild(box2);
    box2.addChild(btn1);

    //初始化2个按钮的点击事件
    btn1.click = (v) => {
        box1.removeChild(box2);
    }

    btn2.click = (v) => {
        if (box2.parent) {
            alert('Hello World');
        } else {
            box1.addChild(box2);
        }
    }

})

//被实现的类们
class MainActivity extends view.Activity {

}

class Button extends view.View {
    private _bg: HTMLImageElement;
    private _bg_press: HTMLImageElement;
    name: string = 'Button';

    click: (v:Button) => void;

    constructor() {
        super();
        this.width = 100;
        this.height = 40;
        this._bg = new Image();
        this._bg.src = 'img/btn.png';
        this.setBackGround(this._bg);   

        this._bg_press = new Image();
        this._bg_press.src = 'img/btn_press.png';

        this.onDraw = (ctx: CanvasRenderingContext2D) => {
            ctx.fillStyle = 'white';
            ctx.font = "16px Calibri";
            ctx.fillText(this.name,(this.width - 9 * this.name.length) / 2, this.height / 2, this.width);
        }
        
        this.addTouchEventListener((e) => {
            switch (e.touchType)
            {
                case view.View.DOWN:
                    this.setBackGround(this._bg_press);
                    break;
                case view.View.UP:
                    this.setBackGround(this._bg);
                    if (this.click &&e.offX > this.left && e.offX < this.right && e.offY > this.top && e.offY < this.bottom) {
                        this.click(this);
                    }
                    break;
            }


            return true;
        }); 
    }
}

class Box extends view.Container {
    private _bg: HTMLImageElement;

    constructor(w,h) {
        super();
        this.width = w;
        this.height = h;
        this._bg = new Image();
        this._bg.src = 'img/bg.png';
        this.setBackGround(this._bg);
        var offX = 0;
        var offY = 0;

        this.addTouchEventListener((e) => {
            switch (e.touchType) {
                case view.View.DOWN:
                    offX = this.left - e.offX;
                    offY = this.top - e.offY;
                    break;
                case view.View.MOVE:
                    this.left = offX + e.offX;
                    this.top = offY + e.offY;
                    this.nowType = view.ViewType.CHANGE;

                    break;
                case view.View.UP:
                    
                    break;
            }


            return true;
        }); 
    }
}