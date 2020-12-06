export enum ErrorTypes {
  LOGIN_ERROR = 'loginError',
  REGISTER_ERROR = 'registerError',
  SUCCESS_OPERATION = 'successOperation',
  DELETE_ERROR = 'deleteError',
  UNDEFINED_ERROR = 'undefinedError'
}


export enum ErrorMessages {
  THIS_EMAIL_BUSY = 'This Email Busy, Please Try Any Email',
  THIS_USER_NOT_FOUND = 'This User Not Found. Please, Check Your Email',
  THIS_PASSWORD_WRONG = 'This Password Is Wrong...',
  AUTHORIZATION = 'Please, Authorization Before Add This Course In Your Cart',
  ADD_TO_CART = 'Congratulation, This Course Add To Your Cart',
  ADD_NEW_COURSE_SUCCESS = 'This Course Was Add Success',
  REMOVE_COURSE_SUCCESS = 'This Course Was Deleted',
  REMOVE_COURSE_FAILED = "We Haven't Delete This Course",
  LOGOUT = 'You Left This Page',
  CONGRATULATION_REGISTRY = 'Congratulation. You Was Register Success',
  SUCCESS_UPDATE_COURSE = 'This Course Was Updated',
  SUCCESS_CHANGE_PASSWORD = 'Congratulation. Your Password Was Changed',
  THIS_EMAIL_NOT_EXIST = 'This Email Not Exist. Maybe You Forgot Your Email?',
  SEND_RESET_PASSWORD_MAIL = 'We Send Mail On Your Email. Please Check Your Email',
  SOMETHING_WAS_WRONG = 'Something Was Wrong. Please Try Again',
  TOKEN_NOT_EXIST = 'This Token Not Exist. Please Try Again',
  HAVE_NOT_PERMISSION = "Sorry, But You Don't Have Required Permissions",
  CORRECT_EMAIL = 'Please, Write Correct Email',
  CORRECT_PASSWORD = "Please, Write Correct Password. Length Password Should Be Not Less 6 Symbols, And Don't More 32",
  CORRECT_NAME = "Please, Write Correct NickName. Length NickName Should Be Not Less 3 Symbols, And Don't More 32",
  CORRECT_TITLE = 'Please, Write Correct Title. Length Title Should Be Not Less 3 Symbols',
  CORRECT_PRICE = 'Please, Write Correct Price. Price Should Be Not Less 0 Units',
  CORRECT_DESCRIPTION = "Please, Write Correct Description. Description Should Be Not Less 100 Symbols, And Don't More 3300",
  CORRECT_IMG = 'Please, Write Correct Image URL',
  NOT_EQUAL_FIELDS = 'This Fields Should Be Equal',
  SUCCESS_UPDATE_USER_DATA = 'Congratulation. You Update Information About Yourself'
}
