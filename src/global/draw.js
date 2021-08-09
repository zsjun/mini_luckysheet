import Store from '../store';
import {
    getRealCellValue,
    checkstatusByCell
} from './getdata';
import {
    isRealNull
} from './validate';
import {
    luckysheet_searcharray
} from '../controllers/sheetSearch';
import {
    chatatABC,
} from '../utils/util';
import {
    luckysheetdefaultstyle
} from '../controllers/constant';

export {
    luckysheetDrawgridRowTitle,
    luckysheetDrawgridColumnTitle,
    luckysheetDrawMain,
}

// Draw Row's title with H5Canvas  123...
function luckysheetDrawgridRowTitle(scrollHeight) {

    let drawHeight = Store.luckysheetTableContentHW[1];
    let offsetTop = Store.columnHeaderHeight;

    let dataset_row_st, dataset_row_ed;
    dataset_row_st = luckysheet_searcharray(Store.visibledatarow, scrollHeight);
    dataset_row_ed = luckysheet_searcharray(Store.visibledatarow, scrollHeight + drawHeight);
    if (dataset_row_st == -1) {
        dataset_row_st = 0;
    }
    if (dataset_row_ed == -1) {
        dataset_row_ed = Store.visibledatarow.length - 1;
    }
    // Whole rectangle on the left row Bar
    let luckysheetTableContent = initWholeRectBar(
        0,
        offsetTop,
        (Store.rowHeaderWidth - 1),
        drawHeight
    );

    let end_r, start_r;
    // Draw rectangle& text in each row
    for (let r = dataset_row_st; r <= dataset_row_ed; r++) {
        if (r == 0) {
            start_r = -scrollHeight - 1;
        } else {
            start_r = Store.visibledatarow[r - 1] - scrollHeight - 1;
        }
        end_r = Store.visibledatarow[r] - scrollHeight;

        let firstOffset = (dataset_row_st == r) ? 0 : 0;
        let lastOffset = (dataset_row_ed == r) ? 0 : 0;
        
        let textWidth = luckysheetTableContent.measureText(r + 1).width * Store.zoomRatio;
        fillABC123(r + 1, {
            rectX: 0,
            rectY: (start_r + offsetTop + firstOffset),
            rectW: Store.rowHeaderWidth - 1,
            rectH: (end_r - start_r + 1 + lastOffset - firstOffset)
        }, {
            // horizonAlignPos:(Store.rowHeaderWidth  - textMetrics.width) / 2,
            horizonAlignPos: (Store.rowHeaderWidth - textWidth) / 2,
            verticalAlignPos: (start_r + (end_r - start_r) / 2 + offsetTop)
        }, luckysheetTableContent);
        //vertical Lines
        drawOneLine(luckysheetTableContent,
            (Store.rowHeaderWidth - 2), (start_r + offsetTop - 2), (Store.rowHeaderWidth - 2), (end_r + offsetTop - 2));
        // horizon Lines
        drawOneLine(luckysheetTableContent, -1, (end_r + offsetTop - 2), (Store.rowHeaderWidth - 1), (end_r + offsetTop - 2));
    }

}


