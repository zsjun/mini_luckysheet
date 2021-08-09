import Store from "../store";
// import locale from '../locale/locale';
import { setcellvalue } from "../global/setdata";
import { luckysheetcreatedom } from "../global/createdom";
import { luckysheetsizeauto } from "./resize";
import { rhchInit } from "../global/rhchInit";
import { datagridgrowth } from "../global/getdata";

const sheetmanage = {
  sheetMaxIndex: 0,
  nulldata: null,
  initialjfFile: function(menu, title) {
    let _this = this;
    let file = Store.luckysheetfile[0]; // Get Store's cell data
    // 转成二维数组
    let data = _this.buildGridData(file);

    this.sheetParamRestore(file, data); //File to Store: config ...

    file.data = data;

    let rowNum = data.length;
    let colNum = data[0].length;
    luckysheetcreatedom(rowNum, colNum, data, menu, title); // Create HTML5 elements

    setTimeout(function() {
      Store.luckysheetTableContentHW = [
        $("#luckysheet-cell-main").width() +
          Store.rowHeaderWidth -
          Store.cellMainSrollBarSize,
        $("#luckysheet-cell-main").height() +
          Store.columnHeaderHeight -
          Store.cellMainSrollBarSize,
      ];
      //   $("#luckysheetTableContent")
      //     .attr({
      //       width: Math.ceil(Store.luckysheetTableContentHW[0]),
      //       height: Math.ceil(Store.luckysheetTableContentHW[1]),
      //     })
      //     .css({
      //       width: Store.luckysheetTableContentHW[0],
      //       height: Store.luckysheetTableContentHW[1],
      //     })
      //     .get(0)
      //     .getContext("2d");

      file["load"] = "1";
      _this.setSheetParam(false); // build temporary parameter for cell
      _this.storeSheetParam();
      // 这里渲染canvas
      luckysheetsizeauto();
      //move scroll to the location in config setting
      if (file["scrollLeft"] != null && file["scrollLeft"] > 0) {
        $("#luckysheet-scrollbar-x").scrollLeft(file["scrollLeft"]);
      } else {
        $("#luckysheet-scrollbar-x").scrollLeft(0);
      }
      if (file["scrollTop"] != null && file["scrollTop"] > 0) {
        $("#luckysheet-scrollbar-y").scrollTop(file["scrollTop"]);
      } else {
        $("#luckysheet-scrollbar-y").scrollTop(0);
      }

      setTimeout(function() {
        $("#luckysheetloadingdata")
          .fadeOut()
          .remove();
      }, 500);
    }, 1);
  },
  // Transform json file to data
  buildGridData: function(file) {
    let row = file.row == null ? Store.defaultrowNum : file.row,
      column = file.column == null ? Store.defaultcolumnNum : file.column;
    let data = datagridgrowth([], row, column); // Cell expand according to config setting

    let celldata = file.celldata;
    if (celldata != null) {
      for (let i = 0; i < celldata.length; i++) {
        let item = celldata[i];
        let r = item.r;
        let c = item.c;
        let v = item.v;
        // Cell expand when celldata is out of range
        if (r >= data.length) {
          data = datagridgrowth(data, r - data.length + 1, 0);
        }
        if (c >= data[0].length) {
          data = datagridgrowth(data, 0, c - data[0].length + 1);
        }
        setcellvalue(r, c, data, v);
      }
    }

    return data;
  },
  // Get json file to Store(inMemeory)
  sheetParamRestore: function(file, data) {
    Store.config = file["config"] == null ? {} : file["config"];
    Store.zoomRatio = file["zoomRatio"] == null ? 1 : file["zoomRatio"];
    Store.defaultrowlen = parseFloat(file["defaultRowHeight"]);
    Store.defaultcollen = parseFloat(file["defaultColWidth"]);
  },
  // call rhchInit() to build Store's parameter(rh_height/ch_width/visibledatarow/visibledatacolumn)
  setSheetParam: function() {
    let file = Store.luckysheetfile[0];
    Store.flowdata = file["data"];
    rhchInit(Store.flowdata.length, Store.flowdata[0].length);
  },
  // Write to json file from Store(inMemeory)
  storeSheetParam: function() {
    let file = Store.luckysheetfile[0];
    file["config"] = Store.config;
    file["visibledatarow"] = Store.visibledatarow;
    file["visibledatacolumn"] = Store.visibledatacolumn;
    file["ch_width"] = Store.ch_width;
    file["rh_height"] = Store.rh_height;

    if (
      $("#luckysheet-scrollbar-x")[0].scrollWidth >
      $("#luckysheet-scrollbar-x")[0].offsetWidth
    ) {
      file["scrollLeft"] = $("#luckysheet-scrollbar-x").scrollLeft();
    }

    if (
      $("#luckysheet-scrollbar-y")[0].scrollHeight >
      $("#luckysheet-scrollbar-y")[0].offsetHeight
    ) {
      file["scrollTop"] = $("#luckysheet-scrollbar-y").scrollTop();
    }

    file["zoomRatio"] = Store.zoomRatio;
  },
};
export default sheetmanage;
