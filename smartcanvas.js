let mousedown = false
let canvases = []
class SmartCanvas {
    constructor(canvasElement) {
        this.canvasElement = canvasElement
        this.ctx = canvasElement.getContext("2d")
        this.ctx.lineJoin = "round"
        this.bounds = canvasElement.getBoundingClientRect()
        this.pathPoints = []
        this.tool = "pen"
        canvases.push(this)
        let eta = this
        let mostrecentMousePos = {x:0,y:0}
        this.canvasElement.onmousemove = function(e,bypass){
            if (mousedown) {
                let ctx = eta.ctx
                if (eta.tool == "pen"){
                    if (!e.shiftKey || bypass){
                        e = bypass || e
                        ctx.lineTo(e.x - eta.bounds.left , e.y- eta.bounds.top);
                        ctx.stroke()
                        eta.pathPoints.push([e.x - eta.bounds.left , e.y- eta.bounds.top])
                    }else{
                        mostrecentMousePos.x=e.x
                        mostrecentMousePos.y=e.y
                    }
                }else if (eta.tool == "eraser") {
                    let l = eta.pathPoints.length
                    eta.pathPoints.push([e.x - eta.bounds.left , e.y- eta.bounds.top])
                    let p0 = eta.pathPoints[l]
                    let p1 = eta.pathPoints[l-1]
                    let w = eta.ctx.lineWidth

                    let minX = Math.min(p0[0],p1[0])
                    let minY = Math.min(p0[1],p1[1])
                    let maxX = Math.max(p0[0],p1[0])
                    let maxY = Math.max(p0[1],p1[1])
                    eta.ctx.clearRect(minX - w, minY - w, maxX + 2*w - minX, maxY + 2*w - minY);
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
    erase(posInfo, size,color){
        if (posInfo.length < 2) {
            return "not an erase"
        }
        let eta = this


        for (let i = 1; i < posInfo.length; i ++) {
            let p0 = posInfo[i]
            let p1 = posInfo[i-1]
            let w = size

            let minX = Math.min(p0[0],p1[0])
            let minY = Math.min(p0[1],p1[1])
            let maxX = Math.max(p0[0],p1[0])
            let maxY = Math.max(p0[1],p1[1])
            eta.ctx.clearRect(minX - w, minY - w, maxX + 2*w - minX, maxY + 2*w - minY);
        }

       
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