// Draw Column's title with H5Canvas   ABC...
function luckysheetDrawgridColumnTitle(scrollWidth) {
    let drawWidth = Store.luckysheetTableContentHW[0];
    let offsetLeft = Store.rowHeaderWidth;

    //Whole rectangle on the top column Bar
    let luckysheetTableContent = initWholeRectBar(
        offsetLeft,
        0,
        drawWidth,
        (Store.columnHeaderHeight - 1)
    );
    let dataset_col_st, dataset_col_ed;
    dataset_col_st = luckysheet_searcharray(Store.visibledatacolumn, scrollWidth);
    dataset_col_ed = luckysheet_searcharray(Store.visibledatacolumn, scrollWidth + drawWidth);

    if (dataset_col_st == -1) {
        dataset_col_st = 0;
    }
    if (dataset_col_ed == -1) {
        dataset_col_ed = Store.visibledatacolumn.length - 1;
    }

    let end_c, start_c;
    // Draw rectangle& text in column row
    for (let c = dataset_col_st; c <= dataset_col_ed; c++) {
        if (c == 0) {
            start_c = -scrollWidth;
        } else {
            start_c = Store.visibledatacolumn[c - 1] - scrollWidth;
        }
        end_c = Store.visibledatacolumn[c] - scrollWidth;

        let abc = chatatABC(c);

        let textWidth = luckysheetTableContent.measureText(abc).width * Store.zoomRatio;
        fillABC123(abc, {
            rectX: (start_c + offsetLeft - 1),
            rectY: 0,
            rectW: (end_c - start_c),
            rectH: Store.columnHeaderHeight - 1
        }, {
            // horizonAlignPos: Math.round((start_c + (end_c - start_c) / 2 + offsetLeft)  - textMetrics.width / 2),
            horizonAlignPos: Math.round((start_c + (end_c - start_c) / 2 + offsetLeft) - textWidth / 2),
            verticalAlignPos: Math.round(Store.columnHeaderHeight / 2)
        }, luckysheetTableContent);
        // vertical lines
        drawOneLine(luckysheetTableContent, (end_c + offsetLeft - 2), 0, (end_c + offsetLeft - 2), (Store.columnHeaderHeight - 2));
        //horizen lines
        drawOneLine(luckysheetTableContent, (start_c + offsetLeft - 1), (Store.columnHeaderHeight - 2), (end_c + offsetLeft - 1), (Store.columnHeaderHeight - 2));
    }

}

