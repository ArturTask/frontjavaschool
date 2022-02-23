import axios from 'axios';
const SOMEURL = "http://localhost:8080/BackendJavaSchool/proba/data";
const LOGINURL = "http://localhost:8080/BackendJavaSchool/auth/log_in";
const REGURL = "http://localhost:8080/BackendJavaSchool/auth/reg";
const GETALLUSERSURL = "http://localhost:8080/BackendJavaSchool/manage/users";

class Requests{
    getData(){
        return axios.get(SOMEURL);
    }

    
    postUserLogIn(login,password,reloadPage){
        const user = {
            id: null,
            login: login,
            password: password,
            role: null
        };
     
        return axios.post(LOGINURL, user).then((response)=>{

            if(response.data.role=="ADMIN"){
                localStorage.setItem("isAuthorized",1);
                localStorage.setItem("userRole","Admin");
                reloadPage();
            }
            else if(response.data.role =="CUSTOMER"){
                localStorage.setItem("isAuthorized",2);
                localStorage.setItem("userRole","Customer");
                reloadPage();
            }
            else{
                document.getElementById("wrongLogin").innerHTML = "Wrong Login or Password";
                document.getElementById("wrongLogin").className = "fadeIn";
            }
            localStorage.setItem("userId",response.data.id);
            localStorage.setItem("token",response.data.token);
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

    getAllUsers(){
        return axios.get(GETALLUSERSURL);
    }
}

export default new Requests();