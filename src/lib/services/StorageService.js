//need to migrate old 2-state, to now's 3-state
export function migrateToCollectionStatesIfNeeded() {
    if (typeof window === "undefined") return;

    const hasNew = localStorage.getItem("collectionStates");
    const hasOld = localStorage.getItem("collectedPokemons");

    if (!hasNew && hasOld) {
        const oldIds = JSON.parse(hasOld); // an array
        const migrated = {}; // defined explicitly as object

        oldIds.forEach(id => {
            migrated[id] = 1; // set state of pokemon id to pokeball
        });

        localStorage.setItem("collectionStates", JSON.stringify(migrated));
        localStorage.removeItem("collectedPokemons");
    }
}

export function getCollectionStates() {
    if (typeof window === "undefined") return {};
    return JSON.parse(localStorage.getItem("collectionStates")) || {};
}

export function saveCollectionStates(updatedStates) {
    if (typeof window === "undefined") return;
    localStorage.setItem("collectionStates", JSON.stringify(updatedStates)); //convert into string
}

export function getCollectionState(pokemonId) {
    const collectionStates = getCollectionStates();
    return Number(collectionStates[pokemonId]) || 0;
}

export function toggleCollectionState(pokemonId) {
    const collectionStates = getCollectionStates();
    const currentState = Number(collectionStates[pokemonId]) || 0;
    const updatedState = (currentState + 1) % 3;
    collectionStates[pokemonId] = updatedState;
    saveCollectionStates(collectionStates);
}