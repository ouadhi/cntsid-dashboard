import axios from 'axios'

class ConfigService{

   getConfiguration (){
    return axios.get('http://localhost:8881/api/v1/config') ; 
   }

   updateConfiguration (configList){
    axios.post("http://localhost:8881/api/v1/config", configList)
       
   }

   runTaskService (taskName){
     return axios.post("http://localhost:8881/api/v1/tasks",{task:taskName})
         
     }
   
}

export default new ConfigService()