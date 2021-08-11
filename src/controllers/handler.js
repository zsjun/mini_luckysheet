import { luckysheetscrollevent } from "../global/scroll";
import { luckysheet_searcharray } from "./sheetSearch";
import Store from "../store";
import { luckysheetsizeauto } from "./resize";
import { debounce } from "lodash";
import { selectHightlightShow } from "./select";
import { luckysheetupdateCell, refreshCell } from "./updateCell";
import { rowLocation, colLocation, mouseposition } from "../global/location";
const getRowAndColIndex = (pageX, pageY) => {
  let mouse = mouseposition(event.pageX, event.pageY);
  if (
    mouse[0] >= Store.cellmainWidth - Store.cellMainSrollBarSize ||
    mouse[1] >= Store.cellmainHeight - Store.cellMainSrollBarSize
  ) {
    return;
  }

  let scrollLeft = $("#luckysheet-cell-main").scrollLeft(),
    scrollTop = $("#luckysheet-cell-main").scrollTop();
  let x = mouse[0] + scrollLeft;
  let y = mouse[1] + scrollTop;

  let row_location = rowLocation(y),
    row_index = row_location[2];
  let col_location = colLocation(x),
    col_index = col_location[2];
  return [row_index, col_index];
};
function luckysheetHandler() {
  // let mousewheelArrayUniqueTimeout;
  // luckysheet-cell-main 是覆盖整个canvas的div
  // luckysheetTableContent是canvas
  // console.log(111, $("#luckysheet-cell-main"));
  // $("#luckysheet-cell-main, #luckysheetTableContent")
  $("#luckysheet-cell-main")
    .mousedown(function(event) {
      // Get mouse's position from location.js
      // console.log(112);
      let mouse = mouseposition(event.pageX, event.pageY);
      if (
        mouse[0] >= Store.cellmainWidth - Store.cellMainSrollBarSize ||
        mouse[1] >= Store.cellmainHeight - Store.cellMainSrollBarSize
      ) {
        return;
      }

      let x = mouse[0] + $("#luckysheet-cell-main").scrollLeft();
      let y = mouse[1] + $("#luckysheet-cell-main").scrollTop();

      // let luckysheetTableContent = $("#luckysheetTableContent").get(0).getContext("2d");

      let row_location = rowLocation(y),
        row = row_location[1],
        row_pre = row_location[0],
        row_index = row_location[2];

      let col_location = colLocation(x),
        col = col_location[1],
        col_pre = col_location[0],
        col_index = col_location[2];

      let row_index_ed = row_index,
        col_index_ed = col_index;

      Store.luckysheet_select_status = true;

      Store.luckysheet_select_save.length = 0;
      Store.luckysheet_select_save.push({
        left: col_pre,
        width: col - col_pre - 1,
        top: row_pre,
        height: row - row_pre - 1,
        left_move: col_pre,
        width_move: col - col_pre - 1,
        top_move: row_pre,
        height_move: row - row_pre - 1,
        row: [row_index, row_index_ed],
        column: [col_index, col_index_ed],
        row_focus: row_index,
        column_focus: col_index,
      });

      selectHightlightShow();
      console.log(11, Store.luckysheetCellUpdate);
      if (Store.luckysheetCellUpdate) {
        refreshCell(
          Store.luckysheetCellUpdate[0],
          Store.luckysheetCellUpdate[1]
        );
      }
    })
    .dblclick(function(event) {
      const res = getRowAndColIndex(event.pageX, event.pageY);
      //TODO: find index of row&column can be merged into click()
      luckysheetupdateCell(res[0], res[1], Store.flowdata);
    });

  $("#luckysheet-grid-window-1").mousewheel(function(event, delta) {
    let scrollLeft = $("#luckysheet-scrollbar-x").scrollLeft(),
      scrollTop = $("#luckysheet-scrollbar-y").scrollTop();
    let visibledatacolumn_c = Store.visibledatacolumn,
      visibledatarow_c = Store.visibledatarow;

    let col_st = luckysheet_searcharray(visibledatacolumn_c, scrollLeft);
    let row_st = luckysheet_searcharray(visibledatarow_c, scrollTop);

    let colscroll = 0;
    let rowscroll = 0;

    let scrollNum = event.deltaFactor < 40 ? 1 : event.deltaFactor < 80 ? 2 : 3;
    //一次滚动三行或三列
    if (event.deltaY != 0) {
      let row_ed,
        step = Math.round(scrollNum / Store.zoomRatio);
      step = step < 1 ? 1 : step;
      if (event.deltaY < 0) {
        row_ed = row_st + step;
        if (row_ed >= visibledatarow_c.length) {
          row_ed = visibledatarow_c.length - 1;
        }
      } else {
        row_ed = row_st - step;

        if (row_ed < 0) {
          row_ed = 0;
        }
      }
      rowscroll = row_ed == 0 ? 0 : visibledatarow_c[row_ed - 1];
      $("#luckysheet-scrollbar-y").scrollTop(rowscroll);
    }
  });

  // push scrollbar-x event
  $("#luckysheet-scrollbar-x")
    .scroll(function() {
      luckysheetscrollevent();
    })
    .mousewheel(function(event, delta) {
      event.preventDefault();
    });

  // push scrollbar-y event
  $("#luckysheet-scrollbar-y")
    .scroll(function() {
      luckysheetscrollevent();
    })
    .mousewheel(function(event, delta) {
      event.preventDefault();
    });

  $(window).resize(
    debounce(function() {
      let luckysheetDocument = document.getElementById(Store.container);
      console.log(luckysheetDocument);
      if (luckysheetDocument) {
        luckysheetsizeauto();
      }
    }, 500)
  );
}

export { luckysheetHandler };
