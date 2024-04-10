#! /usr/bin/env node

// first step is to select admin or student login
// admin will have ability to create, update or delete students, see students details like name surename courses they have enrolled, see if they have paid fees,will able to login and logout
// student will have to pay the fees will able to logout login,will able to get enrolled, get unenrolled will need to pay fees for each course

import inquirer from "inquirer";
import { printColoredMessage } from "../coloredPrint.js";
import { adminDashboard } from "./modules/admin.js";
import { showStudentInfo } from "./modules/studentinfo.js";
import { Login } from "./modules/studentLogin.js";
const choices = [
  {
    message:"SignIn as Admin",
    name: "adminsignin",
  },
  {
    message:"SignIn as student",
    name: "student-signin",
  },
];
export const studentManagementSystem = async () => {
  const auth:{role:'adminsignin' | 'student-signin'} = await inquirer.prompt([
    {
      message:"Select role :",
      name: "role",
      type:"list",
      choices:choices,
    },
  ])
  if(auth.role == 'adminsignin'){
    Login(true).then(val =>  adminDashboard())
    return
  }else{
    Login().then(val => showStudentInfo(val,true))
  }
}
studentManagementSystem()