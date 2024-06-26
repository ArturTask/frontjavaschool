import axios from 'axios';
const config = {
    headers: { 
        "Authorization": "Bearer " + localStorage.getItem("token") 
    }
};

// const BASEURL = "http://localhost:8080/"
const BASEURL = "http://localhost:8080/BackendJavaSchool/"
// const BASEURL = "https://bba4onrcu4db9d1lcqq6.containers.yandexcloud.net/"
// const BASEURL = "http://localhost:5000/"
// const BASEURL = "http://51.250.66.139:5000/"
const SOMEURL = BASEURL + "proba/data";
const LOGINURL = BASEURL + "auth/log_in";
const REGURL = BASEURL + "auth/reg";
const GETALLUSERSURL = BASEURL + "manage/users";
const ADDTARIFURL = BASEURL + "tariff/add_new";
const GETALLTARIFFSURL = BASEURL + "tariff/get_all_tariffs";
const GETTARIFFBYID = BASEURL + "tariff/find_tariff_";
const UPDATETARIFFBYID = BASEURL + "tariff/update_tariff";
const DELETETARIFF = BASEURL + "tariff/delete_";
const GETALLACTIVETARIFFSURL = BASEURL + "tariff/get_all_active_tariffs";
const SIGNCONTRACTURL = BASEURL + "contracts/sign";
const GETCONTRACTIDSANDPHONENUMBERS = BASEURL + "contracts/contract_ids_and_phone_numbers_of_user_"; 
const GETCONTRACT = BASEURL + "contracts/get_contract";
const DELETECONTRACT = BASEURL + "contracts/delete_contract_";
const ISBLOCKEDURL = BASEURL + "users/is_blocked_user_"
const CHANGEBLOCKUSER = BASEURL + "users/change_block_user_"
const CHANGEBLOCKUSERBYADMIN = BASEURL + "manage/change_block_user_"
const GETALLCONTRACTSUSERINFO = BASEURL + "manage/getAllContractsUserInfo"
const FINDUSERBYPHONENUMBER = BASEURL + "manage/find_user_by_phone_number_"

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
                document.getElementById("wrongLogin").innerHTML = response.data.role;
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

    getFindUserByPhoneNumber(phoneNumber){
        return axios.get(FINDUSERBYPHONENUMBER+phoneNumber,config);
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