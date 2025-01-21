export function rotateMatrix(matrix) {
    const rotated = [];
    for (let i = 0; i < matrix[0].length; i++) {
        rotated[i] = [];
        for (let j = matrix.length - 1; j >= 0; j--) {
            rotated[i].push(matrix[j][i]);
        }
    }
    return rotated;
}
