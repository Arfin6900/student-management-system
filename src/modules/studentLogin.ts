import inquirer from "inquirer"
import { students } from "../constants.js"

export const Login = async (isAdmin?:boolean) => {
    let s_info:{username:string} = await inquirer.prompt([{
        name:'username',
        message:isAdmin ? "Enter admin Name:" : "Enter username:",
        type:"input",
        validate:function(answer){
            if(isAdmin && answer !== "admin"){
                return 'invalid Admin name'
            }
            if(!isAdmin && !students.some(val => val.username == answer.toLowerCase())){
                return `Username not found`
            }
            return true
        }
    },
    {
        name:'password',
        message:"Enter password:",
        type:"input",
        validate:function(answer){
            if(isAdmin && answer !== "admin"){
                return 'invalid Admin password'
            }
            if(!isAdmin && !students.some(val => val.password == answer)){
                return `invalid Password please enter valid password`
            }
            return true
        }
    }])
    return s_info.username
}