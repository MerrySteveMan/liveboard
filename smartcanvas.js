let mousedown = false
let canvases = []
class SmartCanvas {
    constructor(canvasElement) {
        this.canvasElement = canvasElement
        this.ctx = canvasElement.getContext("2d")
        this.bounds = canvasElement.getBoundingClientRect()
        canvases.push(this)
        let eta = this
        let mostrecentMousePos = {x:0,y:0}
        this.canvasElement.onmousemove = function(e,bypass){
            if (mousedown  ) {
                if (!e.shiftKey || bypass){
                    let ctx = eta.ctx
                    e = bypass || e
                    ctx.lineTo(e.x - eta.bounds.left , e.y- eta.bounds.top);
                    ctx.stroke()
                   // ctx.beginPath();
                   // ctx.moveTo(e.x - eta.bounds.left , e.y- eta.bounds.top)
                }else{
                    mostrecentMousePos.x=e.x
                    mostrecentMousePos.y=e.y
                }
            }
        }

        document.addEventListener("keyup",function(e){
            if (e.key == "Shift") {
                eta.canvasElement.onmousemove(e,mostrecentMousePos)
            }
        })
    }
    
}


document.onmousedown = function(e){
    window.onresize()
     mousedown = true 
     canvases.forEach( canv=>{
        canv.ctx.beginPath();
        canv.ctx.strokeStyle = document.querySelector("input[type='color']").value;
        canv.ctx.moveTo(e.clientX - canv.bounds.left, e.clientY - canv.bounds.top)
        console.log("SIGMA")
    })
}

document.onmouseup = function(){
    mousedown = false 
}

document.onmousemove = function(me){

}


window.onresize = function(e){
    canvases.forEach( canv=>{
        canv.bounds = canv.canvasElement.getBoundingClientRect()
    })
}

