// Sync
console.log("starting...");
console.log("working...");
console.log("ending...");

// Async
console.log("starting...");
setTimeout(() => console.log("working..."), 5000);
console.log("ending...");

// Promise
function doSomething(hasProblem) {
    return new Promise((resolve, reject) => {
        setTimeout(
            () => (hasProblem ? reject("Fail Working") : resolve("Fully Complete")), 
            5000
        )
    })
}
// Using Promise
// .then() and .catch()
doSomething(true)
  .then((workingStatus) => {
      console.log(workingStatus);
      console.log("ending...");
  })
  .catch((errorMessage) => {
      console.log(errorMessage);
  })

// Using Async and Await
async function runWorking() {
    try {
        const workingStatus = await doSomething(true);
        console.log(workingStatus);
        console.log("ending...");
    } catch(error) {
        console.log(error);
    }
}
runWorking();
