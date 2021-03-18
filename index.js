// Your code here
function  createEmployeeRecord(arr) {
    let employee = {firstName: '', familyName: '', title: '', payPerHour: null, timeInEvents: [], timeOutEvents: []}
    employee.firstName = arr[0]
    employee.familyName = arr[1]
    employee.title = arr[2]
    employee.payPerHour = arr[3]
   
    return employee
}

function createEmployeeRecords(arrOfArrs){
    return arrOfArrs.map(arr => createEmployeeRecord(arr))
}

function createTimeInEvent(empRecord, dateStamp) {
    let hour = parseInt(dateStamp.split(" ")[1])
    let date = dateStamp.split(" ")[0]
    let newObj = {type: "TimeIn", hour: hour, date: date}
    empRecord.timeInEvents.push(newObj)
   return empRecord
}

function createTimeOutEvent(empRecord, dateStamp) {
    let hour = parseInt(dateStamp.split(" ")[1])
    let date = dateStamp.split(" ")[0]
    let newObj = {type: "TimeOut", hour: hour, date: date}
    empRecord.timeOutEvents.push(newObj)
   return empRecord
}

function hoursWorkedOnDate(empRecord, date){
   let timeIn = empRecord.timeInEvents.filter(event => event.date == date)[0].hour
   let timeOut = empRecord.timeOutEvents.filter(event => event.date == date)[0].hour

   return (timeOut - timeIn)/100

}

function wagesEarnedOnDate(empRecord, date){
    return empRecord.payPerHour * hoursWorkedOnDate(empRecord, date)
}

function allWagesFor(empRecord){
    let total = 0
    empRecord.timeInEvents.forEach(e => {
        total += wagesEarnedOnDate(empRecord, e.date)
    })
    return total
}


function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.filter(emp => emp.firstName === firstName)[0]
}

function calculatePayroll(arrOfRecords) {
    return arrOfRecords.map(empRecord => allWagesFor(empRecord)).reduce((a, b) => a + b, 0)

}