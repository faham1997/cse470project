// import react
import React from 'react'

// import local css file
import './SearchList.css'

// import local modules
import ListItem from './ListItem/ListItem'

const SearchList = ({objList}) =>{
    const SearchCollection = objList.map( (obj) =>{
        return(
            <ListItem obj={obj}/>
        )
    })

    return(
        <table>
            <tr>
                <th>Doctor Name</th>
                <th>Specialization</th>
                <th>Gender</th>
                <th>Qualifications</th>
                <th>Hospitals</th>
            </tr>           
            {SearchCollection}
        </table>
    )
}

export default SearchList