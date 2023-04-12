let delayFunction = (func, args) => {

    if (args.length === 2) {
        setTimeout(() => {
            func(...args);
        }, 2000)
    } else {
        return new Promise((res, rej) => {
            setTimeout(() => {
                res(func(...args))
            },2000)
        })
    }
}

export default delayFunction;