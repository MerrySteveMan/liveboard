let mousedown = false
let canvases = []
class SmartCanvas {
    constructor(canvasElement) {
        this.canvasElement = canvasElement
        this.ctx = canvasElement.getContext("2d")
        this.bounds = canvasElement.getBoundingClientRect()
        this.pathPoints = []
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
                    eta.pathPoints.push([e.x - eta.bounds.left , e.y- eta.bounds.top])
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
    draw(posInfo, size,color){
        if (posInfo.length < 2) {
            return "not a line"
        }
        let eta = this
        eta.ctx.beginPath()
        eta.ctx.moveTo(posInfo[0][0],posInfo[0][1])

        for (let i = 1; i < posInfo.length; i ++) {
            eta.ctx.lineTo(posInfo[i][0],posInfo[i][1])
        }

        eta.ctx.strokeStyle = color
        eta.ctx.lineWidth = size
        eta.ctx.stroke()
        eta.ctx.beginPath()
        eta.ctx.strokeStyle = document.querySelector("input[type='color']").value;
        eta.ctx.lineWidth = document.querySelector("input[type='number']").value;
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
        canv.pathPoints = [[e.clientX - canv.bounds.left, e.clientY - canv.bounds.top]]
    })
}

document.onmouseup = function(){
    mousedown = false 
    canvases.forEach( canv=>{
        if (canv.onRelease) {
            canv.onRelease()
        }
    })
}

document.onmousemove = function(me){

}


window.onresize = function(e){
    canvases.forEach( canv=>{
        canv.bounds = canv.canvasElement.getBoundingClientRect()
    })
}

