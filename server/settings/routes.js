import getRoles from '../controller/userController.js'

export default (app) => {
        app.route('/roles').get(getRoles)
}