function rdm (max){
    return Math.floor(Math.random()*(max +1));
};
function random ( min, max, floor){
    if (floor) return Math.floor((Math.random()*(max - min + 1)) + min);
    return (Math.random()*(max - min)) + min;
};
function rdmAround (x, floor){
    if (floor) return Math.floor( Math.random()* x * 2 - x )
    return Math.random()* x * 2 - x
}
function write (input){
    console.log('%c' +  JSON.stringify(input), 'color: #8BF');
    return void 0;
};
function error (input){
    console.log('%c' + JSON.stringify(input), 'color: #F54;');
    return void 0;
};
function $ (id){
    return document.getElementById(id);
};
function randomColor (){
    return `hsl( ${rdm(360)}, ${random( 20, 70, true)}%, 50%)`
}

let canvas = $('canvas')
let container = $('container')
let c = canvas.getContext('2d')
let width = container.clientWidth
let height = container.clientHeight
let fps = 100

canvas.width = width
canvas.height = height

c.fillStyle = '#CCC'
c.strokeStyle = '#CCC'

// the mouse object will always follow the mouse cursor
let mouse = {
    x: width/2,
    y: height/2,
    z: false
}
canvas.addEventListener( 'mousemove', ( event)=>{
    mouse.x = event.x
    mouse.y = event.y
})
canvas.addEventListener( 'mousedown', ()=>{
    mouse.z = true
})
canvas.addEventListener( 'mouseup', ()=>{
    mouse.z = false
})

class Object {
    
//for a quad    x, y,  'quad',  width, height (square or rectangle)
//for a circle  x, y, 'circle', radius, angle( in radians )

    constructor(x, y, type, a, b, srokeStyle, fillStyle) {
        
        this.x = x;
        this.y = y;

        this.vx = 0;
        this.vy = 0;

        this.type = type;

        switch (this.type) {
            case 'quad':{
                this.w = a;
                this.h = b;
                break
            }
            case 'circle':{
                this.r = a;
                this.a = b;
                break
            }
            case 'fillCircle':{
                this.r = a;
                this.a = b;
                break
            }
        }

        this.srokeStyle = srokeStyle;
        this.fillStyle = fillStyle;

        this.render = ()=>{

            c.strokeStyle = this.srokeStyle;
            c.fillStyle = this.fillStyle;

            switch (this.type) {
                case 'quad': {
                    c.fillRect(this.x, this.y, this.w, this.h);
                    break;
                }
                case 'circle': {
                    c.beginPath();
                    c.arc(this.x, this.y, this.r, 0, this.a, false);
                    c.stroke();
                    break;
                }
                case 'fillCircle': {
                    c.beginPath();
                    c.arc(this.x, this.y, this.r, 0, this.a, false);
                    c.fill();
                    c.stroke();
                    break;
                }

            }
        }

        this.update = ()=>{
            this.x += this.vx
            this.y += this.vy
        }

    }
}

function loop(){

//     --loop--

    setTimeout(() => {
        requestAnimationFrame(loop)
    }, 1000 / fps);

//   --updates--

    circle.x = mouse.x
    circle.y = mouse.y
    circle.update()

    // the canvas will auto resize with the container
    width = container.clientWidth
    height = container.clientHeight
    canvas.width = width
    canvas.height = height

//   --rendering--

    c.clearRect( 0, 0, width, height)
    circle.render()

}

let circle = new Object( width/2, height/2, 'circle', 30, 8, randomColor(), randomColor())















loop()