function isLogged() {

    const token = localStorage.getItem('token')
    try {
        if(typeof token !== 'undefined' && token !== null) {
            return true
        } else {
            return false
        }
    }
    catch (err) {
       return false
    }
    
}

export default isLogged
