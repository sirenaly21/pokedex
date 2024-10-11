import React, {useState, useEffect} from 'react'
import ReactLoading from 'react-loading';
import axios from 'axios'
import './generaText.css'

export const GeneraText = ({data}) => {
  const [generaTextList, setGeneraTextList] = useState({})

  useEffect(() => 
  {
    async function getGeneraTextList() 
    {
        try 
        {
          const res = await axios.get(data.species["url"])
          .then(
            function(response) 
            {
              setGeneraTextList(response.data.genera)
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

    getGeneraTextList()

  }, [data])

  // Finds the first genera description that is in English
  function findEnglishGeneraText() 
  {
    try 
    {
        for(var i = 0; i < generaTextList.length; i++) 
            {
                if(generaTextList[i].language.name === "en") 
                {
                    return generaTextList[i].genus;
                }
            }
    }
    catch (e) 
    {
        return(<ReactLoading height={'20%'} width={'20%'} />)
    }

  }

  return (
    <div className='generaContainer'> 
        {findEnglishGeneraText()}
    </div>
  )
}
