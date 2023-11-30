class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {tache: '', listeTache: []}
    }
    
    addTache = (e) => {
        e.preventDefault()
        if (this.state.tache !== '') {
            const newTache = {
                id: Math.floor(Math.random() * 1000),
                value: this.state.tache,
                isEditing: false
            }
            this.setState(prev => ({listeTache:[...prev.listeTache, newTache]}))
            this.setState({tache: ''})            
        }else{
            alert("Entrez d`abord une tache")
        }
    }

    handleChange = (e) => {
        this.setState({tache: e.target.value})
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
                <div className="container mx-auto w-50 py-5 bg-dark text-light mt-5">
                    <Form tache={this.state.tache} listeTache={this.state.listeTache} addTache={this.addTache} handleChange={this.handleChange}/>
                    <ul>
                        <Li tache={this.state.tache} listeTache={this.state.listeTache} addTache={this.addTache} deleteTache={this.deleteTache} editTache={this.editTache} toggleEditing={this.toggleEditing}/>
                    </ul>
                </div>
                
            )
    }
}

class Form extends React.Component{    

    render(){    
        return(        
                <div>
                    <h1 className="mt-4 text-center">Liste tache</h1>
                    <form onSubmit={this.props.addTache}>
                    <div className="mb-5">
                        <label className="form-label">Entrez votre tache</label>
                        <input type="text" className="form-control" value={this.props.tache} onChange={this.props.handleChange}/>
                    </div>
                    <button type="submit" className="w-100 btn btn-success">Submit</button>
                    </form>
                </div>
            )
    }
}

class Li extends React.Component{
    render(){
        return (
                        
            this.props.listeTache.length ?
            
            this.props.listeTache.map((tache) => (
                <div key={tache.id} className='row d-flex justify-content-between mt-3'>
                    <div className='col-12 col-md-9'>
                        {tache.isEditing ? (
                            <input type="text" value={tache.value} onChange={(e) => this.props.editTache(tache.id, e.target.value)} />
                        ) : (
                            <li>{tache.value}</li>
                        )}
                    </div>
                    
                    <div className='col-12 col-md-3 d-flex gap-5'>
                        <button className="btn btn-warning text-light" onClick={() => this.props.toggleEditing(tache.id)}>
                            {tache.isEditing ? 'Save' : 'Edit'}
                        </button>
                        <button className="btn btn-danger" onClick={() => this.props.deleteTache(tache.id)}>Delete</button>
                    </div>
                    </div>
            )) 
            : <div className='text-danger mt-5 text-center font-bold'>
                    <span>Pas encore de tache</span>
                </div>
        
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))