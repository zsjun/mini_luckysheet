import Store from '../store';
import { getObjType,rgbTohex } from '../utils/util';

export {
    getcellvalue,
    datagridgrowth,
    getRealCellValue,
    checkstatusByCell,
}

//Get the value of the cell
function getcellvalue(r, c, data, type) {
    if (type == null) {
        type = "v";
    }

    if (data == null) {
        data = Store.flowdata;
    }

    let d_value;

    if (r != null && c != null) {
        d_value = data[r][c];
    }
    else if (r != null) {
        d_value = data[r];
    }
    else if (c != null) {
        let newData = data[0].map(function(col, i) {
            return data.map(function(row) {
                return row[i];
            })
        });
        d_value = newData[c];
    }
    else {
        return data;
    }

    let retv = d_value;

    if(getObjType(d_value) == "object"){
        retv = d_value[type];

        if (type == "f" && retv != null) {
            // retv = formula.functionHTMLGenerate(retv);
        }
        else if(type == "f") {
            retv = d_value["v"];
        }
        else if(d_value && d_value.ct && d_value.ct.t == 'd') {
            retv = d_value.m;
        }
    }

    if(retv == undefined){
        retv = null;
    }

    return retv;
}

//Data increase in rows and columns
function datagridgrowth(data, addr, addc, iscallback) {
    if (addr <= 0 && addc <= 0) {
        return data;
    }

    if (addr <= 0) {
        addr = 0;
    }

    if (addc <= 0) {
        addc = 0;
    }

    let dataClen = 0;
    if (data.length == 0) {
        data = [];
        dataClen = 0;
    }
    else {
        dataClen = data[0].length;
    }

    let coladd = [];//需要额外增加的空列
    for (let c = 0; c < addc; c++) {
        coladd.push(null);
    }

    let rowadd = [];//完整的一个空行
    for (let r = 0; r < dataClen + addc; r++) {
        rowadd.push(null);
    }

    for (let r = 0; r < data.length; r++) {
        data[r] = [].concat(data[r].concat(coladd));
    }

    for (let r = 0; r < addr; r++) {
        data.push([].concat(rowadd));
    }


    return data;
}


function getRealCellValue(r, c){
    let value = getcellvalue(r, c, null, "m");
    if(value == null){
        value = getcellvalue(r, c);
    }

    return value;
}

function checkstatusByCell(cell, a){
    let foucsStatus =cell;

    if(a == "fc"){ // font color
        if(foucsStatus == null){
            foucsStatus = "#000000";
        }
        else{
            foucsStatus = foucsStatus[a];

            if(foucsStatus == null){
                foucsStatus = "#000000";
            }

            if(foucsStatus.indexOf("rgba") > -1){
                foucsStatus = rgbTohex(foucsStatus);
            }
        }
    }
    else if(a == "bg"){ // cell background
        if(foucsStatus == null){
            foucsStatus = null;
        }
        else{
            foucsStatus = foucsStatus[a];

            if(foucsStatus == null){
                foucsStatus = null;
            }
            else if(foucsStatus.toString().indexOf("rgba") > -1){
                foucsStatus = rgbTohex(foucsStatus);
            }
        }
    }

    return foucsStatus;
}
