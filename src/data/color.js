import { generateColor } from "mind-plugins-core" // 导入颜色迭代器

export default function timeColorRule(pen,recursion = true){
    // 获取此节点下的所有子节点
    let children = pen.mind.children || [];

    // 获取颜色迭代器对象
    let generateColorFunc = generateColor();

    // 遍历子节点 设置颜色
    for(let i = 0;i<children.length;i++){
        let child = meta2d.store.pens[children[i]]
        if(!child)continue
        let nodeColor = undefined

        // 自定义颜色规则
        if(pen.mind.level === 0){
            // 获取迭代的颜色
            nodeColor =  generateColorFunc.next().value;
        }else {
            // 设置子级颜色，继承父级
            pen.color.length === 9 ?  nodeColor = pen.color : nodeColor = pen.color+'66'
        }

        // 设置颜色
        meta2d.setValue({
            id: child.id,
            color: nodeColor
        },{render:false}); // render设置为false，插件会统一render

        // 将连线颜色也设置为此颜色
        child.mind.lineColor = nodeColor

        // 递归
        if(recursion) timeColorRule(child,true);
    }}