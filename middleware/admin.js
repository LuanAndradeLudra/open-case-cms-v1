module.exports = function({$auth, next}){
    if ($auth.user.type !== "admin"){
        next("/auth/login?error=1")
    }
  }