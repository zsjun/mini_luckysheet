
export {
    gridHTML,
    luckysheetloadingHTML,
    luckysheetdefaultstyle,
}

//dom variable
const gridHTML = function(){

    return `<div class="luckysheet">
                    <div class="luckysheet-grid-container luckysheet-scrollbars-enabled"> 
                        <div class="luckysheet-grid-window"> 
                            <div class="luckysheet-grid-window-1" id="luckysheet-grid-window-1">
                                <canvas id="luckysheetTableContent" class="luckysheetTableContent"></canvas> 
                                <table class="luckysheet-grid-window-2" cellspacing="0" cellpadding="0" dir="ltr" tabindex="-1" > 
                                    <tbody> 
                                        <tr> 
                                            <td valign="top" class="luckysheet-paneswrapper"> 
                                                <div class="luckysheet-left-top" id="luckysheet-left-top"> </div> 
                                            </td> 
                                            <td valign="top" class="luckysheet-paneswrapper"> 
                                                <div id="luckysheet-cols-h-c" class="luckysheet-cols-h-c"> </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td valign="top" class="luckysheet-paneswrapper"> 
                                                <div class="luckysheet-rows-h" id="luckysheet-rows-h"> </div> 
                                            </td>  
                                            <td valign="top" class="luckysheet-paneswrapper">
                                                <div class="luckysheet-cell-loading" id="luckysheet-cell-loading"></div> 
                                                <div class="luckysheet-scrollbars luckysheet-scrollbar-ltr luckysheet-scrollbar-x" id="luckysheet-scrollbar-x"><div></div></div> 
                                                <div class="luckysheet-scrollbars luckysheet-scrollbar-ltr luckysheet-scrollbar-y" id="luckysheet-scrollbar-y"><div></div></div> 
                                                <div class="luckysheet-cell-main " id="luckysheet-cell-main"></div> 
                                            </td> 
                                        </tr> 
                                    </tbody> 
                                </table> 
                            </div> 
                    </div>
                  </div>`;
}

const luckysheetloadingHTML = function(){ 
    return'<div id="luckysheetloadingdata" style="width:100%;text-align:center;position:absolute;top:0px;height:100%;font-size: 16px;z-index:1000000000;background:#fff;"><div style="position:relative;top:45%;width:100%;"><div class="luckysheetLoaderGif"></div><span>Loading...</span></div></div>';
}


const luckysheetdefaultstyle = {
    fillStyle: "#000000",
    textBaseline: "middle",
    strokeStyle: "#dfdfdf",
    rowFillStyle: "#5e5e5e",
    textAlign: 'center'
}
