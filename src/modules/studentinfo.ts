import boxen from "boxen";
import { colors, printColoredMessage } from "../../coloredPrint.js";
import { Students, students, welcomeMessage } from "../constants.js";
import inquirer from "inquirer";
import { adminDashboard } from "./admin.js";
import { studentManagementSystem } from "../index.js";
import { editProfile } from "./editStudent.js";
const emails = students.map((val) => val.email);
type Emails = (typeof emails)[number];
const choices1 = [
  {
    name: "editStudent",
    value: "editProfile",
  },
  {
    name: "deleteStudent",
    value: "deleteProfile",
  },
];
const choices2 = [
  {
    name: "editProfile",
    value: "editProfile",
  },
  {
    name: "deleteProfile",
    value: "deleteProfile",
  },
];
export const showStudentInfo = async (std: string, isStudent?:boolean) => {
  const choices = isStudent ? choices2 : choices1
  isStudent && welcomeMessage(std)
  let student = await inquirer
    .prompt([
      {
        message: showStudentInfo_1(std),
        name: "name",
        type: "list",
        choices: [...choices.map(val=>({
          name:val.name,
          value:val.value
        })),
        new inquirer.Separator(),
        {name:"Go back", value:"goBack"}],
      },
    ])
    if(student.name == "editProfile"){
       await editProfile(std,!isStudent)
       return
    }
    if(student.name == "goBack"){
      isStudent ? studentManagementSystem() : adminDashboard() 
      return
    }
    
};
export const showStudentInfo_1 = (std: Emails) => {

  let student: Students | undefined = students.find((val) => val.username == std);
  if (!student) return;

  
  const getColorizedString = (
    property: string,
    value: string | boolean,
    completed?: boolean
  ): string => {
    let valueColor = colors.red;
    if (typeof value == "boolean") {
      valueColor = value ? colors.green : colors.red;
    } else if (typeof completed! == "undefined") {
      valueColor = value ? colors.green : colors.red;
    }
    return `${colors.orange}${property}: ${valueColor}${value}${colors.reset}`;
  };


  const formattedStudentInfo = `
  ${getColorizedString("Name", student.name)}
  ${getColorizedString(
    "Courses Enrolled",
    "",
    student.coursesEnrolled[0].completed
  )}
  - ${student.coursesEnrolled
    .map(
      (course) =>
        `${course.name} (${course.completed ? colors.green : colors.red}${
          course.completed ? "Completed" : "Not Completed"
        })`
    )
    .join("\n- ")}
  ${getColorizedString("Fees Paid", student.feesPaid)}
  ${getColorizedString("Joining Date", student.joiningDate.toDateString())}
  ${getColorizedString("Email", student.email)}
  ${getColorizedString("UserName", student.username)}
  ${getColorizedString("City", student.city)}
  `;


  
  const boxedStudentInfo = boxen(formattedStudentInfo, {
    padding: 1,
    margin: 1,
    borderStyle: "round",
    borderColor: "green",
  });



  console.log(boxedStudentInfo);
};
