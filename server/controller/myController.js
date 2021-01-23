module.exports = {
    getDate : () => {
        let result;
        let date = new Date()
        result = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
        return result
    }
} 

