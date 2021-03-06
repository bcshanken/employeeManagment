const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


const employees = [];

// initiation prompt
function newEmployee() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Do you have an employee to enter?",
        name: "addition",
        choices: ["yes", "no"],
      },
    ])
    .then((userInput) => {
      if (userInput.addition === "yes") {
        askEmployDetails();
      } else {
        var main =fs.readFileSync(`./templates/main.html`, `utf8`);
        var cards =[];
        for (var i =0;i<employees.length;i++) {
          var employee = employees[i];
          cards += renderEmployee(employee);
        }
        main = main.replace("{{ team }}", cards);
        fs.writeFileSync(`./team.html`,main);
        console.log("your team is generated")
      }
    });
}

// employee detail prompt
function askEmployDetails() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What is the title",
        name: "title",
        choices: ["Engineer", "Intern", "Manager"],
      },
      {
        type: "input",
        message: "What is the employee name?",
        name: "name",
      },
      {
        type: "input",
        message: "What is the employee id Number?",
        name: "id",
      },
      {
        type: "input",
        message: "What is the employee email",
        name: "email",
      },
      {
        type: "input",
        message: "What is the Engineer's Github?",
        name: "github",
        when: (userInput) => userInput.title === "Engineer",
      },
      {
        type: "input",
        message: "What is the Intern's School?",
        name: "school",
        when: (userInput) => userInput.title === "Intern",
      },
      {
        type: "input",
        message: "What is the Office Number?",
        name: "officeNumber",
        when: (userInput) => userInput.title === "Manager",
      },
    ])
    .then((userInput) => {
      if (userInput.title === "Engineer") {
        const newEng = new Engineer(
          userInput.name,
          userInput.id,
          userInput.email,
          userInput.github
        );
        employees.push(newEng);
      } else if (userInput.title === "Intern") {
        const newIntern = new Intern(
          userInput.name,
          userInput.id,
          userInput.email,
          userInput.school
        );
        employees.push(newIntern);
      } else {
        const newManager = new Manager(
          userInput.name,
          userInput.id,
          userInput.email,
          userInput.officeNumber
        );
        employees.push(newManager);
      }
      newEmployee();
    });
}



function renderEmployee(employee) {
  if (employee.getRole() === "Manager") {
    var managerCard = fs.readFileSync(`./templates/manager.html`, `utf8`);
    managerCard = managerCard.replace("{{ name }}", employee.getName());
    managerCard = managerCard.replace("{{ role }}", employee.getRole());
    managerCard = managerCard.replace("{{ id }}", employee.getId());
    managerCard = managerCard.replace("{{ email }}", employee.getEmail());
    managerCard = managerCard.replace("{{ emailDisplay }}", employee.getEmail());
    managerCard = managerCard.replace(
      "{{ officeNumber }}",
      employee.getOfficeNumber()
    );
    return managerCard;
  } else if (employee.getRole() === "Intern") {
    var internCard = fs.readFileSync("./templates/Intern.html", "utf8");
    internCard = internCard.replace("{{ name }}", employee.getName());
    internCard = internCard.replace("{{ role }}", employee.getRole());
    internCard = internCard.replace("{{ id }}", employee.getId());
    internCard = internCard.replace("{{ email }}", employee.getEmail());
    internCard = internCard.replace("{{ emailDisplay }}", employee.getEmail());
    internCard = internCard.replace("{{ school }}", employee.getSchool());
    return internCard;
  } else {
    var engineerCard = fs.readFileSync("./templates/Engineer.html", "utf8");
    engineerCard = engineerCard.replace("{{ name }}", employee.getName());
    engineerCard = engineerCard.replace("{{ role }}", employee.getRole());
    engineerCard = engineerCard.replace("{{ id }}", employee.getId());
    engineerCard = engineerCard.replace("{{ email }}", employee.getEmail());
    engineerCard = engineerCard.replace("{{ emailDisplay }}", employee.getEmail());
    engineerCard = engineerCard.replace("{{ github }}", employee.getGithub());
    return engineerCard;
  }
}

newEmployee();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
