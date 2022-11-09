import getRoles from '../controller/userController.js'

export default (app) => {
        app.route('/api/roles').get(getRoles)
}