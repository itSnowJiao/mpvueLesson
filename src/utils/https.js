const https = {
  request(options = {}) {
    const {url,data,method,header} = options;

    // 加载动画
    wx.showLoading({
      title: '加载中...',
    });

    // 加载数据
    return new Promise((resolve,reject) => {
      wx.request({
        url,
        method,
        data,
        header,
        success(res) {
          wx.hideLoading();
          // 判断网络
          if(res.statusCode == 404) {
            reject();
            return false;
          } else if(res.statusCode != 200) {
            wx.showToast({
              title: '网络出错，请稍后再试！',
              icon: 'none'
            });
            return false;
          };
          // 成功后的数据
          resolve(res.data);
        },
        fail(err) {
          wx.hideLoading();
          reject(err);
        },
        complete() {
          wx.hideLoading();
        }
      })
    })
  }
}

export default https;