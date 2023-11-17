import axios from "axios";
import {parseSvg} from "@meta2d/svg";
import {ElMessage} from "element-plus";
import {EventAction, PenType} from "@meta2d/core";
import {useEventbus} from "../hooks/useEventbus.js";


function getUserDir(path,extend = []) {
    return async () => {
        const {data: fileList} = await axios.get(path)
        return fileList.concat(extend)  // 合并路径，方便未来用户自定义扩充路径
    }
}

export const userPensUrl = {
    "icon": getUserDir("/icon/",[]),
    "svg": getUserDir("/svg/",[]),
    "png": getUserDir("/png/",[]),
    "path2D": getUserDir("/path2D/",[]),
    "canvasDraw": getUserDir("/canvasDraw/",[])
}


export const menu = {
    left: [{
        key: "file",
        name: "文件",
        icon: "",
        children: [
            {
                name: "新建文件",
                action: "newFile"
            },
            {
                name: "打开文件",
                action: "openFile"
            },
            {
                name: "导入文件",
                action: "loadFile"
            }
        ]
    },
        {
            key: "save",
            name: "保存",
            icon: "",
            action: "saveFile"
        },
        {
            key: "magnifier",
            name: "放大镜",
            icon: "",
            action: "openMagnifier"
        },
        {
            key: "map",
            name: "缩略图",
            icon: "",
            action: "openMap"
        },
        {
            key: "pen",
            name: "钢笔",
            icon: "",
            action: "usePen"
        },
        {
            key: "pencil",
            name: "铅笔",
            icon: "",
            action: "usePencil"
        }],
    right: [
        {
            key: "undo",
            name: "撤销",
            icon: "l-angle-left",
            action: "undo"
        },
        {
            key: "redo",
            name: "重做",
            icon: "l-angle-right",
            action: "redo"
        },
        {
            key: "start",
            name: "起点",
            icon: "l-line",
            children: [
                {
                    name: "line",
                    icon: "l-line",
                    action: "start",
                    value: "",
                },
                {
                    name: "triangle",
                    icon: "l-to-triangle",
                    action: "start",
                    value: "triangle",
                },
                {
                    name: "diamond",
                    icon: "l-to-diamond",
                    action: "start",
                    value: "diamond",
                },
                {
                    name: "circle",
                    icon: "l-to-circle",
                    action: "start",
                    value: "circle",
                },
                {
                    name: "lineDown",
                    icon: "l-to-lineDown",
                    action: "start",
                    value: "lineDown",
                },
                {
                    name: "lineUp",
                    icon: "l-to-lineUp",
                    action: "start",
                    value: "lineUp",
                },
                {
                    name: "triangleSolid",
                    icon: "l-to-triangleSolid",
                    action: "start",
                    value: "triangleSolid",
                },
                {
                    name: "diamondSolid",
                    icon: "l-to-diamondSolid",
                    action: "start",
                    value: "diamondSolid",
                },
                {
                    name: "circleSolid",
                    icon: "l-to-circleSolid",
                    action: "start",
                    value: "circleSolid",
                },
                {
                    name: "lineArrow",
                    icon: "l-to-line",
                    action: "start",
                    value: "line",
                },

            ]
        },
        {
            key: "end",
            name: "终点",
            icon: "l-line",
            children: [
                {
                    name: "line",
                    icon: "l-line",
                    action: "end",
                    value: "",
                },
                {
                    name: "triangle",
                    icon: "l-to-triangle",
                    action: "end",
                    value: "triangle",
                },
                {
                    name: "diamond",
                    icon: "l-to-diamond",
                    action: "end",
                    value: "diamond",
                },
                {
                    name: "circle",
                    icon: "l-to-circle",
                    action: "end",
                    value: "circle",
                },
                {
                    name: "lineDown",
                    icon: "l-to-lineDown",
                    action: "end",
                    value: "lineDown",
                },
                {
                    name: "lineUp",
                    icon: "l-to-lineUp",
                    action: "end",
                    value: "lineUp",
                },
                {
                    name: "triangleSolid",
                    icon: "l-to-triangleSolid",
                    action: "end",
                    value: "triangleSolid",
                },
                {
                    name: "diamondSolid",
                    icon: "l-to-diamondSolid",
                    action: "end",
                    value: "diamondSolid",
                },
                {
                    name: "circleSolid",
                    icon: "l-to-circleSolid",
                    action: "end",
                    value: "circleSolid",
                },
                {
                    name: "lineArrow",
                    icon: "l-to-line",
                    action: "end",
                    value: "line",
                },

            ]
        },
        {
            key: "line",
            name: "连线",
            icon: "l-line",
            children: [{
                name: "直线",
                icon: " l-line",
                action: "line",
                value: "line"
            }, {
                name: "曲线",
                icon: "l-curve2",
                action: "line",
                value: "curve"
            }, {
                name: "线段",
                icon: "l-polyline",
                action: "line",
                value: "polyline"
            }, {
                name: "脑图",
                icon: "l-mind",
                action: "line",
                value: "mind"
            }]
        },
        {
            key: "manual",
            name: "手动锚点",
            icon: "",
            action: "manual"
        },
        {
            key: "grid",
            name: "网格",
            icon: "",
            action: "grid"
        },
        {
            key: "rule",
            name: "标尺",
            icon: "",
            action: "rule"
        },
        {
            key: "saveAs",
            name: "保存为",
            icon: "",
            children: [
                {
                    name: "svg",
                    action: "saveAs",
                    value: "svg"
                },
                {
                    name: "png",
                    action: "saveAs",
                    value: "png"
                }
            ]
        },
    ]
}

