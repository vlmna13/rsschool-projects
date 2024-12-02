// import data from "./gifts.js";
function shuffle(data) {
    let mixed = data.sort(() => Math.random() - 0.5);
    return mixed;
}

export default shuffle