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

const set_res = async(res) =>{

    const d_ara = []
    
    let i=0

    // push all basic data into array
    for(i=0;i<res.length;++i){
        doc = {
            doctor_name: res[i].doctor_name,
            specialization: res[i].specialization,
            gender: res[i].gender,
            qualification: [],
            hospital_name: []
        }

        d_ara.push(doc)
    }

    // remove all non unique vaues
    for(i=0;i<d_ara.length;++i){
        let unique_flag = true
        
        let j = i+1
        for(j=i+1;j<d_ara.length;++j){
            if(JSON.stringify(d_ara[i])===JSON.stringify(d_ara[j])){
                d_ara.splice(j, 1)
            }
        }

    }

    // add qualification to unique values
    for(i=0;i<d_ara.length;++i){
        for(j=i;j<res.length;++j){
            if(d_ara[i].doctor_name === res[j].doctor_name &&
            d_ara[i].specialization === res[j].specialization &&
            d_ara[i].gender === res[j].gender){

                if(d_ara[i].qualification.length === 0){
                    d_ara[i].qualification.push(res[j].qualification)
                }else{
                    let k = 0
                    for(k=0;k<d_ara[i].qualification.length;++k){
                        if(d_ara[i].qualification[k] !== res[j].qualification){
                            d_ara[i].qualification.push(res[j].qualification)
                        }
                    }

                }
                
            }
        }
    }


    // add hospital_name to unique values
    for(i=0;i<d_ara.length;++i){
        for(j=i;j<res.length;++j){
            if(d_ara[i].doctor_name === res[j].doctor_name &&
            d_ara[i].specialization === res[j].specialization &&
            d_ara[i].gender === res[j].gender){

                if(d_ara[i].hospital_name.length === 0){
                    d_ara[i].hospital_name.push(res[j].hospital_name)
                }else{
                    let k = 0
                    for(k=0;k<d_ara[i].hospital_name.length;++k){
                        if(d_ara[i].hospital_name[k] !== res[j].hospital_name){
                            d_ara[i].hospital_name.push(res[j].hospital_name)
                        }
                    }

                }
                
            }
        }
    }

    return d_ara
}

exports.set_input = set_input
exports.set_res = set_res