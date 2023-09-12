const validateDetails = (details) => {
    const curErrors = {
        occupation: "",
        gender: "",
        age: "",
        experience: "",
        industry: "",
        primaryGoal: "",
        secondaryGoal: "",
    };
    if(details.occupation === ""){
        curErrors.occupation = "Please specify your occupation!";
    }
    if (details.gender === "") {
      curErrors.gender = "Gender is required!";
    } 
    if (details.age === "") {
      curErrors.age = "Age is required!";
    }
    else if(isNaN(details.age)){
        curErrors.age = "Age must be a number";
    }
    else if(parseInt(details.age) < 0){
        curErrors.age = "Invalid age entered"
    }
    if (details.industry === "") {
        curErrors.industry = "The current industry you're working in is required!";
    }
    if (details.primaryGoal === "") {
        curErrors.primaryGoal = "Primary goal is required!";
    }
    if (details.secondaryGoal === "") {
        curErrors.secondaryGoal = "Secondary goal is required!";
    }
    else if(details.primaryGoal === details.secondaryGoal){
        curErrors.secondaryGoal = "Your secondary goal must be different to your primary goal!";
    }
    
    if(details.experience === ""){
        curErrors.experience = "Please specify your years of experience in this role!"
    }
    else if(isNaN(details.experience)){
        curErrors.experience = "Years of experience must be a number";
    }
    else if(parseInt(details.experience) < 0){
        curErrors.experience = "Invalid years of experience entered"
    }

    else if(parseInt(details.experience) > parseInt(details.age)){
        curErrors.experience = "Invalid years of experience entered"
    }
    return curErrors;
  };
  
  export default validateDetails;