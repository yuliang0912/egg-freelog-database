/**
 * Created by yuliang on 2017/10/31.
 */


'use strict'

const path = require('path')
const is = require('is-type-of')

module.exports = app => {
    app.loader.loadToApp(path.join(app.config.baseDir, 'app/data-provider'), 'dataProvider', {
        initializer: (obj, opt) => {
            if (is.class(obj)) {
                return new obj(app)
            }
            return obj
        },
        call: true
    });
}