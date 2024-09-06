class Slider {
    constructor(min,max,val,inline){
        this.DOM = document.createElement((inline && "span") || "div")
        this.DOM.className = "Slider"
        this.DOM.innerHTML =   `<input type="number" min="${min}" max="${max}" value="${val}">
                                <input type="range"  min="${min}" max="${max}" value="${val}">;`

        this._min = min
        this._max = max
        this._value = val

        this.numInput = this.DOM.querySelector("input[type=number]");
        this.ranInput = this.DOM.querySelector("input[type=range]");

        let eta = this
        this.numInput.onchange= function(){
            eta.value = eta.numInput.value

        }

        this.ranInput.oninput = function(){
            eta.value = eta.ranInput.value
        }
    }
    get max(){
        return this._max
    }
    set max(newVal){
        this.numInput.max = newVal
        this.ranInput.max = newVal
        this._max = max
    }

    get min(){
        return this._min
    }
    set min(newVal){
        this.numInput.min = newVal
        this.ranInput.min = newVal
        this._min = max
    }

    get value(){
        return this._value
    }
    set value(newVal){
        this.numInput.value = newVal
        this.ranInput.value = newVal
        this._value = newVal

        if (this.link) {
            this.link[0] [this.link[1]] = this._value
            console.log(this.link)

        }
    }

    setLink(object,prop){

        this.link = [object,prop]
        console.log(this.link)
        this.value = this.value
    }
}




class Radio {
    constructor(choices,inline){
        this.DOM = document.createElement((inline && "span") || "div")
        this.DOM.className = "Radio"
        this.choices = []
        this._selected = false
        let eta = this
        choices.forEach(c => {
            let bu = document.createElement("button")
            bu.innerHTML = c.html || c.title
            this.DOM.appendChild(bu)
            bu.onclick = function(){
                eta.value = c.title
            }
            this.choices.push([bu,c.title])
        });  
        console.warn(this.choices.map(a=>a[0].onclick));
      
    }
    
    
    get selected(){
        return this._selected[1]
    }

    set selected(newVal){
        this.choices.forEach(c=>{
            console.log(newVal,c[1],c[1]==newVal)

            if (c[1] == newVal){
                console.log(c[0].innerHTML)
                c[0].className = "selected"
            }else{
                c[0].className= ""
            }
        })
        this._selected = newVal

        if (this.link) {
            this.link[0] [this.link[1]] = this._selected
        }

    }
    get value(){
        return this._selected
    }
    set value(newVal){
        this.selected = newVal
    }

    
    setLink(object,prop){
        this.link = [object,prop]
        console.log(this.link)
        this.value = this.value
    }   
}