// 分发执行事件函数
export function dispatchFunc(act, value, ...args) {
    // doSomething before
    menuFunc[act](value, ...args)
}

const menuFunc = {
    newFile() {
        window.meta2d.open()
    },
    async openFile() {
        const file = await window.showOpenFilePicker().catch(() => {
            console.log("打开文件失败")
            return false
        })
        if (file) {
            const dataObj = await file[0].getFile()
            const data = await dataObj.text()
            if (data) {
                const json = JSON.parse(data);
                window.meta2d.open(json);
                useEventbus().customEmit('opened')
            }
        }
    },
    async loadFile() {
        // 该方法有兼容性问题
        const file = await window.showOpenFilePicker().catch(() => {
            ElMessage({message: '打开文件失败', type: "error"})
            return false
        })
        if (file) {
            //判断文件类型
            const dataObj = await file[0].getFile()
            const data = await dataObj.text()
            if (dataObj.type === 'image/svg+xml') {
                const pen = parseSvg(data)
                meta2d.canvas.addCaches = pen
                ElMessage({message: '添加成功，请点击放置点', type: "success"})
                return
            }
            ElMessage({message: '添加失败，暂且只支持svg文件', type: "error"})
        }
    },
    saveFile() {
        const jsonData = window.meta2d.data() // 获取数据 数据怎么来？怎么处理？
        const json = JSON.stringify(jsonData)
        const file = new Blob([json], {type: "application/json"})
        const link = URL.createObjectURL(file)
        let a = document.createElement('a')
        a.setAttribute("download", meta2d.fileName || "未命名")
        a.setAttribute("href", link)
        a.click()
    },
    openMagnifier() {
        if (window.meta2d.canvas.magnifierCanvas.magnifier) { // 判断放大镜状态
            window.meta2d.hideMagnifier()  // 关闭放大镜
        } else {
            window.meta2d.showMagnifier() // 打开放大镜
        }
    },
    openMap() {
        if (window.meta2d.map?.isShow) {
            window.meta2d.hideMap()
        } else {
            window.meta2d.showMap()
        }
    },
    // usePen: (()=>{
    //     let flat = false
    //     console.log("进来了")
    //     return ()=> {
    //         console.log("执行了")
    //         if(!flat){
    //             console.log("开始画画")
    //             window.meta2d.drawLine('curve')
    //         }else {
    //             console.log("结束画画")
    //             window.meta2d.drawLine()
    //         }
    //         flat = !flat
    //     }
    // })(),
    // TODO 使用前 判断是否已被占用
    usePen() {
        if (window.meta2d.canvas.drawingLineName) {
            window.meta2d.drawLine()
            window.meta2d.finishPencil()
        } else {
            window.meta2d.drawLine('curve')
        }
    },
    usePencil() {
        if (window.meta2d.canvas.pencil) {
            window.meta2d.stopPencil()
            window.meta2d.finishPencil()
        } else {
            window.meta2d.drawingPencil()
        }
    },
    undo() {
        meta2d.undo()
    },
    redo() {
        meta2d.redo()
    },
    start(value, icon) {
        const a = menu.right.find((i => i.key === "start")) // 获取按钮元数据
        a.icon = icon  // 修改元数据的图标
        meta2d.store.data.fromArrow = value  // 修改meta2d的fromArrow样式值
        if (meta2d.store.active) {   // 循环遍历 修改激活图元fromArrow// 样式
            meta2d.store.active.forEach((i) => {
                if (i.type === PenType.Line) {
                    i.fromArrow = value
                }
            })
        }
        meta2d.render()  //重新渲染
    },
    end(value, icon) {
        const a = menu.right.find((i => i.key === "end"))
        a.icon = icon
        meta2d.store.data.toArrow = value
        if (meta2d.store.active) {
            meta2d.store.active.forEach((i) => {
                if (i.type === PenType.Line) {
                    i.toArrow = value
                }
            })
        }
        meta2d.render()
    },
    line(value, icon) {
        const a = menu.right.find((i => i.key === "line"))
        a.icon = icon
        meta2d.store.options.drawingLineName = value
        meta2d.canvas.drawingLineName &&
        (meta2d.canvas.drawingLineName = value);
        meta2d.store.active?.forEach((pen) => {
            meta2d.updateLineType(pen, value);
        });
        meta2d.render()
    },
    grid() {
        if (meta2d.store.data.grid) {
            meta2d.setGrid({
                grid: false
            })
        } else {
            meta2d.setGrid({
                grid: true,
                gridColor: '#e2e2e2',
                gridSize: 10,
                gridRotate: 0
            });
        }
        meta2d.render()

    },
    rule() {
        if (meta2d.store.data.rule) {
            meta2d.setRule({
                rule: false,
            });
        } else {
            meta2d.setRule({
                rule: true,
                ruleColor: '#414141'
            });
        }
        meta2d.render()

    },
    manual() {
        meta2d.toggleAnchorMode()
    },
    saveAs(value) {
        // 选择导出格式
        switch (value) {
            case "png":
                let name = meta2d.store.data.name
                if (name) {
                    name += '.png'
                }
                meta2d.downloadPng(name)  // 导出为png
                break
            case "svg":
                downloadSvg()  // 导出为svg
                break
        }
    }
}

