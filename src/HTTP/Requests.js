import axios from 'axios';
const USERSURL = "http://localhost:8080/BackendJavaSchool/auth/users"
const LOGINURL = "http://localhost:8080/BackendJavaSchool/auth/logIn"
const REGURL = "http://localhost:8080/BackendJavaSchool/auth/reg"

class Requests{
    getUser(){
        return axios.get(USERSURL);
    }

    
    postUserLogIn(login,password,reloadPage){
        const user = {
            id: null,
            login: login,
            password: password,
            role: null
        };
     
        return axios.post(LOGINURL, user).then((response)=>{

            if(response.data.role=="ROLE_ADMIN"){
                localStorage.setItem("isAuthorized",1);
                reloadPage();
            }
            else if(response.data.role =="ROLE_CUSTOMER"){
                localStorage.setItem("isAuthorized",2);        
                reloadPage();
            }
            else{
                document.getElementById("wrongLogin").innerHTML = "Wrong Login or Password";
                document.getElementById("wrongLogin").className = "fadeIn";
            }
            // reloadPage();
        });
    }

    postUserReg(login,password,goToLogin){
        const user = {
            id: null,
            login: login,
            password: password,
            role: null
        };

        return axios.post(REGURL,user).then((response)=>{

            if(response.data.role=="ROLE_CUSTOMER"){
                goToLogin();
            }
            else{
                document.getElementById("loginExists").innerHTML="User with this login already exists";
                document.getElementById("loginExists").className = "fadeIn";
            }

        });
    }
}

export default new Requests();