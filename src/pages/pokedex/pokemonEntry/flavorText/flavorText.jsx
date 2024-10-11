import React, {useState, useEffect} from 'react'
import ReactLoading from 'react-loading';
import axios from 'axios'
import './flavorText.css'

export const FlavorText = ({data}) => {
  const [flavorText, setFlavorText] = useState([])

  useEffect(() => 
  {
    async function getFlavorText() 
    {
      try 
      {
        const res = await axios.get(data.species["url"])
        .then(
          function(response) 
          {
            setFlavorText(response.data.flavor_text_entries)
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

    getFlavorText()
  }, [data])

  // Finds the first flavor text that is in English
  function getFlavorText() 
  {
      var description = "";
      for(var i = 0; i < flavorText.length; i++)
      {
          if (flavorText[i].language.name === "en") 
          {
              description = flavorText[i].flavor_text.replace('\n', ' ');
              description = description.replace('\f', '\n');

              return (description);
          }
      }
  } 

  return (
    <div className = "flavorText">
      {getFlavorText()}
    </div>
  )
}
