let delayFunction = (func, args) => {

    if (args.length === 2) {
        setTimeout(() => {
            func(...args);
        }, 2000)
    } else {
        return new Promise((res, rej) => {
            setTimeout(() => {
                res(func(...args))
            }, 2000)
        })
    }
}

let generateRandomId = (arrayWithObjects) => {
    let newId;
    do {
        newId = Math.floor(Math.random() * 1000000);
    } while (arrayWithObjects.some(user => user.id === newId));
    return newId;
}


export { delayFunction, generateRandomId };