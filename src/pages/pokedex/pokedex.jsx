import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './pokedex.css';
import { PokemonTitle } from './pokemonTitle/pokemonTitle.jsx';
import { PokemonEntry } from './pokemonEntry/pokemonEntry.jsx';

export const Pokedex = () => {
    const [pokemonListData, setPokemonListData] = useState([]);
    const [clickedPokemon, setClickedPokemon] = useState({})

    useEffect(() => 
    {
        async function getPokemonList() {
            const res = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=151")
            .then(
                function (response) 
                {
                    setPokemonListData(response.data.results)
                }
            )
            .catch(
                function (error) 
                {
                    console.log("Fetching data from API...")
                    return Promise.reject(error)
                }
            )

            const resFirstData = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=1")
            .then(
                function (response) 
                {
                    setClickedPokemon({name: response.data.results[0].name, data: response.data.results[0], border:true})
                }
            )
            .catch(
                function (error) 
                {
                    console.log("Fetching data from API...")
                    return Promise.reject(error)
                }
            )
        };

        getPokemonList();

    }, [])

    function setBorderForSelectedPokemon(pokemon) 
    {
        try 
        {
            if (clickedPokemon.name === pokemon.name) 
            {
                return true
            }
        }
        catch (e) 
        {
            return false;
        }
    }

    return (
        <div className='pokedex'>
            <div className='pokemonInfo' style={{minWidth: "60%"}} >
                <div className='entry'>
                    <PokemonEntry key={clickedPokemon.name} pokemon={clickedPokemon}>
                    </PokemonEntry>
                </div>
            </div>
            <div className='pokemonList'>
                {pokemonListData? pokemonListData.map((pokemon, id) => 
                    {
                        return (
                            <div className='title' onClick={()=>setClickedPokemon({name: pokemon.name, data: pokemon, border: true})} style= {{borderStyle: setBorderForSelectedPokemon(pokemon)? 'solid' : 'none' }}>
                                <PokemonTitle key={id} listId={id += 1} data={pokemon}>
                                </PokemonTitle>
                            </div>
                        )
                    }) :
                    console.log("Failed to load pokemon data...")
                }
            </div>
        </div>
    )
}
