# mini_luckySheet

## 介绍
向LuckySheet致敬！阅读LuckySheet源码的过程中，从小到大重构学习前端开发技术。


## 安装教程
0.  git clone
1.  npm install
3.  npm run dev

## 使用说明

### DEVELOP
```
npm run dev
```
### PACKAGE
```
npm run build

Google浏览器 http://localhost:3000/



## 软件架构
LuckySheet文档： https://mengshukeji.github.io/LuckysheetDocs/
源码分析目录：https://blog.csdn.net/u010593516/article/details/109604358

### HTML元素
body
div id="luckysheet"
  div class="luckysheet-work-area luckysheet-noselected-text"
   div id="luckysheet-wa-editor" class="luckysheet-wa-editor toolbar"
    div id="luckysheet-icon-font-size"  字体大小
    div id="luckysheet-icon-bold"  粗体按钮
    div id="luckysheet-icon-italic"  斜体按钮
    div id="luckysheet-icon-strikethrough"  删除线按钮
    div id="luckysheet-icon-underline"  下划线按钮
    div id="luckysheet-icon-merge-button" 合并按钮
    div id="luckysheet-icon-merge-menu"  合并选单-droplist
    div id="luckysheet-icon-align" 左右对齐按钮
    div id="luckysheet-icon-align-menu"  左右对齐菜单项
    div id="luckysheet-icon-valign"   上下对齐按钮
    div id="luckysheet-icon-valign-menu"   上下对齐菜单项
  div class="luckysheet-grid-container luckysheet-scrollbars-enabled"
   div class="luckysheet-grid-window"
    div id="luckysheet-grid-window-1"
     canvas id="luckysheetTableContent"
     table class="luckysheet-grid-window-2"
      div class="luckysheet-left-top" 左上角全选
      div id="luckysheet-cols-h-c"  列标题栏
       div id="luckysheet-cols-change-size"  改变列宽分隔符
       div id="luckysheet-cols-h-hover"  hover箭头变化
       div div id="luckysheet-cols-h-selected"  选定的列标题
      div id="luckysheet-rows-h" 行标题栏
       div id="luckysheet-rows-h-selected"  选定的行标题
      div id="luckysheet-cell-main"  单元格区域
       div id="luckysheet-change-size-line"  main-cell的行列选择线
       div id=luckysheet-selection-copy  复制sheet的时候，绚丽的循环点线
       div id="luckysheet-cell-selected-boxs"  选中的单元格集合
        div id="luckysheet-cell-selected"  选中的一个单元格
       div id=luckysheet-cell-flow_0
        div class="luckysheet-cell-flow-clip"
         div id="luckysheetcoltable_0"
           div id="luckysheet-sheettable_0"   定义cell-main的隐形滚动条长宽
...
dir="ltr"
  div id="luckysheet-input-box-index" 编辑后滚动跟随的单元格提示
  div id="luckysheet-input-box"
   div id="luckysheet-rich-text-editor"  单元格录入
div id=luckysheet-copy-content  粘贴excel过来的数据加功使用
 div id=luckysheet-rightclick-menu   右键菜单项
 div id=luckysheet-copy-btn  复制按钮
 div id=luckysheet-copy-paste  粘贴按钮
div id="luckysheet-icon-font-size-menuButton"  字体选择下拉框
div id="luckysheet-icon-merge-menu-menuButton"  合并单元格下拉框


```
### 源代码行数
```
资源浏览器 -> src 目录 -> 鼠标右键 -> Git bash here -> 命令行执行

$ find . "(" -name "*.js" ")" -print | xargs wc -l
    12 ./config.js
   389 ./controllers/handler.js
    65 ./controllers/keyboard.js
   834 ./controllers/menuButton.js
   321 ./controllers/rowColumnOperation.js
   389 ./controllers/selection.js
   126 ./controllers/sheetmanage.js
    40 ./core.js
    10 ./index.js
    28 ./model/editor.js
   379 ./model/getdata.js
    86 ./model/mergeborder.js
   215 ./model/mergeCell.js
    67 ./model/rhchInit.js
    77 ./model/setdata.js
    62 ./model/updateFormat.js
     7 ./plugins/js/clipboard.min.js
     1 ./plugins/js/crypto-api.min.js
     7 ./plugins/js/html2canvas.min.js
     0 ./plugins/js/jquery-ui.min.js
     7 ./plugins/js/jquery.mousewheel.min.js
     1 ./plugins/js/jstat.min.js
     6 ./plugins/js/localforage.min.js
     3 ./plugins/js/lodash.min.js
     0 ./plugins/js/spectrum.min.js
    34 ./store/index.js
   400 ./utils/constant.js
    14 ./utils/format.js
    91 ./utils/location.js
   133 ./utils/menuItems.js
    79 ./utils/sheetSearch.js
   197 ./utils/util.js
    15 ./utils/validate.js
    83 ./view/chooseOneCell.js
    36 ./view/cleargridelement.js
    52 ./view/createdom.js
   529 ./view/draw.js
     6 ./view/loading.js
   139 ./view/menuButtonDom.js
    31 ./view/refresh.js
    57 ./view/resize.js
    33 ./view/scroll.js
   212 ./view/select.js
   172 ./view/updateCell.js
  5445 total

