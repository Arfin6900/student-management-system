import inquirer from "inquirer";
import { allCourses, students } from "../constants.js";
import { printColoredMessage } from "../../coloredPrint.js";

type Course = { name: string; completed: boolean }
export class Student {
  name?: string;
  coursesEnrolled: Course[];
  feesPaid?: boolean;
  joiningDate?: Date;
  progress?: number;
  email?: string;
  city?: string;
  enrollCourse?: Course;
  unenrollCourse?: string;
  id?: number;
  username?:string;
  password?:string

  constructor(
    name?: string,
    coursesEnrolled: Course[] = [
      { name: "TypeScript", completed: false },
      { name: "JavaScript", completed: true },
      { name: "Python", completed: false },
    ],
    feesPaid?: boolean,
    joiningDate?: Date,
    progress?: number,
    email?: string,
    city?: string,
    enrollCourse?: Course,
    unenrollCourse?: string,
    id?: string,
    username?:string,
    password?:string
  ) {
    this.name = name;
    this.coursesEnrolled = coursesEnrolled;
    this.feesPaid = feesPaid;
    this.joiningDate = joiningDate;
    this.progress = progress;
    this.email = email;
    this.city = city;
    this.enrollCourse = enrollCourse;
    this.unenrollCourse = unenrollCourse;
    this.username = username;
    this.password = password;
  }
  validateFunction = (name: string, answer: string) => {
    if (answer.length < 3) {
      return `${name} is Required .`;
    }
    return true;
  };
  async createStudent(): Promise<{
    name: string;
    email: string;
    city: string;
    coursesEnrolled: {
      name: string;
      completed: boolean;
    }[];
    feesPaid: boolean;
    joiningDate: Date;
    progress: number;
    username:string;
    password:string
  }> {
    const validateFunction = (name: string, answer: string) => {
      if (answer.length < 3) {
        return `${name} is Required .`;
      }
      return true;
    };
    printColoredMessage("Create student*")
    const studentData = (await inquirer.prompt([
      {
        name: "name",
        type: "input",
        message: "Enter Student name:",
        validate: function (answer) {
         return validateFunction("name", answer);
        },
      },
      {
        name: "username",
        type: "input",
        message: "Enter Student unique username:",
        validate: function (answer) {
          if(!answer.length){
            return `username is required`
         }
         if(students.some(val => val.username == answer)){
           return `${answer} this username has already been taken`
         }
         return true
        },
      },
      {
        name: "password",
        type: "input",
        message: "Enter password:",
        validate: function (answer) {
          return validateFunction("password", answer);
        },
      },
      {
        name: "email",
        type: "input",
        message: "Enter Student email:",
        validate: function (answer) {
          // Check if the email is empty
          if (!answer.length) {
            return `Email is required`;
          }
        
          // Check if the email syntax is valid
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(answer)) {
            return `Invalid email format`;
          }
        
          // Check if the email is already taken
          if (students.some(val => val.email === answer)) {
            return `${answer} is already taken`;
          }
        
          return true; // Return true if validation passes
        },
      },
      {
        name: "city",
        message: "Enter student City:",
        validate: function (answer) {
          return validateFunction("city", answer);
        },
      },
      {
        name: "coursesEnrolled",
        message: "Enter Courses Details",
        type: "checkbox",
        choices: [
          ...allCourses.map((val) => ({
            name: val.name,
            value: { name: val.name, completed: false },
          })),
        ],
        validate: function (answer) {
          if(answer.length == 0){
            return 'select atleast 1 course'
          }
          if (answer.length > 3) {
            return "You can select up to 3 courses only.";
          }
          return true;
        },
      },
      { name: "feesPaid", message: "Enter yes if paid :", type: "confirm" },
    ])) as {
      name: string;
      email: string;
      city: string;
      coursesEnrolled: Course[];
      feesPaid: boolean;
      joiningDate: Date;
      progress: number;
      username:string;
      password:string
    };
    const date = new Date().toLocaleDateString()
    studentData.joiningDate = new Date(date);
    studentData.progress = 2;
    return studentData;
  }

 async changeName(newName?:string): Promise<void> {
    const findindex = students.findIndex(val => val.username == newName)
    const studentData:{name:string} = await inquirer.prompt([
      {
        name: "name",
        type: "input",
        message: "Enter Student name:",
        validate: function (answer) {
          if (answer.length < 3) {
            return `name is Required .`;
          }
          return true;
        },
      },
    ]
    )
    students[findindex].name = studentData.name
  }
  // changeFeesPaidStatus(newStatus: boolean): void {
  //   this.feesPaid = newStatus;
  // }
  // changeCity(newCity: string) {
  //   this.city = newCity;
  // }
  async changeCity(newName?:string): Promise<void> {
    const findindex = students.findIndex(val => val.username == newName)
    const studentData:{city:string} = await inquirer.prompt([
      {
        name: "city",
        type: "input",
        message: "Enter Student city name:",
        validate: function (answer) {
          if (answer.length < 3) {
            return `city is Required .`;
          }
          return true;
        },
      },
    ]
    )
    students[findindex].city = studentData.city
  }

  async changFeeStatus(newName?:string, feestatus?:boolean): Promise<void> {
    const findindex = students.findIndex(val => val.username == newName)
    const studentData:{feesPaid:boolean} = await inquirer.prompt([
      {
        name: "feesPaid",
        type: "confirm",
        message: "Change student fee status:",
        default:!!feestatus,
      },
    ]
    )
    students[findindex].feesPaid = studentData.feesPaid
  }

  async changePassword(newName?:string): Promise<void> {
    const findindex = students.findIndex(val => val.username == newName)
    const studentData:{password:string} = await inquirer.prompt([
      {
        name: "password",
        type: "input",
        message: "Enter password",
        validate: function (answer) {
          if (answer.length <= 6) {
            return `password is Required .`;
          }
          return true;
        },
      },
    ]
    )
    students[findindex].password = studentData.password
  }

  async changeCoursesEnrolled(newName?:string,alreadyenrolled?:Course[]): Promise<void> {
    const findindex = students.findIndex(val => val.username == newName)
    const studentData:{coursesEnrolled: Course[];} = await inquirer.prompt([
      {
        name: "coursesEnrolled",
        message: "Enter Courses Details",
        type: "checkbox",
        choices: [
          ...allCourses.map((val) => ({
            name: val.name,
            value: { name: val.name, completed: val.completed },
            checked:alreadyenrolled && !!alreadyenrolled.some(val2 => val2.name == val.name)
          })),
        ],
        validate: function (answer) {
          if (answer.length > 3) {
            return "You can select up to 3 courses only.";
          }
          return true;
        },
      },
    ]
    )
    students[findindex].coursesEnrolled = studentData.coursesEnrolled
  }
  
  async changeCoursesStatus(newName?:string,alreadyenrolled?:Course[]): Promise<void> {
    const findindex = students.findIndex(val => val.username == newName)
    if (findindex == undefined) {
        return
    }
    const studentData:{coursesEnrolled: Course;} = await inquirer.prompt([
      {
        name: "coursesEnrolled",
        message: "Select course to change it's status",
        type: "list",
        choices: alreadyenrolled?.map((val) => ({
            name: val.name,
            value: { name: val.name, completed: val.completed },
          })),
      },
    ]
    )
    const findCourseIndex = alreadyenrolled?.findIndex(val => val.name == studentData.coursesEnrolled.name)
    if (findCourseIndex == undefined){
       return
    }
    let changeStatus = await inquirer.prompt([{
        name:"status",
        type:'confirm',
        message:`Is ${studentData.coursesEnrolled.name} is completed ?`,
    }])
    if(alreadyenrolled !== undefined){
    let alreadyenrolledCopy:Course[] = alreadyenrolled;
    alreadyenrolledCopy[findCourseIndex].completed = changeStatus.status
    students[findindex].coursesEnrolled = alreadyenrolledCopy
  }
  }

  // updateEnrollments(enrollment: Course) {
  //   if (this.unenrollCourse) {
  //     let c_enrolled = this.coursesEnrolled.filter(
  //       (val) => val.name !== this.unenrollCourse
  //     );
  //     c_enrolled.push({ ...enrollment });
  //     return (this.coursesEnrolled = c_enrolled);
  //   }
  //   this.coursesEnrolled.push(enrollment);
  // }
}
