import inquirer from "inquirer"
import { Student } from "./createStudent.js"
import { printColoredMessage } from "../../coloredPrint.js"
import { showStudentInfo } from "./studentinfo.js"
import { students } from "../constants.js"

export const editProfile = async(name:string,isAdmin?:boolean) => {
    const coursesAlreadyEnrolled = students.find(val => val.username == name)
    let editStd = new Student()
    const choicesInterface = {
        changeName:'Name changed successfully !',
        changeCourses:'Courses updated successfully',
        changeCity:'City name changed successfully !',
        changePassword:'Password changed successfully !',
        changeFeesPaid:'Fee status updated successfully !',
        changeCoursesStatus:'Fee status updated successfully !',
    }
    interface Choices {
        name: keyof typeof choicesInterface;
        function: () => Promise<void>
    }
    const choices: Choices[] = [
        {
            name:'changeName',
            function: async function() { await editStd.changeName(name) }
        },
        {
            name:'changeCourses',
            function: async function () { await  editStd.changeCoursesEnrolled(name, coursesAlreadyEnrolled?.coursesEnrolled) }
        },
        {
            name:'changeCity',
            function: async function ()  { await  editStd.changeCity(name) }
        },
        {
            name:'changePassword',
            function: async function () { await  editStd.changePassword(name) }
        },
 
    ]

    if(isAdmin){
        choices.push(
            {
                name:'changeFeesPaid',
                function:async function () { await  editStd.changFeeStatus(name,coursesAlreadyEnrolled?.feesPaid || false) }
            },
            {
                name:'changeCoursesStatus',
                function:async function () { await  editStd.changeCoursesStatus(name,coursesAlreadyEnrolled?.coursesEnrolled)}
            }
        )
    }
    
    // {
    //     name: "Mohammed Ali",
    //     username: "mohammed_ali",
    //     password: "mohammed789",
    //     coursesEnrolled: [
    //         { name: "Ethical Hacking", completed: false },
    //         { name: "Cybersecurity Fundamentals", completed: false }
    //     ],
    //     feesPaid: true,
    //     joiningDate: new Date('15-apr-2024'),
    //     progress: 0,
    //     email: "mohammed@example.com",
    //     city: "Dubai",
    // }
    const editStudent:{ select:keyof typeof choicesInterface | 'goBack' } = await inquirer.prompt([
        {
            name:"select",
            type:'list',
            message:'Edit student profile',
            choices:[...choices.map(val => val.name),new inquirer.Separator(),{name:"Go Back",value:'goBack'}]
        }
    ])
    if(editStudent.select == "goBack") {
        showStudentInfo(name,!isAdmin)
        return
    }
    if(editStudent.select == undefined){
        return
    }
    const selectedChoice =  choices.find(val => val.name == editStudent.select )
    if(selectedChoice == undefined) {
        return
    }
   let std : { name:keyof typeof choicesInterface, function : () => Promise<void> } = selectedChoice
   std?.function().then(val => {
       printColoredMessage(choicesInterface[std.name])
       showStudentInfo(name,!isAdmin)
   })
}