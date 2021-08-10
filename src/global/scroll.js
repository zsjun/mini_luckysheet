import { luckysheetrefreshgrid } from "../global/refresh";
import Store from "../store";

export { luckysheetscrollevent };

// let scrollRequestAnimationFrameIni = true,scrollRequestAnimationFrame = false, scrollTimeOutCancel=null;

//全局滚动事件
function luckysheetscrollevent(isadjust) {
  // 表格
  let $t = $("#luckysheet-cell-main");
  // 下方的滚动条和右侧的滚动条
  let scrollLeft = $("#luckysheet-scrollbar-x").scrollLeft(),
    scrollTop = $("#luckysheet-scrollbar-y").scrollTop();
  $("#luckysheet-cols-h-c").scrollLeft(scrollLeft); // 列标题
  $("#luckysheet-rows-h").scrollTop(scrollTop); // 行标题

  $t.scrollLeft(scrollLeft).scrollTop(scrollTop);

  $("#luckysheet-input-box-index")
    .css({
      left: $("#luckysheet-input-box").css("left"),
      top: parseInt($("#luckysheet-input-box").css("top")) - 20 + "px",
      "z-index": $("#luckysheet-input-box").css("z-index"),
    })
    .show();

  luckysheetrefreshgrid(scrollLeft, scrollTop);

  $("#luckysheet-bottom-controll-row").css("left", scrollLeft);
}
