// import react
import React from 'react'

// import local css file
import './SearchList.css'

// import local modules
import ListItem from './ListItem/ListItem'

const SearchList = ({objList}) =>{
    const SearchCollection = objList.map( (obj, i) =>{
        return(
            <ListItem key = {i} obj={obj}/>
        )
    })

    return(
        <table>
            <tbody>
                <tr>
                    <th>Hospital Name</th>
                    <th>Hospital Type</th>
                    <th>Location</th>
                    <th>Phone No.</th>
                    <th>Website</th>
                    <th> Available Doctors</th>
                </tr>           
                {SearchCollection}
            </tbody>
        </table>
    )
}

export default SearchList