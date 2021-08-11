const Store = {
  container: null,
  luckysheetfile: null,
  visibledatarow: [],
  visibledatacolumn: [],
  flowdata: [], // cell data
  config: {}, // config of shell

  defaultcolumnNum: 60, // how many cells in each column
  defaultrowNum: 84, // how many cells in each row
  rowHeaderWidth: 46, //Top first line row header width
  columnHeaderHeight: 30, //Left first line column header's height
  defaultcollen: 73, // The width of cell unit
  defaultrowlen: 19, // The height of cell unit
  ch_width: 0, // scrollX's width
  rh_height: 0, // scrollY's width
  cellMainSrollBarSize: 12, // Scroll bar's width
  luckysheetTableContentHW: [0, 0], // cell area + header - scroll width

  zoomRatio: 1,
  // 用来保存选择了的单元格
  luckysheet_select_save: [],
  // 保存编辑过的单元格
  luckysheetCellUpdate: null,
};

export default Store;
