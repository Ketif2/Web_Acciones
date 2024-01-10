const StockDelete = ({id})=>{
    console.log(id);
    const handleDelete = () =>{
        const confirmation = window.confirm("¿Estás seguro de eliminar esta acción?");
        if(confirmation){
            fetch(`http://localhost:3000/actions/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(()=>{
                window.location.reload();
            })
        }
    };
    return(
        <button onClick={handleDelete}>
            Eliminar
        </button>
    )
}
export default StockDelete;