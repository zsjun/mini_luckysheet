import Store from "../store";
import { luckysheet_searcharray } from "../controllers/sheetSearch";

function mouseposition(x, y) {
  let container_offset = $("#" + Store.container).offset();

  let newX = x - container_offset.left - Store.rowHeaderWidth,
    newY = y - container_offset.top - Store.columnHeaderHeight; //- Store.infobarHeight - Store.toolbarHeight - Store.calculatebarHeight

  return [newX, newY];
}

function colLocation(x) {
  // 通过global/rhchInit.js里边根据每个单元格的宽度先形成数组Store.visibledatacolumn
  // 然后根据x的坐标定位在哪个单元格里边
  let col_index = luckysheet_searcharray(Store.visibledatacolumn, x);

  if (col_index == -1 && x > 0) {
    col_index = Store.visibledatacolumn.length - 1;
  } else if (col_index == -1 && x <= 0) {
    col_index = 0;
  }

  return colLocationByIndex(col_index);
}

function rowLocation(y) {
  let row_index = luckysheet_searcharray(Store.visibledatarow, y);

  if (row_index == -1 && y > 0) {
    row_index = Store.visibledatarow.length - 1;
  } else if (row_index == -1 && y <= 0) {
    row_index = 0;
  }

  return rowLocationByIndex(row_index);
}

function colLocationByIndex(col_index) {
  let col = 0,
    col_pre = 0;
  col = Store.visibledatacolumn[col_index];

  if (col_index == 0) {
    col_pre = 0;
  } else {
    col_pre = Store.visibledatacolumn[col_index - 1];
  }

  return [col_pre, col, col_index];
}

function rowLocationByIndex(row_index) {
  let row = 0,
    row_pre = 0;
  row = Store.visibledatarow[row_index];

  if (row_index == 0) {
    row_pre = 0;
  } else {
    row_pre = Store.visibledatarow[row_index - 1];
  }

  return [row_pre, row, row_index];
}

export { rowLocation, colLocation, mouseposition };
