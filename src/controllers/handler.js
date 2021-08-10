import { luckysheetscrollevent } from "../global/scroll";
import { luckysheet_searcharray } from "./sheetSearch";
import Store from "../store";
import { luckysheetsizeauto } from "./resize";
import { debounce } from "lodash";

function luckysheetHandler() {
  let mousewheelArrayUniqueTimeout;
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
