import React, {useState, useEffect} from 'react'
import ReactLoading from 'react-loading'
import './guesser.css'
import axios from 'axios'

export const Guesser = () => {
  const [randomPokemon, setRandomPokemon] = useState({})
  const [pokemonNames, setPokemonNames] = useState([])
  const [correct, setCorrect] = useState(false)
  const [guess, setGuess] = useState(false)
  const pokemonList = []

  useEffect(() => 
  {
    async function getPokemon() {
        // Get all pokemon list names to set as potential answers
        try 
        {
          const res = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=151")
          .then(
            function (response) 
            {
              response.data.results.map((pokemon) => pokemonList.push(pokemon.name))
              setPokemonNames(pokemonList)
            }
          )
          .catch
          (
            function(error) 
            {
              console.log("Fetching data from API..." + error)
              return(<ReactLoading height={'20%'} width={'20%'} />)
            }
          )
        }        
        catch(e) 
        {
          console.log("API still fetching data..." + e)
        }

        const randomNumber = Math.floor(Math.random() * 151).toString()
        try 
        {
          const res = await axios.get("https://pokeapi.co/api/v2/pokemon/" + randomNumber)
          .then(
            function(response) 
            {
              setRandomPokemon(response.data)
            }
          )
          .catch(
            function (error) 
            {
                console.log("Fetching data from API..." + error)
                return(<ReactLoading height={'20%'} width={'20%'} />)
            }
          )
        }
        catch(e) 
        {
          console.log("API still fetching data..." + e)
        }

      };

      getPokemon();

    }, [])

  function blackoutSilhouette() 
  {
    try
    {
      if (correct) 
      {
        return(<img className='correctImage' src={randomPokemon.sprites['front_default']}/>)
      }
      else 
      {
        return(<img className='blackoutImage' src={randomPokemon.sprites['front_default']}/>)
      }
    }
    catch (e) 
    {
      return(<ReactLoading height={'20%'} width={'20%'} />)
    }
  }

  function getAnswers() 
  {
    const answers = []

    for (var i = 0; i < 3; i++) 
    {
      const randomNumber = Math.floor(Math.random() * 151).toString()
      if (pokemonNames[randomNumber] !== randomPokemon.name) 
      {
        answers.push(pokemonNames[randomNumber])
      }
    }

    answers.push(randomPokemon.name)
    return answers
  }

  function verifyAnswer(answer) 
  {
    if (answer == randomPokemon.name) 
    {
      setCorrect(true)
    }
    else 
    {
      setCorrect(false)
    }

    setGuess(true)
  }

  return (
    <div className='guesserContainer'>
      <div className='randomPokemonContainer'>
        <div className='silhouette'>
          {blackoutSilhouette()}
        </div>
      </div>
      <div className='answerChoices'>
        {
          getAnswers().map((answer) => 
            {
              return(
              <button className="answer" disabled = {guess} onClick = {() => verifyAnswer(answer)}>
                {answer}
              </button>)
            }
          )
        }
      </div>
    </div>
  )
}
