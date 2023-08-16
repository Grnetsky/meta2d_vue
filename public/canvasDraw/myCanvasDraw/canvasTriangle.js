export function canvasTriangle(ctx,pen){
    // 在绘画中若更改了 ctx 的某个属性，例如：fillStyle, strokeStyle, lineWidth 等样式属性，需使用 save 和 restore
    // 注意 save restore 需要成对调用
     ctx.save();
    // 若在绘画函数中，配置了 ctx.strokeStyle or fillStyle ，那么画笔的 color or background 无法对它生效
     ctx.strokeStyle = '#1890ff';
    ctx.moveTo(pen.calculative.worldRect.x + pen.calculative.worldRect.width / 2, pen.calculative.worldRect.y);
    ctx.lineTo(
        pen.calculative.worldRect.x + pen.calculative.worldRect.width,
        pen.calculative.worldRect.y + pen.calculative.worldRect.height
    );
    ctx.lineTo(pen.calculative.worldRect.x, pen.calculative.worldRect.y + pen.calculative.worldRect.height);
    ctx.lineTo(pen.calculative.worldRect.x + pen.calculative.worldRect.width / 2, pen.calculative.worldRect.y);

    ctx.closePath();
    ctx.stroke();
    // 若需要填充 ctx.fill();

    ctx.restore();
}

export function canvasTriangleAnchors(pen) {
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
