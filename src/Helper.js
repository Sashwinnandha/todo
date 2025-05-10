export const months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export const getFullMonth=(index)=>{
    return months[index];
}


export const createDate=(date)=>{
    const month=getFullMonth(date.getMonth());
    return date.getDate()+"-"+month+"-"+date.getFullYear();
}

export const createDateFilter=(date)=>{
    const month=getFullMonth(parseInt(date.split("-")[1]-1));
    return date.split("-")[2]+"-"+month+"-"+date.split("-")[0];
}