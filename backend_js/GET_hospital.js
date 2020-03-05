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

const set_res = async(res) =>{

    const h_ara = []
    
    let i=0

    // push all basic data into array
    for(i=0;i<res.length;++i){
        hos = {
            hospital_name: res[i].hospital_name,
            hospital_type: res[i].hospital_type,
            hospital_location: res[i].hospital_location,
            hospital_phone: res[i].hospital_phone,
            hospital_website: res[i].hospital_website,
            doctor_name: []
        }

        h_ara.push(hos)
    }

    // remove all non unique vaues
    for(i=0;i<h_ara.length;++i){
        let unique_flag = true
        
        let j = i+1
        for(j=i+1;j<h_ara.length;++j){
            if(JSON.stringify(h_ara[i])===JSON.stringify(h_ara[j])){
                h_ara.splice(j, 1)
            }
        }

    }

    // add doctor_name to unique values
    for(i=0;i<h_ara.length;++i){
        for(j=i;j<res.length;++j){
            if(h_ara[i].hospital_name === res[j].hospital_name &&
            h_ara[i].hospital_type === res[j].hospital_type &&
            h_ara[i].hospital_location === res[j].hospital_location &&
            h_ara[i].hospital_phone === res[j].hospital_phone &&
            h_ara[i].hospital_website === res[j].hospital_website){

                if(h_ara[i].doctor_name.length === 0){
                    h_ara[i].doctor_name.push(res[j].doctor_name)
                }else{
                    let k = 0
                    for(k=0;k<h_ara[i].doctor_name.length;++k){
                        if(h_ara[i].doctor_name[k] !== res[j].doctor_name){
                            h_ara[i].doctor_name.push(res[j].doctor_name)
                        }
                    }

                }
                
            }
        }
    }

    return h_ara
}

exports.set_input = set_input
exports.set_res = set_res