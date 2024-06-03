import axios from "axios"

export const Notio= import.meta.env.VITE_NOTIO


export const getnotes =()=>{
 return axios.get(Notio).then(res=>{
   return res.data
 })
}

export const addnote = (note)=>{
  return axios.post(Notio,{
    title:note.title.value,
    content:note.content.value
    }).then(res=>{
    return res.data
  })
}
export const editnote = (id, note)=>{
  return axios.put(Notio+id,{
    title:note.title.value,
    content:note.content.value
    }).then(res=>{
    return res.data
  })
}


export const notedetail =(id)=>{
  return axios.get(Notio+id).then(res=>{
    return res.data
  })
}
export const deletenote = (id)=>{
  return axios.delete(Notio+id).then(res=>{
    return res.data
  })
}