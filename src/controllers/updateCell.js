import { chatatABC } from "../utils/util";
import { getcellvalue } from "../global/getdata";
import Store from "../store";
import { luckysheetrefreshgrid } from "../global/refresh";
import { setcellvalue } from "../global/setdata";
import editor from "../global/editor";

function luckysheetupdateCell(row_index1, col_index1, d, cover, isnotfocus) {
  let size = getColumnAndRowSize(row_index1, col_index1, d);
  let row = size.row,
    row_pre = size.row_pre,
    col = size.col,
    col_pre = size.col_pre,
    row_index = size.row_index,
    col_index = size.col_index;

  let winH = $(window).height();
  let winW = $(window).width();
  let container_offset = $("#" + Store.container).offset();
  let scrollLeft = $("#luckysheet-cell-main").scrollLeft();
  let scrollTop = $("#luckysheet-cell-main").scrollTop();
  let left =
    col_pre + container_offset.left + Store.rowHeaderWidth - scrollLeft - 2;
  let top =
    row_pre + container_offset.top - scrollTop + Store.columnHeaderHeight - 2;
  let input_postition = {
    "min-width": col - col_pre + 1 - 8,
    "min-height": row - row_pre + 1 - 4,

    "max-width": winW + scrollLeft - col_pre - 20 - Store.rowHeaderWidth,
    "max-height": winH + scrollTop - row_pre - 20 - 15,
    left: left,
    top: top,
  };
  let inputContentScale = {
    transform: "scale(" + Store.zoomRatio + ")",
    "transform-origin": "left top",
    width: 100 / Store.zoomRatio + "%",
    height: 100 / Store.zoomRatio + "%",
  };

  Store.luckysheetCellUpdate = [row_index, col_index];
  if (!isnotfocus) {
    $("#luckysheet-rich-text-editor")
      .focus()
      .select();
  }

  $("#luckysheet-input-box")
    .removeAttr("style")
    .css({
      "background-color": "rgb(255, 255, 255)",
      padding: "0px 2px",
      "font-size": "13px",
      right: "auto",
      "overflow-y": "auto",
      "box-sizing": "initial",
      display: "flex",
    });
  console.log(top);
  $("#luckysheet-input-box-index")
    .html(chatatABC(col_index) + (row_index + 1))
    .css({
      left: left,
      top: top - 20 + "px",
      "z-index": $("#luckysheet-input-box").css("z-index"),
    })
    .show(); // write row+column on the top-left of the input-box

  let value = "",
    isCenter = false;

  if (d[row_index] != null && d[row_index][col_index] != null) {
    let cell = d[row_index][col_index];
    let leftOrigin = "left",
      topOrigin = "top";

    inputContentScale["transform-origin"] = leftOrigin + " " + topOrigin;

    value = valueShowEs(row_index, col_index, d);
    if (cell.qp == "1") {
      value = "'" + value;
    }
    if (
      $("#luckysheet-input-box").get(0).style.backgroundColor ==
      "rgba(0, 0, 0, 0)"
    ) {
      $("#luckysheet-input-box").get(0).style.background = "rgb(255,255,255)";
    }
  }
  if (input_postition["min-height"] > input_postition["max-height"]) {
    input_postition["min-height"] = input_postition["max-height"];
  }

  if (input_postition["min-width"] > input_postition["max-width"]) {
    input_postition["min-width"] = input_postition["max-width"];
  }

  if ((value == null || value.toString() == "") && !cover) {
    value = "<br/>";
  }

  $("#luckysheet-rich-text-editor").html(value);
  $("#luckysheet-input-box").css(input_postition);
  $("#luckysheet-rich-text-editor").css(inputContentScale);

  $("#luckysheet-cell-selected-boxs .luckysheet-cell-selected").hide(); //from cleargridelement()
}

function getColumnAndRowSize(row_index, col_index, d) {
  let row = Store.visibledatarow[row_index],
    row_pre = row_index - 1 == -1 ? 0 : Store.visibledatarow[row_index - 1];
  let col = Store.visibledatacolumn[col_index],
    col_pre = col_index - 1 == -1 ? 0 : Store.visibledatacolumn[col_index - 1];

  if (d == null) {
    d = Store.flowdata;
  }

  return {
    row: row,
    row_pre: row_pre,
    row_index: row_index,
    col: col,
    col_pre: col_pre,
    col_index: col_index,
  };
}

// From: global/format.js
function valueShowEs(r, c, d) {
  var value = getcellvalue(r, c, d, "m");
  if (value == null) {
    value = getcellvalue(r, c, d, "v");
  }
  return value;
}

// From: formula.updatecell()
// 单元格如果数据更新之后，当点击了别的单元格的时候，先刷新这里
function refreshCell(r, c) {
  if (!r && !c) return;
  let $input = $("#luckysheet-rich-text-editor");
  let value = value || $input.text();
  let d = editor.deepCopyFlowData(Store.flowdata);
  setcellvalue(r, c, d, value);
  Store.flowdata = d;
  luckysheetrefreshgrid();
  Store.luckysheetCellUpdate = null;
}

export { refreshCell, luckysheetupdateCell };
