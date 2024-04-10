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
          validateFunction("name", answer);
        },
      },
      {
        name: "username",
        type: "input",
        message: "Enter Student unique username",
        validate: function (answer) {
          validateFunction("username", answer);
        },
      },
      {
        name: "password",
        type: "input",
        message: "Enter password",
        validate: function (answer) {
          validateFunction("password", answer);
        },
      },
      {
        name: "email",
        type: "input",
        message: "Enter Student email:",
        validate: function (answer) {
          if(!answer.length){
             return `email is required`
          }
          if(students.some(val => val.email == answer)){
            return `${answer} this email has already been taken`
          }
          return true
        },
      },
      {
        name: "city",
        message: "Enter student City",
        validate: function (answer) {
          validateFunction("city", answer);
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
        name: "city",
        type: "confirm",
        message: "Change student fee status:",
        default:!!feestatus,
        validate: function (answer) {
          if (answer.length < 3) {
            return `city is Required .`;
          }
          return true;
        },
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
    console.log("🚀 ~ Student ~ changeCoursesEnrolled ~ alreadyenrolled:", alreadyenrolled)
    console.log("🚀 ~ Student ~ changeCoursesEnrolled ~ newName:", newName)
    const findindex = students.findIndex(val => val.username == newName)
    const studentData:{coursesEnrolled: Course[];} = await inquirer.prompt([
      {
        name: "coursesEnrolled",
        message: "Enter Courses Details",
        type: "checkbox",
        choices: [
          ...allCourses.map((val) => ({
            name: val.name,
            value: { name: val.name, completed: false },
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
        message: "Enter Courses Details",
        type: "checkbox",
        choices: [alreadyenrolled?.map((val) => ({
            name: val.name,
            value: { name: val.name, completed: false },
          })),
        ],
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
        message:"change Course Status",
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
