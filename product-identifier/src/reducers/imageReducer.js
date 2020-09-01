export const imageReducer=(state= [],action)=>{
    switch(action.type){
        case "ADD_IMAGE":
            return state.concat([action.payload])
            
        default:
            return state;
    }
}

export default imageReducer;