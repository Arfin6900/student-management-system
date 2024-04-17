import boxen from "boxen";
import { printColoredMessage } from "../coloredPrint.js";
import inquirer from "inquirer";
export const allCourses : {name:string,completed:boolean}[] = [
    { name: "typeScript", completed: false },
    { name: "python", completed: false },
    { name: "javascript", completed: false },
    { name: "Web Development", completed: false },
    { name: "HTML & CSS", completed: false },
    { name: "Data Science", completed: false },
    { name: "Machine Learning", completed: false },
    { name: "Graphic Design", completed: false },
    { name: "Adobe Photoshop", completed: false },
    { name: "Ethical Hacking", completed: false },
    { name: "Cybersecurity Fundamentals", completed: false }
  ];
export interface Students{
    name:string,
    coursesEnrolled:{name:string, completed:boolean,}[],
    feesPaid:boolean,
    joiningDate:Date,
    progress:number,
    email:string,
    city:string,
    username:string,
    password:string
}
let students: Students[] = [
    {
        name: "furqan",
        username: "furqan123",
        password: "password123",
        coursesEnrolled: [
            { name: "typeScript", completed: false },
            { name: "python", completed: false },
            { name: "javascript", completed: false }
        ],
        feesPaid: true,
        joiningDate: new Date('12-dec-2023'),
        progress: 0,
        email: "furqan@gmail.com",
        city: "raheem-yar-khan",
    },
    {
        name: "Alice Smith",
        username: "alice_smith",
        password: "alice123",
        coursesEnrolled: [
            { name: "Web Development", completed: false },
            { name: "HTML & CSS", completed: false }
        ],
        feesPaid: true,
        joiningDate: new Date('05-jan-2024'),
        progress: 0,
        email: "alice@example.com",
        city: "New York City",
    },
    {
        name: "John Doe",
        username: "john_doe",
        password: "john123",
        coursesEnrolled: [
            { name: "Data Science", completed: false },
            { name: "Machine Learning", completed: false }
        ],
        feesPaid: false,
        joiningDate: new Date('20-feb-2024'),
        progress: 0,
        email: "john@example.com",
        city: "Los Angeles",
    },
    {
        name: "Emily Johnson",
        username: "emily_j",
        password: "emily456",
        coursesEnrolled: [
            { name: "Graphic Design", completed: false },
            { name: "Adobe Photoshop", completed: false }
        ],
        feesPaid: true,
        joiningDate: new Date('10-mar-2024'),
        progress: 0,
        email: "emily@example.com",
        city: "Chicago",
    },
    {
        name: "Mohammed Ali",
        username: "mohammed_ali",
        password: "mohammed789",
        coursesEnrolled: [
            { name: "Ethical Hacking", completed: false },
            { name: "Cybersecurity Fundamentals", completed: false }
        ],
        feesPaid: true,
        joiningDate: new Date('15-apr-2024'),
        progress: 0,
        email: "mohammed@example.com",
        city: "Dubai",
    }
];

export const deleteStudent = async (name:string) => {
        let deleteProfile = await inquirer.prompt([{
          name:"delete",
          type:'confirm',
          default:'N',
          message:'Are you sure you want to delete this profile ?',
      }])
        if(deleteProfile.delete){
           const deleteProfile = students.filter(val => val.username !== name)
           students = deleteProfile
          return
        }
      }
export { students }


export const welcomeMessage = (studentName?:string): void => {
    const adminMessage: string = `
    Welcome to Admin Dashboard!
    You have successfully logged in.
    Enjoy managing your Student management system!
  `;
    const studentMessage: string = `
    Welcome to Student Dashboard, ${studentName}!
    You have successfully logged in.
    Enjoy managing your profiile
`;
const message = studentName ? studentMessage : adminMessage

  const boxedMessage: string = boxen(message, {
    padding: 1,
    margin: 1,
    borderStyle: "double",
    borderColor: "green",
    backgroundColor: "black",
  });

  printColoredMessage(boxedMessage, "green");
};

// Call the function to display the welcome message
