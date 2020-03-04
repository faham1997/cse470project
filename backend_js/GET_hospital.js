const set_input = async (name, type) => {

    let s_terms = {}

    if(name === "null" && type ==="null"){
        
        s_terms = {}

    }else if(name !=="null" && type ==="null"){

        s_terms = {
            hospital_name : name
        }

    }else if(name ==="null" && type !=="null"){

        s_terms = {
            hospital_type : type
        }
        
    }else if(name !=="null" && type !=="null"){

        s_terms = {
            hospital_name : name,
            hospital_type: type
        }
        
    }

    return s_terms
    
}

exports.set_input = set_input