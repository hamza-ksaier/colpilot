
export default function getRowsIndexes(matrix) {
    let num = 0;
    for (let i = 0; i < matrix.length; i++) {
        const row = matrix[i]; 
        if (row.includes(1) || row.includes(11) || row.includes(22) || row.includes(2) || row.includes(3) || row.includes(33) || row.includes(4) || row.includes(44) ) {
            num++;
        }
    }
    return num;
}

