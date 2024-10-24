import { right } from "mind-plugins-core"
export function Circle(pen,recursion = true) {
    if (!pen)return // 递归中断条件
    //  第一步，设置图元的direction 布局属性为你的自定义的布局名
    pen.mind.direction = 'circle'
    // 第二步，获取该图元pen的脑图子集列表
    let children = pen.mind.children || []


    // 第三步，编辑每个子集位置 书写你的自定义布局代码！
        // 先获取此图元的位置
    let worldRect = meta2d.getPenRect(pen)
        // 子级间的间距
    let gap = 200
    let len = children.length
    if(pen.mind.isRoot){
        for (let i = 0; i < len; i++) {
            let child = meta2d.store.pens[children[i]]
            let x = worldRect.x
            let y = worldRect.y + (i+1) * gap
            // child.mind.x = x
            // child.mind.y = y
            child.mind.connect = Circle.connectRule(pen,child)
            meta2d.setValue({
                id:child.id,
                x,
                y,
                background:"#f5741a",
            },{render:false})
            // if(recursion) Circle(child,true);
        }
    }else {
        right(pen,true)
    }
}
// 第四步，编写你的连线规则
/***
 * @description 编写连线规则  可能在不同场景下的连线规则不同，用户需自己适配、
 * @param pen 图元对象 当前图元
 * @param child 图元对象 子级图元
 */

Circle.connectRule = (pen,child)=>{
    return {
        from:pen.id,  // 这里表示从哪个
        to:child.id,
        startIndex: 2,
        fromAnchor: pen.anchors[2],
        endIndex: 0,
        toAnchor: child.anchors[0]
    }
}