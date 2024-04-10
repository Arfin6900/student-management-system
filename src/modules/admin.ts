import inquirer from "inquirer"
import { Students, students, welcomeMessage } from "../constants.js"
import { showStudentInfo } from "./studentinfo.js"
import { Student } from "./createStudent.js"
import { printColoredMessage } from "../../coloredPrint.js"
import { studentManagementSystem } from "../index.js"

export const adminDashboard = async(isCreated?:boolean) => {
      welcomeMessage()
      const student:{student:string} = await inquirer.prompt([{
        name:"student",
        message:"select student",
        type:"list",
        choices:[...students.map(category => ({
                name: category.name,
                value: category.username,
            })),
            new inquirer.Separator(),
            { name: 'Create Student', value: 'createStudent' },
            { name: 'Go back', value: "goback" },
            new inquirer.Separator(),

        ]}
      ])
      if(student.student == "goback"){
        studentManagementSystem()
        return
      }
      if (student?.student !== "createStudent" || isCreated) {
        showStudentInfo(student.student)
        return
      }
      if(student.student == "createStudent"){
        try{
        const newStudent = await new Student().createStudent()
        students.push(newStudent)
        printColoredMessage("\nStudent created Successfully ! 😊")
        adminDashboard(true)
        return
      }catch(err){
        console.log("error",err)
        return
      }
      }
}
