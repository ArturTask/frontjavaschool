import axios from 'axios';
const config = {
    headers: { 
        "Authorization": "Bearer " + localStorage.getItem("token") 
    }
};
const SOMEURL = "http://localhost:8080/BackendJavaSchool/proba/data";
const LOGINURL = "http://localhost:8080/BackendJavaSchool/auth/log_in";
const REGURL = "http://localhost:8080/BackendJavaSchool/auth/reg";
const GETALLUSERSURL = "http://localhost:8080/BackendJavaSchool/manage/users";
const ADDTARIFURL = "http://localhost:8080/BackendJavaSchool/tariff/add_new";
const GETALLTARIFFSURL = "http://localhost:8080/BackendJavaSchool/tariff/get_all_tariffs";
const GETTARIFFBYID = "http://localhost:8080/BackendJavaSchool/tariff/find_tariff_";
const UPDATETARIFFBYID = "http://localhost:8080/BackendJavaSchool/tariff/update_tariff";
const DELETETARIFF = "http://localhost:8080/BackendJavaSchool/tariff/delete_";
const GETALLACTIVETARIFFSURL = "http://localhost:8080/BackendJavaSchool/tariff/get_all_active_tariffs";
const SIGNCONTRACTURL = "http://localhost:8080/BackendJavaSchool/contracts/sign"

class Requests{
    //test
    getData(){
        return axios.get(SOMEURL);
    }

    //AUTHORIZATION
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

    //FOR ADMIN GET SOME INFO
    getAllUsers(){
         
        return axios.get(GETALLUSERSURL,config);
    }

    postAddTariff(tarif){
        return axios.post(ADDTARIFURL,tarif,config);
    }

    getAllTariffs(){
        return axios.get(GETALLTARIFFSURL,config);
    }

    getTariffById(tariffId){
        return axios.get(GETTARIFFBYID+tariffId,config);
    }

    postUpdateTariff(tariff){
        return axios.post(UPDATETARIFFBYID,tariff,config);
    }

    deleteTariff(id){
        return axios.delete(DELETETARIFF+id,config);
    }

    //FOR CUSTOMERS
    getAllActiveTariffs(){
        return axios.get(GETALLACTIVETARIFFSURL,config);
    }

    postSignContract(contract){
        return axios.post(SIGNCONTRACTURL,contract,config)
    }
}

export default new Requests();