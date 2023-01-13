import axios from "axios"

const FetchTodos = async () => {
    return new Promise((resolve, reject) => {
        axios.get(
            "https://jsonplaceholder.typicode.com/todos?_limit=20"
        ).then(response => {
            resolve(response);
        }).catch(err => {
            reject(err);
        })
    })
}
export default FetchTodos;