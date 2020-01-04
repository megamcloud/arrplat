import { auth } from "@arrplat/utils"
const whiteList = ['/login']
export default async ({ app }) => {
 await app.router.beforeEach((to, from, next) => {
    if (auth.getToken()) {
      next()
    } else {
      if (whiteList.indexOf(to.path) !== -1) {
        next()
      } else {
        next({path: '/login'})
      }
    }
  })
}
