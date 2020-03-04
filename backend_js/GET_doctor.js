const set_input =  async(name, special, gender) =>{

    let s_terms = {}
    
    if(name === "null" && special === "null" && gender === "null"){
      s_terms = {}

    }else if(name === "null" && special === "null" && gender !== "null"){
        
        s_terms = {
            gender: gender
        }

    }else if(name === "null" && special !== "null" && gender === "null"){
      
        s_terms = {
            specialization: special
        }
      
    }else if(name !== "null" && special === "null" && gender === "null"){
      
        s_terms = {
            doctor_name: name
        }

    }else if(name === "null" && special !== "null" && gender !== "null"){
      
        s_terms = {
            specialization: special,
            gender: gender
        }

    }else if(name !== "null" && special !== "null" && gender === "null"){
      
        s_terms = {
            doctor_name: name,
            specialization: special
        }

    }else if(name !== "null" && special === "null" && gender !== "null"){
        
        s_terms = {
            doctor_name: name,
            gender: gender
        }

    }else if(name !== "null" && special !== "null" && gender !== "null"){
        
        s_terms = {
            doctor_name: name,
            specialization: special,
            gender: gender
        }

    }

    return s_terms
}

exports.set_input = set_input