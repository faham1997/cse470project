// import react
import React, {useEffect, useState} from 'react'

// import local css file
import './ListItem.css'

const ListItem = ({obj}) =>{

    const nameList = obj.doctor_name.map( (item, i) =>{
        return(
            <p key = {i}> {item} </p>
        )
    })

    
    return(
        <tr>
            <th>{obj.hospital_name}</th>
            <th>{obj.hospital_type}</th>
            <th>{obj.hospital_location}</th>
            <th>{obj.hospital_phone}</th>
            <th>{obj.hospital_phone}</th>
            <th>{nameList}</th>
        </tr>           
    )
}

export default ListItem