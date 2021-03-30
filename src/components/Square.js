const Square = ({ value, onClick, gameIsActive }) => {
  const style = value ? `squares ${value}` : `squares`;
 
  return (
    <button className={style} onClick={onClick} disabled={gameIsActive}>
      {value}
    </button>     
  )
}

export default Square;
