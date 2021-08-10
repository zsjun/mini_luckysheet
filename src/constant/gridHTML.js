const gridHTML = function() {
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
                              <div class="luckysheet-cell-main " id="luckysheet-cell-main">
                                <div id="luckysheet-cell-selected-boxs">
                                    <div id="luckysheet-cell-selected" class="luckysheet-cell-selected"></div>
                                </div>
                              </div>
                          </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>`;
};

export default gridHTML;
