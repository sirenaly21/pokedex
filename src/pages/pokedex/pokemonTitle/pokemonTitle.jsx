import React, {useEffect, useState} from 'react';
import ReactLoading from 'react-loading';
import './pokemonTitle.css';
import pokeballImage from "../../../assets/pokeball.png";
import axios from 'axios';

export const PokemonTitle = ({listId, data}) => {
    const [pokemonData, setPokemonData] = useState({})

    useEffect(() => 
    {
        async function getPokemonData() 
        {
            const res = await axios.get(data.url)
            .then(
                function(response) 
                {
                    setPokemonData(response.data)
                }
            )
            .catch(
                function (error) 
                {
                    console.log("Fetching data from API..." + data.name + " " + data.url + " " + error)
                    return(<ReactLoading height={'20%'} width={'20%'} />)
                }
            )
        }

        getPokemonData();
    }, [data])

    function formatTitle() 
    {
        var title = ""

        if ((listId.toString()).length < 3) 
        {
            title = ("0".repeat(3 - listId.toString().length)) + listId
            title = title + " " + data.name[0].toUpperCase() + data.name.slice(1)
        }
        else 
        {
            title = listId  + " " + data.name[0].toUpperCase() + data.name.slice(1)
        }

        return title;
    }

    return (
        <div className='titleContainer'>
            <div className = "pokeball">
                <img src={pokeballImage} alt="image of a pokeball" width="50" height="50" background = "red"/>
            </div>
            <div className='titleName'>{formatTitle()}</div>
        </div>
    )
}
