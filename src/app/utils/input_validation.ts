export function PasswordCheck(password: String, email: String) {

    //TEST PASSWORD
    const password_pattern = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{10,})')
    const pwd = password.toString()
    const password_match = password_pattern.test(pwd)

    console.log(`IS PASSWORD VALID? ${password_match}`)

    //TEST EMAIL
    const email_pattern = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm")
    const email_address = email.toString()
    const email_match = email_pattern.test(email_address)

    console.log(`IS EMAIL VALID? ${email_match}`)

    if (password_match && email_match) {
        return true
    }
    else {
        return false
    }
    
}