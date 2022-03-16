export const validateEmail = (email: string): null | string => {
  if (!email.match('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')) {
    return 'email is not valid'
  }

  return null
}

export const validateFullname = (fullname: string): null | string => {
  if (fullname.trim().length > 25) return 'fullname is very long'
  if (fullname.trim().length < 2) return 'fullname must not be empty'

  return null
}

export const validateDescription = (fullname: string): null | string => {
  if (fullname.trim().length > 25) return 'description is very long'

  return null
}
