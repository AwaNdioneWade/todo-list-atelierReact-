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
        this.state = {tache: '', listeTache: []}
    }

    addTache = (e) => {
        e.preventDefault()
            
        const newTache = {
            id: Math.floor(Math.random() * 1000),
            value: this.state.tache,
            isEditing: false
        }
        this.setState(prev => ({ listeTache:[...prev.listeTache, newTache]}))
        this.setState({tache: ''})
    }

    deleteTache = (TacheId) => {
        const newListeTache = this.state.listeTache.filter(tache => tache.id !== TacheId)
        this.setState({listeTache: newListeTache})
    }

    editTache = (TacheId, newValue) => {
        this.setState(prev => ({
            listeTache: prev.listeTache.map(tache =>
                tache.id === TacheId ? { ...tache, value: newValue } : tache
            )
        }));
    }
    
    toggleEditing = (TacheId) => {
        this.setState(prev => ({
            listeTache: prev.listeTache.map(tache =>
                tache.id === TacheId ? { ...tache, isEditing: !tache.isEditing } : tache
            )
        }));
    }


    render(){
    
        return(
        
    <div className="container mx-auto w-50 py-5">
    <h1 className="mt-4 text-center">Todo list</h1>
    <form onSubmit={this.addTache}>
      <div className="mb-5">
        <label className="form-label">Entrez votre tache</label>
        <input type="text" className="form-control" value={this.state.tache} onChange={(e) => {this.setState({tache: e.target.value})}}/>
      </div>
      <button type="submit" className="w-100 btn btn-success">Submit</button>
    </form>
    
    <h1 className="mt-4 text-center">Liste Tache</h1>
    <ul>
        {
            this.state.listeTache.length > 0 &&
            
            this.state.listeTache.map((tache) => (
                <div key={tache.id} className='d-flex justify-content-between mt-3'>
                    {tache.isEditing ? (
                        <input type="text" value={tache.value} onChange={(e) => this.editTache(tache.id, e.target.value)} />
                    ) : (
                        <li>{tache.value}</li>
                    )}
                    <button className="btn btn-warning text-light" onClick={() => this.toggleEditing(tache.id)}>
                        {tache.isEditing ? 'Save' : 'Edit'}
                    </button>
                    <button className="btn btn-danger" onClick={() => this.deleteTache(tache.id)}>Delete</button>
                </div>
            ))
        }
    </ul>
    </div>
        )
    }
}
ReactDOM.render(<App />, document.getElementById('root'))
