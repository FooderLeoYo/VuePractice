import { request } from "./request"

export function isDuplicate(phone) {
  return Axios.post('', {
    phone
  })
}