// 界面画单元格主体
function luckysheetDrawMain(scrollWidth, scrollHeight) { 

    let drawWidth = Store.luckysheetTableContentHW[0];
    let drawHeight = Store.luckysheetTableContentHW[1];
    let offsetLeft = Store.rowHeaderWidth;
    let offsetTop = Store.columnHeaderHeight;
    let luckysheetTableContent = $("#luckysheetTableContent").get(0).getContext("2d");

    luckysheetTableContent.save();

    luckysheetTableContent.clearRect(
        0,
        0,
        Store.luckysheetTableContentHW[0],
        Store.luckysheetTableContentHW[1]
    );

    // Cell dataset start and end point of row&column 
    let dataset_row_st,
        dataset_row_ed,
        dataset_col_st,
        dataset_col_ed;
    dataset_row_st = luckysheet_searcharray(Store.visibledatarow, scrollHeight);
    dataset_row_ed = luckysheet_searcharray(Store.visibledatarow, scrollHeight + drawHeight);
    if (dataset_row_st == -1) {
        dataset_row_st = 0;
    }
    if (dataset_row_ed == -1) {
        dataset_row_ed = Store.visibledatarow.length - 1;
    }
    if (dataset_row_ed >= Store.visibledatarow.length) {
        dataset_row_ed = Store.visibledatarow.length - 1;
    }
    dataset_col_st = luckysheet_searcharray(Store.visibledatacolumn, scrollWidth);
    dataset_col_ed = luckysheet_searcharray(Store.visibledatacolumn, scrollWidth + drawWidth);
    if (dataset_col_st == -1) {
        dataset_col_st = 0;
    }
    if (dataset_col_ed == -1) {
        dataset_col_ed = Store.visibledatacolumn.length - 1;
    }
    if (dataset_col_ed >= Store.visibledatacolumn.length) {
        dataset_col_ed = Store.visibledatacolumn.length - 1;
    }

    //Fill cell area start and end point of row&column 
    let fill_row_st,
        fill_row_ed,
        fill_col_st,
        fill_col_ed;
    if (dataset_row_st == 0) {
        fill_row_st = 0;
    } else {
        fill_row_st = Store.visibledatarow[dataset_row_st - 1];
    }
    fill_row_ed = Store.visibledatarow[dataset_row_ed];
    if (dataset_col_st == 0) {
        fill_col_st = 0;
    } else {
        fill_col_st = Store.visibledatacolumn[dataset_col_st - 1];
    }
    fill_col_ed = Store.visibledatacolumn[dataset_col_ed];

    //表格canvas 初始化处理
    luckysheetTableContent.fillStyle = "#ffffff";
    luckysheetTableContent.fillRect(
        (offsetLeft - 1),
        (offsetTop - 1),
        (fill_col_ed - scrollWidth),
        (fill_row_ed - scrollHeight)
    );
    // luckysheetTableContent.font = luckysheetdefaultFont();
    luckysheetTableContent.fillStyle = luckysheetdefaultstyle.fillStyle;

    //表格渲染区域 非空单元格行列 起止坐标
    let cellupdate = [];

    let bodrder05 = 0.5; //Default 0.5

    for (let r = dataset_row_st; r <= dataset_row_ed; r++) {
        let start_r;
        if (r == 0) {
            start_r = -scrollHeight - 1;
        } else {
            start_r = Store.visibledatarow[r - 1] - scrollHeight - 1;
        }
        let end_r = Store.visibledatarow[r] - scrollHeight;
        // 2D to 1D
        for (let c = dataset_col_st; c <= dataset_col_ed; c++) {
            let start_c;
            if (c == 0) {
                start_c = -scrollWidth;
            } else {
                start_c = Store.visibledatacolumn[c - 1] - scrollWidth;
            }

            let end_c = Store.visibledatacolumn[c] - scrollWidth;


            cellupdate.push({
                "r": r,
                "c": c,
                "start_r": start_r,
                "start_c": start_c,
                "end_r": end_r,
                "end_c": end_c,
            });
        }
    }

    for (let cud = 0; cud < cellupdate.length; cud++) {
        let item = cellupdate[cud];
        let r = item.r,
            c = item.c,
            start_r = item.start_r,
            start_c = item.start_c,
            end_r = item.end_r,
            end_c = item.end_c;

        if (Store.flowdata[r] == null) {
            continue;
        }

        if (Store.flowdata[r][c] == null) { //空单元格
            nullCellRender(r, c, start_r, start_c, end_r, end_c, luckysheetTableContent, offsetLeft, offsetTop, dataset_col_st, dataset_col_ed, scrollHeight, scrollWidth, bodrder05);
        } else {
            let value = getRealCellValue(r, c);

            if (value == null || value.toString().length == 0) {
                nullCellRender(r, c, start_r, start_c, end_r, end_c, luckysheetTableContent, offsetLeft, offsetTop, dataset_col_st, dataset_col_ed, scrollHeight, scrollWidth, bodrder05);
            } else {
                cellRender(r, c, start_r, start_c, end_r, end_c, value, luckysheetTableContent, offsetLeft, offsetTop, dataset_col_st, dataset_col_ed, scrollHeight, scrollWidth, bodrder05);
            }
        }
    }


    luckysheetTableContent.restore();

}


// Private Funtion

//空白单元格渲染 
function nullCellRender(r, c, start_r, start_c, end_r, end_c, luckysheetTableContent, offsetLeft, offsetTop, dataset_col_st, dataset_col_ed, scrollHeight, scrollWidth, bodrder05, isMerge) {

    let borderfix = borderfix_func(Store.flowdata, r, c);

    //背景色
    let fillStyle = checkstatus(Store.flowdata, r, c, "bg");

    if (Store.flowdata[r][c] != null && Store.flowdata[r][c].tc != null) { //标题色
        fillStyle = Store.flowdata[r][c].tc;
    }

    if (fillStyle == null) {
        luckysheetTableContent.fillStyle = "#FFFFFF";
    } else {
        luckysheetTableContent.fillStyle = fillStyle;
    }

    //填充背景色
    let cellsize = [
        (start_c + offsetLeft + borderfix[0]),
        (start_r + offsetTop + borderfix[1]),
        (end_c - start_c + borderfix[2] - (!!isMerge ? 1 : 0)),
        (end_r - start_r + borderfix[3])
    ];
    luckysheetTableContent.fillRect(cellsize[0], cellsize[1], cellsize[2], cellsize[3]);

    //右边框
    drawOneLine(luckysheetTableContent, (end_c + offsetLeft - 2 + bodrder05), (start_r + offsetTop), (end_c + offsetLeft - 2 + bodrder05), (end_r + offsetTop));
    //下边框
    drawOneLine(luckysheetTableContent, (start_c + offsetLeft - 1), (end_r + offsetTop - 2 + bodrder05), (end_c + offsetLeft - 1), (end_r + offsetTop - 2 + bodrder05));
}


