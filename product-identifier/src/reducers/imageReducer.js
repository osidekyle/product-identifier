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
            let newState=state.slice()
            return newState
        case "REMOVE":
            state.splice(action.payload,1);
            console.log(state)
            let otherState=state.slice()
            return otherState;
        case "CLEAR":
            state=[];
            let empty=state.slice()
            return empty
        default:
            return state;
    }
}

export default imageReducer;