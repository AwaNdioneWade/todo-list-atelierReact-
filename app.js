// function Welcom(props) {
//     return <h1>Bonjour {props.prenom} {props.name}</h1>;
// }
// ReactDOM.render(<Welcom name="Wade" prenom="Awa Ndione"/>, document.getElementById('root'))

// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'jquery/dist/jquery.min.js';
// import 'bootstrap/dist/js/bootstrap.min.js';



class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {todo: '', todoList: []}
    }

    addTodo = (e) => {
        e.preventDefault()
            
        const newTodo = {
            id: Math.floor(Math.random() * 1000),
            value: this.state.todo
        }
        this.setState(prev => ({ todoList:[...prev.todoList, newTodo]}))
        this.setState({todo: ''})
    }

    deleteTodo = (todoId) => {
        const newTodos = this.state.todoList.filter(todo => todo.id !== todoId)
        this.setState({todoList: newTodos})
      }

    render(){
    
        return(
        
    <div className="mx-auto w-50 py-5">
    <h1 className="mt-4 text-center">Todo list</h1>
    <form onSubmit={this.addTodo}>
      <div className="mb-5">
        <label className="form-label">Entrez votre tache</label>
        <input type="text" className="form-control" value={this.state.todo}  onChange={(e) => {this.setState({todo: e.target.value})}}/>
      </div>
      <button type="submit" className="w-100 btn btn-success">Submit</button>
    </form>
    <h1 className="mt-4 text-center">LIste Tache</h1>
    <ul>
        {
            this.state.todoList.length > 0 &&
            this.state.todoList.map((todo) => (
                <div key={todo.id} className='d-flex justify-content-between mt-3'>
                    <li>
                        {todo.value}
                    </li>
                    <button className="btn-primary" >edit</button>
                    <button className="btn-danger" onClick={() => this.deleteTodo(todo.id)}>delete</button>      
                </div>
            ))
        }      
        {/* <span className='text-danger p-0'>Pas encore de tache</span> */}
    </ul>
  </div>
        )
    }
}
ReactDOM.render(<App />, document.getElementById('root'))
