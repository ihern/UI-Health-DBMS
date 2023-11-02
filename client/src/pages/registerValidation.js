function Validation(values) {
    // alert("")
    let error = {}

    if (values.name === "") {
        error.name = "Name should not be empty."
    } else {
        error.name = ""
    }

    if (values.ssn === "") {
        error.ssn = "SSN should not be empty."
    } else {
        error.ssn = ""
    }

    if (values.age === "") {
        error.age = "Age should not be empty."
    } else {
        error.age = ""
    }

    if (values.gender === "") {
        error.gender = "Gender should not be empty."
    } else {
        error.gender = ""
    }

    if (values.race === "") {
        error.race = "Race should not be empty."
    } else {
        error.race = ""
    }

    if (values.occupation === "") {
        error.occupation = "Occupation should not be empty."
    } else {
        error.occupation = ""
    }

    if (values.phone === "") {
        error.phone = "Phone should not be empty."
    } else {
        error.phone = ""
    }

    if (values.address === "") {
        error.address = "Address should not be empty."
    } else {
        error.address = ""
    }
    
    if (values.email === "") {
        error.email = "Email should not be empty."
    } else {
        error.email = ""
    }

    if (values.password === "") {
        error.password = "Password should not be empty."
    } else {
        error.password = ""
    }

    return error;
}

export default Validation;