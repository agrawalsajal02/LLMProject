
const randomQueries = [
    'laughing baby',
    'excited squirrel',
    'dancing grandma',
    'funny fail',
    'cute hedgehog',
    'sleepy koala',
    'clumsy penguin',
    'surprised llama',
    'playful dolphin',
    'chasing tail',
    'silly face',
    'prank reaction',
    'giggling parrot',
    'hovering owl',
    'slippery floor',
    'startled cat',
    'breakdancing dog',
    'turtle speed race',
    'awkward handshake',
    'funny cat' // Included your initial query as well
];

const getRandomQuery = () => {
    const randomIndex = Math.floor(Math.random() * randomQueries.length);
    return randomQueries[randomIndex];
};

export { getRandomQuery };