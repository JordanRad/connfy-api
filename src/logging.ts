const infoLog =  (message:string)=>{
    const time = new Date().toTimeString().split(" ")[0]
    const head = `[${time}][INFO] `
    console.log(head + message)
}
const errorLog = (message:string)=>{
    const time = new Date().toTimeString().split(" ")[0]
    const head = `[${time}][ERROR] `
    console.log(head + message)
}
export {infoLog,errorLog};