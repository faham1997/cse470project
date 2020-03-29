// knex db
const pg = require('./pg_knex')

// truncate table doctor, doctor_hospital, hospital, education, doctor_education, appointment, all_appointment, users, user_apt

// get random number upto limit -1
const getRan = (limit) =>{
    return Math.floor(Math.random() *limit)
}

// create doctor data
const doctor = () =>{
    const fName = ['Reza', 'Khurshed', "Ashraf",'Labiba', 'Lucky']
    const lName = ['Haque', "Ahmed", 'Khan', 'Hossain', 'Islam']
    const gender = ['m', 'f']
    const special = ['Medicine', "Dermatologist", "Orthopedist", "Psychiatrist", "General"]
    
    const selectedName = fName[getRan(fName.length)] + " " + lName[getRan(fName.length)]
    const selectedSpecial = special[getRan(special.length)]
    const selectedGender = gender[getRan(2)]
    const id = selectedName[getRan(selectedName.length)] + selectedName[getRan(selectedName.length)] + selectedSpecial[getRan(selectedSpecial.length)] + selectedSpecial[getRan(selectedSpecial.length)]

    const doctor = {
        doctor_id: id,
        doctor_name: selectedName,
        specialization: selectedSpecial,
        gender: selectedGender
    }
    
    pg('doctor').insert(doctor).then(console.log)
}


for(i=0;i<10;++i){
    doctor();
}