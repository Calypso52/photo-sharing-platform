const initState = [];
export default function countReducer(preState = initState, action) {
    const { type, data } = action;

    switch (type) {
        case 'searchResult':
            return data;
        default:
            return preState;
    }
}