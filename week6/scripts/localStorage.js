
export function readFromLocalStorage(key) {
    let list = JSON.parse(window.localStorage.getItem(key));
    return list
}

export function writeToLocalStorage(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
}