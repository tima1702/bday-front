export function compareObj(a, b) {
    if (isNull(a) ^ isNull(b)) return false;
    let array_of_obj_A = [];
    let array_of_obj_B = [];
    try {
        array_of_obj_A = Object.entries(a);
        array_of_obj_B = Object.entries(b);
    } catch {
    }

    if (array_of_obj_A.length !== array_of_obj_B.length) return false;

    for (let i = 0; i < array_of_obj_A.length; i++) {
        if (array_of_obj_A[i][0] !== array_of_obj_B[i][0]) {
            return false;
        }
        if (typeof array_of_obj_A[i][1] === 'object') {
            return compareObj(array_of_obj_A[i][1], array_of_obj_B[i][1]);
        }
        if (array_of_obj_A[i][1] !== array_of_obj_B[i][1]) {
            return false;
        }
    }

    return true;
}

function isNull(a) {
    return a === null;
}
