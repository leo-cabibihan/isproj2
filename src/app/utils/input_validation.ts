export function PasswordCheck(password:String) {
    
    const pattern = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{10,})')
    const pwd = password.toString()
    const match = pattern.test(pwd)

    console.log(`DO PASSWORDS MATCH? ${match}`)
    return match
}