import UserController from './src/controller/User'

export default [{
    path: '/user',
    methods: 'get',
    action: UserController.get
}]
