import defaultSetting from "./config.js";
import Store from "./store";
import sheetmanage from "./controllers/sheetmanage";
import { common_extend } from "./utils/util";
import { luckysheetloadingHTML } from "./constant/index";
import { luckysheetHandler } from "./controllers/handler";

let luckysheet = {};

//创建luckysheet表格
luckysheet.create = function(setting) {
  // destroy()
  // mix user's and system default parameter(user's setting overide default setting)
  let extendsetting = common_extend(defaultSetting, setting);

  let menu = extendsetting.menu,
    title = extendsetting.title;

  let container = extendsetting.container;
  Store.container = container;
  Store.luckysheetfile = extendsetting.data;
  Store.defaultcolumnNum = extendsetting.column;
  Store.defaultrowNum = extendsetting.row;

  // //loading
  $("#" + container).append(luckysheetloadingHTML());
  sheetmanage.initialjfFile(menu, title);
  luckysheetHandler();
};

export { luckysheet };
