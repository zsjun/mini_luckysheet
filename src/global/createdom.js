import { gridHTML, inputHTML, flow } from "../constant/index";
import { rhchInit } from "./rhchInit";
import Store from "../store";
import { replaceHtml } from "../utils/util";

function luckysheetcreatedom(colNum, rowNum, data, menu, title) {
  let gh = gridHTML();
  let flowHTML = flow;
  if (Store.config == null) {
    Store.config = {};
  }

  rhchInit(rowNum, colNum);
  // 暂时不加，没发现其他问题
  // let flowstr = replaceHtml(
  //   '<div id="luckysheetcoltable_0" class="luckysheet-cell-flow-col"> <div id ="luckysheet-sheettable_0" class="luckysheet-cell-sheettable" style="height:${height}px;width:${width}px;"></div></div>',
  //   {
  //     height: Store.rh_height,
  //     width: Store.ch_width - 1,
  //   }
  // );
  // flowHTML = replaceHtml(flowHTML, {
  //   width: Store.ch_width,
  //   flow: flowstr,
  //   index: 0,
  // });
  // gh = replaceHtml(gh, {
  //   flow: flowHTML,
  // });

  $("#" + Store.container).append(gh);
  $("#luckysheet-scrollbar-x div").width(Store.ch_width);
  $("#luckysheet-scrollbar-y div").height(
    Store.rh_height + Store.columnHeaderHeight - Store.cellMainSrollBarSize - 3
  );
  $("#luckysheet-rows-h").width(Store.rowHeaderWidth - 1.5);
  $("#luckysheet-cols-h-c").height(Store.columnHeaderHeight - 1.5);
  $("#luckysheet-left-top").css({
    width: Store.rowHeaderWidth - 1.5,
    height: Store.columnHeaderHeight - 1.5,
  });
  $("body").append(inputHTML);
}

export { luckysheetcreatedom };
