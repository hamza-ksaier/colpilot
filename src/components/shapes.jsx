import { TETROMINOS } from '../tetrominos';
const player1 = [];
const tableShape =[];
for (let i=0; i<5; i++){
    tableShape.push([])
    for (let j=0; j<5; j++) {
        tableShape[i].push(["clear"])
    }
}
let tetro = TETROMINOS.map(tetro => tetro.shape);
tetro.map (tet => {
    console.log(tet)
    for (let i = 0; i < tet.length; i++) {
        for (let j = 0; j < tet[i].length; j++) {
        if (tet[i][j] !== 0){
            tableShape[i][j][0]= "colored"
        }
        }
    }
    player1.push("zsgzse")
})
 
    
    console.log(player1)

    

const Shapes = () => {

    return (
        <>
            <div className="player1" >
                <div className="title">

                </div>
                <div className="tetrominos"
                    style={{
                        display: "grid",
                        gridTemplateColumns: `repeat(5, 30px)`,
                        justifyContent: "center",
                        marginTop: "100px"
                    }}
                >
                    {tableShape.map((rows, i) => rows?.map((col, k) => <div
                        key={`${i}-${k}`}
                        style={{
                            width: 30, height: 30,
                            backgroundColor: tableShape[i][k][0] === "clear" ? "white" : "blue",
                            border: tableShape[i][k][0] === "clear" ? undefined : "solid 2px black"

                        }}> </div>))}
                </div>

            </div>
        </>
    );
}

export default Shapes;