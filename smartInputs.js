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




