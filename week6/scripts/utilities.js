function select(selector) {
    return document.querySelector(selector);
}

function onTouch(Selector, callback) {
    Selector.addEventListener("touchend", callback);
    Selector.addEventListener("click", callback);
}

function selectAll(selector) {
    return document.querySelectorAll(selector)
}

export {
    select,
    selectAll,
    onTouch,
}