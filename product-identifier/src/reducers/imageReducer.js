export const imageReducer=(state= [],action)=>{
    switch(action.type){
        case "ADD_IMAGE":
            return state.concat([{source:action.payload,selected:false}])
        case "SELECT":
            state.forEach((image)=>{
                if(image.source==action.payload){
                    image.selected=!image.selected
                    
                }
            })
            console.log(state)
            let newState=state.slice()
            return newState
        default:
            return state;
    }
}

export default imageReducer;