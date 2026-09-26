import { AuthContext } from '@/app/context/AuthContext';
import { NotesContext } from '@/app/context/NotesContext';
import React, { use, useContext, useEffect, useState } from 'react'

export const Notes = ({setWriteNote}) => {
    const fontFamilies = [
        "Arial","Helvetica", "Times New Roman", "Georgia","Courier New", "Verdana","Impact", "Comic Sans MS", "Trebuchet MS", "Arial Black","Palatino","Garamond","Book Antiqua", "Arial Narrow", "Century Gothic", "Lucida Sans Unicode","Lucida Grande", "Copperplate","Brush Script MT", "Futura", "Gill Sans", "Optima", "Baskerville", "Franklin Gothic", "Rockwell", "Candara", "Segoe UI", "Myriad Pro", "Calibri", "Roboto", "Open Sans","Lato", "Montserrat", "Roboto Condensed", "Source Sans Pro", "Pacifico", "Dancing Script","Monospace","Fantasy", "Cursive",
      ];
      const {GetNotes,AddNotes,dispatch} = useContext(NotesContext)
      const { AuthData } = useContext(AuthContext);
    const [text,textVal] = useState({title:'',content:'',tags:[]})
    const [Filters,FilterVal] = useState({bold:"normal",underline:"none", italic:"normal", case:false,FontSize:30,Color:"",font:"normal",align:""})
    // const [tags,setTags] = useState(false)
    const [inputValue, setInputValue] = useState('');

    function textJustify(Talign){
      try {
        FilterVal({...Filters,align:Talign})
      } catch (error) {
        console.log(error);
      }
  }

  function addTags(Tags){
    try {
      let tag = [...text.tags,Tags]
      textVal({...text,tags:tag})
    } catch (error) {
      console.log(error);
    }
}

const body = {...text,Filters}
// console.log(body);

    async function SubmitNotes(AuthData,body) {
      try {
        console.log(text);
        const status = await AddNotes(AuthData,body)
        if(status==200){
          let data = await GetNotes(AuthData);
          dispatch({
            type: "GET_ALL_NOTES",
            payload: data,
          });
          
        }
      } catch (error) {
        console.log(error);
      }
    }

  return (
    <div className="card shadow" style={{ width: "60%", height: "87vh",backgroundColor:"#f6f8fa", border:"none" }}>

<button
        className="btn-close position-absolute"
        style={{ top: "16px", right: "16px", backgroundColor:"white"}}
        onClick={() => setWriteNote(false)}
      ></button>

    <div className='d-flex align-items-center mt-4  ' style={{width:"100%", height:"80px"}}>
        <button className='ms-3' onClick={()=>{
            FilterVal({...Filters,bold:Filters.bold === "bold" ? "normal" : "bold"})
        }}>B</button>
        <button className='ms-3' onClick={()=>{
            FilterVal({...Filters,underline:Filters.underline==="underline"?"none":"underline"})
        }}>U</button>
        <button className='ms-3' onClick={()=>{
            FilterVal({...Filters,italic:Filters.italic==="italic"?"normal":"italic"})
        }}>I</button>

        <select value={text.font} className='ms-3' style={{width:"100px", height:"40px"}} onClick={(e)=>{
            FilterVal({...Filters,font:e.target.value})
        }}>
           {
            fontFamilies.map((e,i)=>{
                return  <option key={i} style={{fontFamily:e}}>{e}</option>
            })
           }
        </select>

        <select  value={text.case} className='ms-3' onChange={(e)=>{
            FilterVal({...Filters,case:e.target.value})
        }}>
            <option value="" disabled defaultValue>select</option>
            <option>uppercase</option>
            <option>lowercase</option>
            <option>capitalize</option>

        </select>
           
          <div className='bg-light d-flex flex-column  align-items-center mb-3 ms-3' style={{width:"250px", height:"40px"}} >
          <input  type="range" min={"12"} max={"100"} value={Filters.FontSize} onChange={(u)=>{
            FilterVal({...Filters,FontSize:u.target.value})
        }}/>
          <p>{Filters.FontSize}</p>
          </div>
           <input value={text.Color} type="color" className='ms-3' onChange={(e)=>{
              FilterVal({...Filters,Color:e.target.value})
           }}
           />

           <button className='ms-3'  style={{width:"35px", height:"30px"}} ><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-justify" viewBox="0 0 16 16" onClick={()=>{
            textJustify("justify")
           }}>
 
         <path fillRule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"/>
         </svg></button>

         <button className='ms-3'  style={{width:"35px", height:"30px"}} ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-text-center" viewBox="0 0 16 16"  onClick={()=>{
            textJustify("center")
           }}>
      <path fillRule="evenodd" d="M4 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"/>
      </svg></button>

     <button className='ms-3'  style={{width:"35px", height:"30px"}} ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-text-left" viewBox="0 0 16 16"  onClick={()=>{
            textJustify("left")
           }}>
     <path fillRule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"/>
      </svg></button>
        
        <button className='ms-3'  style={{width:"35px", height:"30px"}} ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-text-right" viewBox="0 0 16 16"  onClick={()=>{
            textJustify("right")
           }}>
      <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m4-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"/>
    </svg></button>
      
    </div>

  <div 
    className=' d-flex flex-column align-items-center' 
    style={{ height: "500px", width: "100%" }}
  >

    <input value={text.title} type="text" className='p-4' placeholder='Title' name="" id="" style={{width:"100%",height:"40px"}} onChange={(e)=>{
      textVal(prev=>({...prev,title:e.target.value}))
    }}/>

    <textarea 
      value={text.content}
      className=' '
      placeholder='Content' 
      style={{
        width: "100%", 
        height: "100%", 
        resize: "none", // Prevent resizing
        padding: "10px", 
        boxSizing: "border-box", // Ensures padding doesn't affect dimensions
        border: "1px solid #ccc",
        fontSize:parseInt(Filters.FontSize),fontWeight:`${Filters.bold}`,
        textDecorationLine:`${Filters.underline}`,fontStyle:`${Filters.italic}`,color:`${Filters.Color}`,textTransform:`${Filters.case}`,fontFamily:Filters.font,textAlign:Filters.align,borderBottom:"none"

      }} 
      onChange={(ele) => {
        textVal(prev=>({...prev,content:ele.target.value}));
      }}
    />
   
   <div style={{width:"100%",height:"40px"}}>
   <input value={inputValue} type="text" className='p-4' placeholder='Tags' style={{width:"50%",height:"40px"}} onChange={(e)=>{
      // setTags([...tags,e.target.value])
      setInputValue(e.target.value)
    }}/>

    <button className='b' style={{width:"50%",height:"50px"}}
    onClick={(e)=>{
      addTags(inputValue)
      setInputValue('')
      // console.log(inputValue);
      
    }}
    >Add Tags</button>
   </div>

  </div>

{/* </div> */}
 <div className='mt-3' style={{display:"flex" ,justifyContent:"flex-end",width:"100%"}}>
 <button className='btn btn-outline-primary me-4' onClick={()=>{
    SubmitNotes(AuthData,body)
    // setTags(tags==false?true:false)
    setWriteNote(false)
 }}>Save</button>
 </div>
    
    </div>
    
  )
}
