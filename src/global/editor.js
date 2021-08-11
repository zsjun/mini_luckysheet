import Store from "../store";

const editor = {
  // worker+blob实现深拷贝替换extend
  deepCopyFlowDataState: false,
  deepCopyFlowDataCache: "",
  deepCopyFlowDataWorker: null,
  deepCopyFlowData: function(flowData) {
    let _this = this;

    if (_this.deepCopyFlowDataState) {
      if (_this.deepCopyFlowDataWorker != null) {
        _this.deepCopyFlowDataWorker.terminate();
      }
      return _this.deepCopyFlowDataCache;
    } else {
      if (flowData == null) {
        flowData = Store.flowdata;
      }

      return $.extend(true, [], flowData);
    }
  },
};

export default editor;
