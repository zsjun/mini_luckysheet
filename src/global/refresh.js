
import { 
    luckysheetDrawMain, 
    luckysheetDrawgridRowTitle, 
    luckysheetDrawgridColumnTitle 
} from './draw';
import Store from '../store';

export {
    luckysheetrefreshgrid,
}

//Refresh the canvas display data according to scrollHeight and scrollWidth
function luckysheetrefreshgrid(scrollWidth, scrollHeight) {
    
    let luckysheetTableContent = $("#luckysheetTableContent").get(0).getContext("2d");
    luckysheetDrawMain(scrollWidth, scrollHeight);
    luckysheetDrawgridColumnTitle(scrollWidth);
    luckysheetDrawgridRowTitle(scrollHeight);

    //清除canvas左上角区域 防止列标题栏序列号溢出显示
    luckysheetTableContent.clearRect(0, 0, (Store.rowHeaderWidth-1) , (Store.columnHeaderHeight-1) );

}
