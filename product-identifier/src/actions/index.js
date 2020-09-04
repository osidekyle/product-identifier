export const addImage=(image)=>{
    return{
        type:"ADD_IMAGE",
        payload:image
    }

}

export const selectImage=(image)=>{
    return{
        type:"SELECT",
        payload:image
    }
}


export const remove=(index)=>{
    return{
        type:"REMOVE",
        payload:index
    }
}
export const clear=()=>{
    return{
        type:"CLEAR"
    }
}