function cellRender(r, c, start_r, start_c, end_r, end_c, value, luckysheetTableContent, offsetLeft, offsetTop, dataset_col_st, dataset_col_ed, scrollHeight, scrollWidth, bodrder05, isMerge) {
    let cell = Store.flowdata[r][c];
    let cellWidth = end_c - start_c - 2;
    let cellHeight = end_r - start_r - 2;
    let space_width = 2,
        space_height = 2; //宽高方向 间隙

    //单元格 背景颜色
    let fillStyle = checkstatus(Store.flowdata, r, c, "bg");

    if (fillStyle == null) {
        luckysheetTableContent.fillStyle = "#FFFFFF";
    } else {
        luckysheetTableContent.fillStyle = fillStyle;
    }

    //填充背景色
    let borderfix = borderfix_func(Store.flowdata, r, c);
    let cellsize = [
        (start_c + offsetLeft + borderfix[0]),
        (start_r + offsetTop + borderfix[1]),
        (end_c - start_c + borderfix[2] - (!!isMerge ? 1 : 0)),
        (end_r - start_r + borderfix[3])
    ];
    luckysheetTableContent.fillRect(cellsize[0], cellsize[1], cellsize[2], cellsize[3]);

    let pos_x = start_c + offsetLeft;
    let pos_y = start_r + offsetTop + 1;

    luckysheetTableContent.save();
    luckysheetTableContent.beginPath();
    luckysheetTableContent.rect(pos_x, pos_y, cellWidth, cellHeight);
    luckysheetTableContent.clip();
    luckysheetTableContent.scale(Store.zoomRatio, Store.zoomRatio);


    let textInfo = getCellTextInfo(cell, luckysheetTableContent, {
        cellWidth: cellWidth,
        cellHeight: cellHeight,
        space_width: space_width,
        space_height: space_height,
        r: r,
        c: c
    });


    //单元格 文本颜色
    luckysheetTableContent.fillStyle = checkstatus(Store.flowdata, r, c, "fc");
    // 填写单元格信息
    cellTextRender(
        textInfo,
        luckysheetTableContent, {
            pos_x: pos_x,
            pos_y: pos_y,
        }
    );

    luckysheetTableContent.restore();

    //右边框
    drawOneLine(luckysheetTableContent, (end_c + offsetLeft - 2 + bodrder05), (start_r + offsetTop), (end_c + offsetLeft - 2 + bodrder05), (end_r + offsetTop));
    //下边框
    drawOneLine(luckysheetTableContent, (start_c + offsetLeft - 1), (end_r + offsetTop - 2 + bodrder05), (end_c + offsetLeft - 1), (end_r + offsetTop - 2 + bodrder05));
}


// 填充单元格的文本信息
function cellTextRender(textInfo, ctx, option) {
    if (textInfo == null) {
        return
    }
    let values = textInfo.values;
    let pos_x = option.pos_x,
        pos_y = option.pos_y;
    if (values == null) {
        return;
    }

    for (let i = 0; i < values.length; i++) {
        let word = values[i];
        if (word.inline === true && word.style != null) {
            ctx.font = word.style.fontset;
            ctx.fillStyle = word.style.fc;
        } else {
            ctx.font = word.style;
        }

        ctx.fillText(word.content, (pos_x + word.left) / Store.zoomRatio, (pos_y + word.top) / Store.zoomRatio);

    }
}

//From: ../controller/menuButton
function borderfix_func(d, r, c) {
    let cell = d[r][c];

    if (cell == null) {
        return [-1, 0, 0, -1];
    } else if (d[r][c].bg == null || d[r][c].bg == "") {
        return [-1, 0, 0, -1];
    } else {
        return [-2, -1, 1, 0];
    }
}

