export function mergeProps(target,resource) {
    for(const i in target){
        if(['width','height','x','y'].includes(i)){
            let rect = meta2d.getPenRect(resource)
            target[i] = rect[i]
            continue
        }
        if(resource[i]){
            target[i] = resource[i]
        }else {
            target[i] = resource.calculative?.[i]
        }
        if(!target[i]){
            switch (typeof target[i]) {
                case "string":
                    target[i] = ""
                    break
                case "number":
                    target[i] = 0
                    break
                case "boolean":
                    target[i] = false
                    break
            }
        }
    }
}

export function deepAccess(obj, path) {
    return path.split('.').reduce(function(prev, curr) {
        return prev ? prev[curr] : undefined;
    }, obj);
}

export function debounce(func, wait) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}