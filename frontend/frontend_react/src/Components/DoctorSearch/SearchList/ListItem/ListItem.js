// import react
import React, {useEffect, useState} from 'react'

// import local css file
import './ListItem.css'

const ListItem = ({obj}) =>{

    const qualificationList = obj.qualification.map( (item, i) =>{
        return(
            <p key = {i}> {item} </p>
        )
    })

    const hospitalNameList = obj.hospital_name.map( (item, i) =>{
        return(
            <p key = {i}> {item} </p>
        )
    })
    
    return(
        <tr>
            <th>{obj.doctor_name}</th>
            <th>{obj.specialization}</th>
            <th>{obj.gender}</th>
            <th>{qualificationList}</th>
            <th>{hospitalNameList}</th>
        </tr>           
    )
}

export default ListItem