export function validate (simNumber:string,serviceNumber:string):boolean{
    if(simNumber.length!=12){
        return false   
    }
    else if(serviceNumber.length!=10){
        return false
    }
    else{
        return true
    }
}
export function validateemail(email:string):boolean{
    const emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}
export function validatename(first_name:string):boolean{
    const pattern:RegExp =/^[a-zA-Z]{1,15}$/
    return (pattern.test(first_name))
}
export function validateAddress(address:string):boolean{
    if(address.length<=25){
        return true
    }
    else{
        return false
    }
}

export function validatePin(pin:string):boolean{
    const pattern:RegExp=/^[0-9]{1,6}$/
    return pattern.test(pin)
}
export function validateNumber(pin:string):boolean{
    const pattern:RegExp=/^[0-9]{10}$/
    return pattern.test(pin)
}

export function validateCityState(city:string,state:string):boolean{
    const pattern:RegExp=/^[a-zA-Z0-9 ]*$/
    return (pattern.test(city) && pattern.test(state))
}

export function validateAadhar(aadhar_number:string):boolean{
    const pattern:RegExp=/^[0-9]{1,12}$/
    return pattern.test(aadhar_number)
}

export function validateNameDob(first_name:string,last_name:string,date_of_birth:string):boolean{
    const namePattern:RegExp=/^[a-zA-Z]{1,15}$/
    const dobpattern:RegExp=/[1-9][0-9][0-9]{2}-([0][1-9]|[1][0-2])-([1-2][0-9]|[0][1-9]|[3][0-1])/
    return (namePattern.test(first_name) && namePattern.test(last_name) && dobpattern.test(date_of_birth))
}