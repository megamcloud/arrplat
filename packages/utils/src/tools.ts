export default {
  getRandomValues() {
    console.log('this is random')
    return 1
  },

  getCookie(cookies: string, name: string) {
    let arr, reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if (!cookies) return null

    if (arr = cookies.match(reg)) {
      return unescape(arr[2])
    } else {
      return null
    }
  }
}
