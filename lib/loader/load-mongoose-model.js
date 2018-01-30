'use strict'

const path = require('path')

module.exports = app => {
    //把mongodb-model挂在到app上
    app.loader.loadToApp(path.join(app.config.baseDir, 'app/model'), 'model', {
        caseStyle: 'upper',
        filter(model) {
            return model.modelName && model.base && model.base.Mongoose;
        }
    })
}