export default class Button {
    constructor() {
        this.array = []
    }

    createButtonArray() {
        const btns = this.array
        for (let i = 0; i < 10; i++) {
            const bb = document.createElement("button")
            bb.innerHTML = Math.ceil(Math.random() * 6);
            btns.push(bb)
        }
        return btns
    }

}