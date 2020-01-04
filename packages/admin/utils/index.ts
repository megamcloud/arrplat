export function checkPhone(phone) {
  const myReg =/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
  if(!myReg.test(phone)) {
    return false
  }
  return  true
}
