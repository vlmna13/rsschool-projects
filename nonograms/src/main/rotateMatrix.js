export function rotateMatrix(matrix) {
    let rotatedConfig = structuredClone(matrix);
    let arrayResult = [];
  
    for (let i = 0; i < matrix.length; i += 1) {
      arrayResult[i] = [];
      for (let j = 0; j < matrix.length; j += 1) {
        arrayResult[i][j] = matrix[i][j];
      }
    }
    for (let i = 0; i < matrix.length; i += 1) {
      for (let j = 0; j < matrix.length; j += 1) {
        rotatedConfig[i][j] = arrayResult[matrix.length - j - 1][i];
      }
    }
    console.log('rotate' + rotatedConfig)
    return rotatedConfig;
}