//From: ../controller/menuButton
function checkstatus(d, r, c, a) {
    if (d == null || d[r] == null) {
        console.warn("It's incorrect data", r, c);
        return null;
    }
    let foucsStatus = d[r][c];
    return checkstatusByCell(foucsStatus, a);
}


//获取单元格文本内容的渲染信息
function getCellTextInfo(cell, ctx, option) {
    let cellWidth = option.cellWidth;
    let cellHeight = option.cellHeight;

    let space_width = option.space_width,
        space_height = option.space_height; //宽高方向 间隙

    if (space_width == null) {
        space_width = 2;
    }

    if (space_height == null) {
        space_height = 2;
    }

    let rt = 0;


    rt = parseInt(rt);
    ctx.textAlign = "start";

    let textContent = {};
    textContent.values = [];

    let value;

    if (cell instanceof Object) {
        value = cell.m;
        if (value == null) {
            value = cell.v;
        }
    } else {
        value = cell;
    }

    if (isRealNull(value)) {
        return null;
    }

    ctx.textBaseline = 'alphabetic';

    let textWidth = ctx.measureText(value).width * Store.zoomRatio;
    let textActualBoundingBoxDescent = ctx.measureText(value).actualBoundingBoxDescent * Store.zoomRatio;
    let textActualBoundingBoxAscent = ctx.measureText(value).actualBoundingBoxAscent * Store.zoomRatio;
    let textHeight = textActualBoundingBoxDescent + textActualBoundingBoxAscent;

    let height = textHeight + textHeight / 2 - textActualBoundingBoxDescent - space_height;
    let left = space_width;
    let top = (cellHeight - space_height) - height + textActualBoundingBoxAscent;

    textContent.type = "plain";

    let wordGroup = {
        content: value,
        // style: fontset,
        width: textWidth, // width,
        height: textHeight, // height,
        left: space_width, // left,
        top: top,
    }

    textContent.values.push(wordGroup);

    textContent.textLeftAll = left;
    textContent.textTopAll = top;

    textContent.asc = textActualBoundingBoxAscent;
    textContent.desc = textActualBoundingBoxDescent;


    return textContent;
}

// move to  [a,b] then write line to [c,d]
function drawOneLine(luckysheetTableContent, a, b, c, d) {
    luckysheetTableContent.beginPath();
    luckysheetTableContent.moveTo(
        a,
        b
    );
    luckysheetTableContent.lineTo(
        c,
        d
    );
    luckysheetTableContent.lineWidth = 1;
    luckysheetTableContent.strokeStyle = luckysheetdefaultstyle.strokeStyle;
    luckysheetTableContent.stroke();
    luckysheetTableContent.closePath();
}

// clear&draw rectangle bar 
function initWholeRectBar(a, b, c, d, ) {
    let luckysheetTableContent = $("#luckysheetTableContent").get(0).getContext("2d");
    luckysheetTableContent.save();
    luckysheetTableContent.clearRect(a, b, c, d);

    // luckysheetTableContent.font = luckysheetdefaultFont();
    luckysheetTableContent.textBaseline = luckysheetdefaultstyle.textBaseline; //基准线 垂直居中
    luckysheetTableContent.fillStyle = luckysheetdefaultstyle.fillStyle;

    luckysheetTableContent.beginPath();
    luckysheetTableContent.rect(a, b, c, d);
    luckysheetTableContent.clip();

    luckysheetTableContent.restore();

    return luckysheetTableContent;
}


function fillABC123(txt, rectOption, txtOption, luckysheetTableContent) {
    //background to white
    luckysheetTableContent.fillStyle = "#ffffff";
    luckysheetTableContent.fillRect(rectOption.rectX, rectOption.rectY, rectOption.rectW, rectOption.rectH);
    luckysheetTableContent.fillStyle = "#000000";

    //Serial Number ABC... or 123...
    luckysheetTableContent.save(); //save scale before draw text
    luckysheetTableContent.scale(Store.zoomRatio, Store.zoomRatio);
    luckysheetTableContent.fillText(txt, txtOption.horizonAlignPos / Store.zoomRatio, txtOption.verticalAlignPos / Store.zoomRatio);
    luckysheetTableContent.restore(); //restore scale after draw text

}