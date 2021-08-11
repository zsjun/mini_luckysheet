import {
  luckysheetDrawMain,
  luckysheetDrawgridRowTitle,
  luckysheetDrawgridColumnTitle,
} from "./draw";
import Store from "../store";

//Refresh the canvas display data according to scrollHeight and scrollWidth
function luckysheetrefreshgrid(scrollWidth, scrollHeight) {
  if (scrollWidth == null) {
    scrollWidth = $("#luckysheet-cell-main").scrollLeft();
  }
  if (scrollHeight == null) {
    scrollHeight = $("#luckysheet-cell-main").scrollTop();
  }
  let luckysheetTableContent = $("#luckysheetTableContent")
    .get(0)
    .getContext("2d");
  luckysheetDrawMain(scrollWidth, scrollHeight);
  // 绘制列标题
  luckysheetDrawgridColumnTitle(scrollWidth);
  // 绘制行标题
  luckysheetDrawgridRowTitle(scrollHeight);

  //清除canvas左上角区域 防止列标题栏序列号溢出显示
  luckysheetTableContent.clearRect(
    0,
    0,
    Store.rowHeaderWidth - 1,
    Store.columnHeaderHeight - 1
  );
}
export { luckysheetrefreshgrid };
