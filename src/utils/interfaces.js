const domain = 'https://mpvue0124.herokuapp.com/';
const interfaces = {
    // 获取openID的接口
    getOpenid: domain + 'api/profiles/getOpenid/',
    getMyLessons: domain + 'api/profiles/mylessons/',
    getQuestions: domain + 'api/profiles/questions/',
    myLesson: domain + 'api/profiles/mylesson/',
    getHotLessons: domain + 'api/profiles/hotLessons/',
    getCataLogue: domain + 'api/profiles/lessondetail/',
    getLessons: domain + 'api/profiles/lessons/'
}

module.exports = interfaces;