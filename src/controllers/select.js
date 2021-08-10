import Store from "../store";

//Set selection highlight
function selectHightlightShow(isRestore = false) {
  $("#luckysheet-cell-selected-boxs").show();
  $("#luckysheet-cell-selected-boxs #luckysheet-cell-selected")
    .siblings(".luckysheet-cell-selected")
    .remove();

  if (Store.luckysheet_select_save.length > 0) {
    for (let i = 0; i < Store.luckysheet_select_save.length; i++) {
      let r1 = Store.luckysheet_select_save[i].row[0],
        r2 = Store.luckysheet_select_save[i].row[1];
      let c1 = Store.luckysheet_select_save[i].column[0],
        c2 = Store.luckysheet_select_save[i].column[1];

      let rf, cf;
      if (Store.luckysheet_select_save[i].row_focus == null) {
        rf = r1;
      } else {
        rf = Store.luckysheet_select_save[i].row_focus;
      }

      if (Store.luckysheet_select_save[i].column_focus == null) {
        cf = c1;
      } else {
        cf = Store.luckysheet_select_save[i].column_focus;
      }

      let row = Store.visibledatarow[r2],
        row_pre = r1 - 1 == -1 ? 0 : Store.visibledatarow[r1 - 1];
      let col = Store.visibledatacolumn[c2],
        col_pre = c1 - 1 == -1 ? 0 : Store.visibledatacolumn[c1 - 1];

      let row_f = Store.visibledatarow[rf],
        row_pre_f = rf - 1 == -1 ? 0 : Store.visibledatarow[rf - 1];
      let col_f = Store.visibledatacolumn[cf],
        col_pre_f = cf - 1 == -1 ? 0 : Store.visibledatacolumn[cf - 1];

      Store.luckysheet_select_save[i]["row"] = [r1, r2];
      Store.luckysheet_select_save[i]["column"] = [c1, c2];

      Store.luckysheet_select_save[i]["row_focus"] = rf;
      Store.luckysheet_select_save[i]["column_focus"] = cf;

      Store.luckysheet_select_save[i]["left"] = col_pre_f;
      Store.luckysheet_select_save[i]["width"] = col_f - col_pre_f - 1;
      Store.luckysheet_select_save[i]["top"] = row_pre_f;
      Store.luckysheet_select_save[i]["height"] = row_f - row_pre_f - 1;

      Store.luckysheet_select_save[i]["left_move"] = col_pre;
      Store.luckysheet_select_save[i]["width_move"] = col - col_pre - 1;
      Store.luckysheet_select_save[i]["top_move"] = row_pre;
      Store.luckysheet_select_save[i]["height_move"] = row - row_pre - 1;

      $("#luckysheet-cell-selected-boxs #luckysheet-cell-selected")
        .css({
          left: Store.luckysheet_select_save[i]["left_move"],
          width: Store.luckysheet_select_save[i]["width_move"],
          top: Store.luckysheet_select_save[i]["top_move"],
          height: Store.luckysheet_select_save[i]["height_move"],
          display: "block",
          border: "1px solid #0188fb",
        })
        .find(".luckysheet-cs-draghandle")
        .css("display", "block")
        .end()
        .find(".luckysheet-cs-fillhandle")
        .css("display", "block")
        .end()
        .find(".luckysheet-cs-touchhandle")
        .css("display", "none");
    }
  }
}

export { selectHightlightShow };
