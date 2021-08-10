import Store from "../store";
import { luckysheetrefreshgrid } from "../global/refresh";

function luckysheetsizeauto(isRefreshCanvas = true) {
  $("#" + Store.container)
    .find(".luckysheet-grid-container")
    .css("top", 0); // Store.toolbarHeight );

  let gridW = $("#" + Store.container).width();
  let gridH = $("#" + Store.container).height();

  $("#" + Store.container)
    .find(".luckysheet")
    .height(gridH - 2)
    .width(gridW - 2);

  changeSheetContainerSize(gridW, gridH);

  if (isRefreshCanvas) {
    luckysheetrefreshgrid(
      $("#luckysheet-cell-main").scrollLeft(),
      $("#luckysheet-cell-main").scrollTop()
    );
  }
}

function changeSheetContainerSize(gridW, gridH) {
  if (gridW == null) {
    gridW = $("#" + Store.container).width();
  }

  if (gridH == null) {
    gridH = $("#" + Store.container).height();
  }
  let cellmainHeight = gridH - Store.columnHeaderHeight;
  let cellmainWidth = gridW - Store.rowHeaderWidth;

  $("#luckysheet-cols-h-c, #luckysheet-cell-main").width(cellmainWidth);
  $("#luckysheet-cell-main").height(cellmainHeight);
  $("#luckysheet-rows-h").height(cellmainHeight - Store.cellMainSrollBarSize);

  $("#luckysheet-scrollbar-y").height(
    cellmainHeight + Store.columnHeaderHeight - Store.cellMainSrollBarSize - 3
  );
  $("#luckysheet-scrollbar-y").width(Store.cellMainSrollBarSize);
  $("#luckysheet-scrollbar-x").height(Store.cellMainSrollBarSize);
  $("#luckysheet-scrollbar-x")
    .width(cellmainWidth)
    .css("left", Store.rowHeaderWidth - 2);

  Store.luckysheetTableContentHW = [
    cellmainWidth + Store.rowHeaderWidth - Store.cellMainSrollBarSize,
    cellmainHeight + Store.columnHeaderHeight - Store.cellMainSrollBarSize,
  ];

  $("#luckysheetTableContent")
    .attr({
      width: Math.ceil(Store.luckysheetTableContentHW[0]),
      height: Math.ceil(Store.luckysheetTableContentHW[1]),
    })
    .css({
      width: Store.luckysheetTableContentHW[0],
      height: Store.luckysheetTableContentHW[1],
    });
}

export { luckysheetsizeauto };
