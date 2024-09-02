import React, {useState, useEffect} from "react";
import './ToDoList.css';
import Icone from './assets/list.png'

function ToDoList(){

    const listaStorage = localStorage.getItem('Lista');

    const [lista, setLista] = useState(listaStorage ? JSON.parse(listaStorage) : [] );
    const [novoItem, setNovoItem] = useState("");
    
    useEffect(() => {
        localStorage.setItem('Lista', JSON.stringify(lista))
    }, [lista])

    function adicionarItem (form) {
        form.preventDefault();

        if (!novoItem) {
            return
        }
        setLista([...lista, {text: novoItem, isCompleted: false}])
        setNovoItem("");
        document.getElementById("input-entrada").focus()
    }

    function itemCompleto (index) {
        const listaAuxiliar = [...lista];
        listaAuxiliar[index].isCompleted = !listaAuxiliar[index].isCompleted;
        setLista(listaAuxiliar);
    }

    function deltarItem(index) {
        const listaAuxiliar = [...lista];
        listaAuxiliar.splice(index, 1);
        setLista(listaAuxiliar);
    }

    function deletarTodos () {
        setLista([]);
    }

    return (
        <div>
            <h1>Lista de Tarefas</h1>
            <form onSubmit={adicionarItem}>
                <input id="input-entrada" type="text" value={novoItem} onChange={(event) => {setNovoItem(event.target.value)}} placeholder="Adicione uma tarefa"/>
                <button className="add" type="submit">Add</button>

            </form>
            <div className="listaTarefas">
                <div style={{textAlign: 'center'}}>
                {
                    lista.length < 1 
                    ? 
                    <img className="icone-lista" src={Icone}/>
                    :
                    lista.map((item, index) => (
                        
                <div key={index} className={item.isCompleted ? 'item completo' : 'item'}>
                    <span onClick={() =>{itemCompleto(index)}}>{item.text}</span>
                    <button  onClick={() =>{deltarItem(index)}} className="del">Deletar</button>
                </div>
                    ))
                }{
                    lista.length > 0 && <button onClick={() => {deletarTodos()}} className="deleteAll">Deletar todos</button>
                }
                </div>
            </div>
        </div>
    )
}

export default ToDoList