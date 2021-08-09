import {
    getObjType
} from '../utils/util';
import {
    isRealNull
} from './validate';
import Store from '../store/index'

export {
    setcellvalue,
}

//Set cell value
function setcellvalue(r, c, d, v) {
    if (d == null) {
        d = Store.flowdata;
    }
    // 若采用深拷贝，初始化时的单元格属性丢失
    let cell = d[r][c];

    let vupdate;

    if (getObjType(v) == "object") {
        if (cell == null) {
            cell = v;
        } else {
            if (v.f != null) {
                cell.f = v.f;
            }

            if (v.spl != null) {
                cell.spl = v.spl;
            }

            if (v.ct != null) {
                cell.ct = v.ct;
            }
        }


        if (getObjType(v.v) == "object") {
            vupdate = v.v.v;
        } else {
            vupdate = v.v;
        }
    } else {
        vupdate = v;
    }

    if (isRealNull(vupdate)) {
        if (getObjType(cell) == "object") {
            delete cell.m;
            delete cell.v;
        } else {
            cell = null;
        }

        d[r][c] = cell;

        return;
    }

    if (isRealNull(cell)) {
        cell = {};
    }

    let mask = genarate(vupdate);

    cell.m = mask[0].toString();
    cell.ct = mask[1];
    cell.v = mask[2];

    d[r][c] = cell;
}

function genarate(value) { //万 单位格式增加！！！
    var m = null,
        ct = {},
        v = value;

    m = value;
    ct.fa = "General";
    ct.t = "g";

    return [m, ct, v];
}