function isShowChild(pen, store) {
    let selfPen = pen;
    while (selfPen && selfPen.parentId) {
        const oldPen = selfPen;
        selfPen = store.pens[selfPen.parentId];
        const showChildIndex = selfPen?.calculative?.showChild;
        if (showChildIndex != undefined) {
            const showChildId = selfPen.children[showChildIndex];
            if (showChildId !== oldPen.id) {
                return false;
            }
        }
    }
    return true;
}

const downloadSvg = () => {

    const rect = meta2d.getRect();
    rect.x -= 10;
    rect.y -= 10;
    const ctx = new C2S(rect.width + 20, rect.height + 20);
    ctx.textBaseline = 'middle';
    for (const pen of meta2d.store.data.pens) {
        if (pen.visible == false || !isShowChild(pen, meta2d.store)) {
            continue;
        }
        meta2d.renderPenRaw(ctx, pen, rect);
    }

    let mySerializedSVG = ctx.getSerializedSvg();
    if (meta2d.store.data.background) {
        mySerializedSVG = mySerializedSVG.replace('{{bk}}', '');
        mySerializedSVG = mySerializedSVG.replace(
            '{{bkRect}}',
            `<rect x="0" y="0" width="100%" height="100%" fill="${meta2d.store.data.background}"></rect>`
        );
    } else {
        mySerializedSVG = mySerializedSVG.replace('{{bk}}', '');
        mySerializedSVG = mySerializedSVG.replace('{{bkRect}}', '');
    }

    mySerializedSVG = mySerializedSVG.replace(/--le5le--/g, '&#x');

    const urlObject = window.URL || window;
    const export_blob = new Blob([mySerializedSVG]);
    const url = urlObject.createObjectURL(export_blob);

    const a = document.createElement('a');
    a.setAttribute(
        'download',
        `${meta2d.store.data.name || 'le5le.meta2d'}.svg`
    );
    a.setAttribute('href', url);
    const evt = document.createEvent('MouseEvents');
    evt.initEvent('click', true, true);
    a.dispatchEvent(evt);
};


export const mapProps = {
    fileName: "",
    color: "#eeeeee",
    penBackground: "",
    background: "",
    backGroundImage: "",
    rule: false,
    ruleColor: "",
    grid: false,
    gridColor: "",
    gridSize: 10,
    gridRotate: 90
}

export const communicateProp = {
    websocketUrl: "",
    websocketConnected: false,
    mqttUrl: "ws://broker.emqx.io:8083/mqtt",
    mqttConnected: false,
    clientId: "",
    username: "",
    password: "",
    mqttTopics: "le5le"
}

