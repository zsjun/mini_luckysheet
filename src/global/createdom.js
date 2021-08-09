import { gridHTML } from "../controllers/constant";
import { rhchInit } from "./rhchInit";
import Store from "../store";

function luckysheetcreatedom(colNum, rowNum, data, menu, title) {
  let gh = gridHTML();
  if (Store.config == null) {
    Store.config = {};
  }

  rhchInit(rowNum, colNum);

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
}

export { luckysheetcreatedom };
