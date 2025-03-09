// src/data/employeeService.gs 
  // generateJccId()
  // getEmployeeSheet()
  // addEmployeeRecord()

// src/business/employeeController.gs
  // addEmployee()


function testGenerateJccId() {
  var newId = generateJccId();
  Logger.log("Generated JCC ID: " + newId);
}

function testaddEmployeeRecord() {
  var dummyEmployee = {
    initials: "BB",
    commonName: "Bubba",
    legalName: "Robert",
    jobTitle: "PCA",
    hireDate: "2023-02-14",
    schedule: "Full-time",
    status: "Onboarding",
    password: "1234",   
    theme: "default",
  };
  var newJccId = addEmployeeRecord(dummyEmployee);
  Logger.log("Employee added with JCC ID: " + newJccId);
}

function testAddEmployee() {
  var dummyEmployee = {
    initials: "BB",
    commonName: "Bubba",
    legalName: "Robert",
    jobTitle: "PCA",
    hireDate: "2023-02-14",
    schedule: "Full-time",
    status: "Onboarding",
    password: "1234",   
    theme: "default",
  };
  
  var result = addEmployee(dummyEmployee); // This should be defined in employeeController.gs
  Logger.log("addEmployee result: " + JSON.stringify(result));
}