export const globalConfigProps = {
    color: "",
    activeColor: "",
    hoverColor: "",
    hoverBackground: "",
    anchorColor: "",
    anchorRadius: "",
    anchorBackground: "",
    dockColor: "",
    dragColor: "",
    animateColor: "",
    textColor: "",
    fontFamily: "",
    fontSize: "",
    lineHeight: "",
    textAlign: "",
    textBaseline: "",
    rotateCursor: "",
    hoverCursor: "",
    disableInput: false,
    disableRotate: false,
    disableAnchor: false,
    disableEmptyLine: false,
    disableRepeatLine: false,
    disableScale: false,
    disableDockLine: false,
    disableTranslate: false,
    minScale: 0.1,
    maxScale: 10,
    autoAnchor: true,
    interval: 10,
    animateInterval: 10,
    textRotate: true,
    textFlip: false
}

export const appearanceProps = {
    x: 0,
    y: 0,
    text: "",
    color: "",
    width: 0,
    height: 0,
    lineWidth: 0,
    hoverColor: "",
    activeColor: "",
    background: "",
    hoverBackground: "",
    activeBackground: "",
    shadowColor: "",
    shadowBlur: 0,
    textHasShadow: false,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    anchorColor: "",
    anchorRadius: 0,
    borderRadius: 0,
    globalAlpha: 0,
    ratio: false,
    rotate: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 0,
    paddingLeft: 0,
    progress: 0,
    progressColor: "",
    verticalProgress: false,
    flipX: false,
    flipY: false,
    dash: 0,
    fontFamily: "",
    fontSize: "",
    textColor: "",
    hoverTextColor: "",
    activeTextColor: "",
    textBackground: "",
    textAlign: "",
    textBaseline: "",
    lineHeight: 0,
    whiteSpace: "",
    textWidth: 0,
    textHeight: "",
    ellipsis: "",
    hiddenText: false,
    disableAnchor: false,
    disableInput: false,
    disableRotate: false,
    disableSize: false,
    image: ""
}

// 事件类型
export const eventType = [
    {
        name: "鼠标移入",
        event: "enter"
    },
    {
        name: "鼠标移出",
        event: "leave"
    },
    {
        name: "选中",
        event: "active"
    },
    {
        name: "取消选中",
        event: "inactive"
    },
    {
        name:"单击",
        event:"click"
    },
    {
        name:"双击",
        event: "dbclick"
    }
]


// 事件行为
export const eventBehavior = [
    {
        name: "打开链接",
        behavior: EventAction.Link,
        depend:[
            {
                name:"链接地址",
                type:"input",
                bindProp:"value",
                option:{
                    placeholder:"URL"
                },
                bindData:""
            },
            {
                name:"打开方式",
                type:"select",
                bindProp:"params",
                option:{
                    list:[
                        {
                            name:"新窗口打开",
                            value:"_blank"
                        },{
                            name:"覆盖当前页面",
                            value:"self"
                        }
                    ]
                },
                bindData:""
            }
        ]
    },
    {
        name:"执行动画",
        behavior: EventAction.StartAnimate,
        depend:[
            {
                name:"目标id/tag",
                type:"input",
                bindProp:"value",
                option:{
                    placeholder:"id/tag"
                },
                bindData:""
            },
        ]
    },
    {
        name:"暂停动画",
        behavior: EventAction.PauseAnimate,
        depend:[
            {
                name:"目标id/tag",
                type:"input",
                bindProp:"value",
                option:{
                    placeholder:"id/tag"
                },
                bindData:""
            },
        ]
    },
    {
        name:"停止动画",
        behavior: EventAction.StopAnimate,
        depend:[
            {
                name:"目标id/tag",
                type:"input",
                bindProp:"value",
                option:{
                    placeholder:"id/tag"
                },
                bindData:""
            },
        ]
    },
    {
        name:"播放视频",
        behavior: EventAction.StartVideo,
        depend:[
            {
                name:"目标id/tag",
                type:"input",
                bindProp:"value",
                option:{
                    placeholder:"id/tag"
                },
                bindData:""
            },
        ]
    },
    {
        name:"暂停视频",
        behavior: EventAction.PauseVideo,
        depend:[
            {
                name:"目标id/tag",
                type:"input",
                bindProp:"value",
                option:{
                    placeholder:"id/tag"
                },
                bindData:""
            },
        ]
    },
    {
        name: "停止视频",
        behavior: EventAction.StopVideo,
        depend:[
            {
                name:"目标id/tag",
                type:"input",
                bindProp:"value",
                option:{
                    placeholder:"id/tag"
                },
                bindData:""
            },
        ]
    }
]


export const animateType = [
    {
        name:"跳动",
        key:"bounce",
        frames:[
            {
                duration: 300,
                y:10
            },
        ]
    },
    {
        name:"旋转",
        key:"rotate",
        frames: [
            {
                duration:1000,
                rotate:360
            },

        ]
    },
    {
        name:"提示",
        key:"tip",
        frames: [{
            duration:300,
            scale:1.3
        }]
    }
]
