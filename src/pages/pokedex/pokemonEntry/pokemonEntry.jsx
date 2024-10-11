import React, {useState, useEffect} from 'react'
import ReactLoading from 'react-loading';
import axios from 'axios'
import './pokemonEntry.css'
import { GeneraText } from './generaText/generaText.jsx'
import { FlavorText } from './flavorText/flavorText.jsx';
import typeColorDictionary from "./typesColor.js"

export const PokemonEntry = ({pokemon}) => {
  const [entryData, setEntryData] = useState({})
  useEffect(() => 
  {
    async function getPokemonData() 
    {
      try 
      {
        const res = await axios.get(pokemon.data.url)
        .then(
          function(response) 
          {
            setEntryData(response.data)
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
    }

    getPokemonData();
  }, [pokemon])
  
  // Returns image sprite from API
  function getImageSprite() 
  {
    try 
    {
      return(<img className="pokemonImage" src = {entryData.sprites["front_default"]} alt="sprite of pokemon"/>);
    }
    catch (e) 
    {
      return(<ReactLoading height={'20%'} width={'20%'} />)
    }
  }

  // Formats Pokemon number and name
  function formatTitle() 
  {
    var title = ""
    try 
    {
      if((entryData.order.toString()).length < 3) 
      {
        title = ("0".repeat(3 - entryData.order.toString().length)) + entryData.order
        title = title + " " + entryData.name[0].toUpperCase() + entryData.name.slice(1)
      }
      else 
      {
        title = entryData.order + title + " " + entryData.name[0].toUpperCase() + entryData.name.slice(1)
      }

      return title
    }
    catch (e) 
    {
      return(<ReactLoading height={'20%'} width={'20%'} />)
    }
  }

  function getTypes()
  {
    var types = [];
    var type = "";
    if (entryData.types) 
    {
      for(var i = 0; i < entryData.types.length; i++) 
      {
        type = (entryData.types[i].type['name']).toUpperCase();
        types.push(
          <div 
            className = "type" 
            style = {
                {
                  backgroundColor: (typeColorDictionary[type][0]),
                  boxShadow: "3px 3px" + typeColorDictionary[type][2] + ", -3px -3px" + typeColorDictionary[type][1]
                }
              }
            >

            {type}
          </div>
        );
      }
    }

    return types;
  }

  function getBodyStatistics() 
  {
      var stats = []
      var feet = 0
      var inches = 0
      var pounds = 0

      if (entryData) 
      {
          if (entryData.height > 12) 
          {
              feet = Math.floor(entryData.height / 12)
              inches = entryData.height % 12

              stats.push(<div style={{display: "inline-flex", minWidth: "100%", borderBottom: "dashed", borderColor: "#9cadbd"}}>
                  <div style={{paddingLeft: "10%"}}>HT</div>
                  <div style={{paddingLeft: "50%"}}>{feet}'{inches}''</div>
              </div>
              )
          }
          else 
          {
              stats.push(<div style={{display: "inline-flex", minWidth: "100%", borderBottom: "dashed", borderColor: "#9cadbd"}}>
                  <div style={{paddingLeft: "10%"}}>HT</div>
                  <div style={{paddingLeft: "50%"}}>{entryData.height}''</div>
              </div>
              )
          }

          // Pound to hectogram -> 1pound / 0.220462 hectogram
          pounds = (entryData.weight * 0.220462).toFixed(2)

          stats.push(<div style={{display: "inline-flex", minWidth: "100%", marginTop: "10px"}}>
              <div style={{paddingLeft: "10%"}}>WT</div>
              <div style={{paddingLeft: "50%"}}>{pounds} lbs</div>
          </div>
          )
      }

      return stats;
  }

  return (
    <div className='infoContainer'>
      <div className='infoHeader'>
        <div className='headerText'>
          <p style = {{minWidth: "100%", fontSize: "40px"}}>
            INFO
          </p>
        </div>
      </div>
      <div className="entryContainer">
        <div className="pokemonContainer"> 
          <div className='imageCol'>
            {getImageSprite()}
          </div>
          <div className='infoCol'>
            <div className = "pokemonTitleContainer">
              <div className='pokemonName'>
                {formatTitle()}
              </div>
              <GeneraText data={entryData}></GeneraText>
            </div>
            <div className = "typesRow">
              <div className = "typeContainer"> 
                {getTypes()}
              </div>
            </div>
            <div className = "bodyStatsContainer">
              <div className = "bodyStats"> 
                {getBodyStatistics()}
              </div>
            </div>
          </div>
        </div>
        <div className = "flavorTextRow">
            <FlavorText data={entryData}></FlavorText>
        </div>
      </div>
    </div>
  )
}
