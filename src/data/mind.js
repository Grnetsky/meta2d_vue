import {createDom, toolBoxPlugin,defaultFuncs} from "mind-plugins-core"

let FuncList = [
    {
        name: '边框样式',
        setDom(self,pen){
            return '边框样式666'
        },
        setChildDom(self){
            let div = createDom('div',{})
        }
    }
]

