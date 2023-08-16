// path2d绘画函数
export function myTriangle(pen, ctx) {
    const path = !ctx ? new Path2D() : ctx;
    const { x, y, width, height } = pen.calculative.worldRect;  // 获取坐标
    path.moveTo(x + width / 2, y);
    path.lineTo(x + width, y + height);
    path.lineTo(x, y + height);
    path.lineTo(x + width / 2, y);

    path.closePath();
    if (path instanceof Path2D) return path;
}

// path2d锚点注册函数
export function myTriangleAnchors(pen) {
    const anchors = [];
    anchors.push({
        id: '0',
        penId: pen.id,
        x: 0.5,
        y: 0,
    });

    anchors.push({
        id: '1',
        penId: pen.id,
        x: 1,
        y: 1,
    });

    anchors.push({
        id: '2',
        penId: pen.id,
        x: 0,
        y: 1,
    });
    pen.anchors = anchors;
}

