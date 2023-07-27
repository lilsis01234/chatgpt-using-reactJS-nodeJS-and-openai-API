import './bot.css';
import { useEffect,useState } from 'react';

const Body=()=> {
  
  const[input,setInput]= useState(null);

  const[message,setMessage]= useState(null);
  
  const[historique, setHistorique] = useState([]);

  const[titre, setTitre] = useState(null);

  const nouvelleConvo = ()=>{
    setMessage(null)
    setInput('')
    setTitre(null)
  }
  
  const handleClick = (titree)=>{
    setTitre(titree)
    setMessage(null)
    setInput('')
  }

  const getMessage = async () =>{
    const options={
      method:"POST",
      body:JSON.stringify({
        message:input
      }),
      headers:{
        "Content-type":"application/json"
      }
    }
     try{
      const response = await fetch('http://localhost:8000/completion',options)
      const data= await response.json()
      setMessage(data.choices[0].message)
    }
     catch(error){
      console.error(error);
     }
  }

  useEffect(()=>{
    console.log(titre, input, message)
    if(!titre && input && message){
      setTitre(input)
    }
    if(titre && input && message){
      setHistorique(historique => (
        [...historique,{
           title: titre,
           role:"user",
           content:input
         },{
           title:titre,
           role:message.role,
           content:message.content
         }]))
    }
  }, [message,titre])


  const discuactu = historique.filter(historique=>historique.title===titre)
  const titretsymverina = Array.from(new Set(historique.map(histo=>histo.title)))


    return (
      <div className="bot">

       <section className="sidebar">
        <button onClick={nouvelleConvo}><h3>+ New chat</h3></button>

        <ul className='historique'>
          <li><h4>Historique</h4></li>
          {titretsymverina?.map((titree,index)=><li key={index} onClick={()=>handleClick(titree)}>{titree}</li>)}
        </ul>

      <nav>
       <h4>Made by Fab</h4>
      </nav>

       </section>

       <section className="main">
       <h1>FabGPT</h1>
       {!titre && <h3>Nouvelle conversation</h3>}

        <ul className='convo'>
         {discuactu?.map((discu,index)=>
           <li key={index}>
             <p className='role'>{discu.role}</p>
             <p>{discu.content}</p>
           </li>
         )}
        </ul>

        <div className='pied'>
          <div className='entree'>
            <input value={input} onChange={(e)=>setInput(e.target.value)}/>
            <div id='submit' onClick={getMessage}>Send</div>
          </div>

          <p className='botinfo'>
             FabGPT just has been built by a pretty needy messy girl who coded to be happy and to see that at least she achieved something in her life
          </p>
        </div>
        
       </section>

      </div>
    );
  }
  
  export default Body;