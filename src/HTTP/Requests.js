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
const SIGNCONTRACTURL = "http://localhost:8080/BackendJavaSchool/contracts/sign";
const GETCONTRACTIDSANDPHONENUMBERS = "http://localhost:8080/BackendJavaSchool/contracts/contract_ids_and_phone_numbers_of_user_"; 
const GETCONTRACT = "http://localhost:8080/BackendJavaSchool/contracts/get_contract";
const DELETECONTRACT = "http://localhost:8080/BackendJavaSchool/contracts/delete_contract_";
const ISBLOCKEDURL = "http://localhost:8080/BackendJavaSchool/users/is_blocked_user_"
const CHANGEBLOCKUSER = "http://localhost:8080/BackendJavaSchool/users/change_block_user_"
const CHANGEBLOCKUSERBYADMIN = "http://localhost:8080/BackendJavaSchool/manage/change_block_user_"
const GETALLCONTRACTSUSERINFO = "http://localhost:8080/BackendJavaSchool/manage/getAllContractsUserInfo"

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

    changeBlockUserByAdmin(userId){
        return axios.get(CHANGEBLOCKUSERBYADMIN+userId,config)
    }

    getAllContractsUserInfo(){
        return axios.get(GETALLCONTRACTSUSERINFO,config);
    }

    //FOR CUSTOMERS
    getAllActiveTariffs(){
        return axios.get(GETALLACTIVETARIFFSURL,config);
    }

    postSignContract(contract){
        return axios.post(SIGNCONTRACTURL,contract,config)
    }

    //PERSONAL ACCOUNT
    getContractIdsANdPhoneNumbersOfUser(userId){
        return axios.get(GETCONTRACTIDSANDPHONENUMBERS+userId,config);
    }
    
    postGetContract(contractId,phoneNumber){
        let resp ={contractId:contractId,phoneNumber:phoneNumber}
        return axios.post(GETCONTRACT,resp,config);
    }

    deleteContract(id){
        return axios.delete(DELETECONTRACT+id,config);
    }

    getIsBlocked(userId){
        return axios.get(ISBLOCKEDURL+userId,config);
    }

    changeBlockUser(userId){
        return axios.get(CHANGEBLOCKUSER+userId,config);
    }
}

export default new Requests();