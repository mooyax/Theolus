export const en = {
    header: "Guide",
    tabs: {
        overview: "Overview",
        controls: "Controls",
        stats: "Stats",
        time: "Time",
        terrain: "Terrain",
        units: "Humans",
        goblins: "Goblins",
        buildings: "Buildings",
        others: "Others"
    },
    sections: {
        overview: {
            title: "Getting Started",
            description: "Theolus is a game where you observe and guide autonomous humans from a god's perspective.",
            items: [
                {
                    title: "Autonomous Development",
                    text: "Units (Workers) think for themselves, build houses, increase population, and farm for food. You cannot build houses or farms directly."
                },
                {
                    title: "Godly Power (Mana)",
                    text: "Your role is to spend Mana to give instructions to 'Raise' or 'Lower' land, guiding them to build flat areas. You also place markers for Barracks and Towers to encourage fortification."
                }
            ],
            victory_title: "Victory Conditions",
            victory_text: "Destroy all Goblin Caves and hostile faction bases scattered across the world to eliminate threats and achieve VICTORY."
        },
        controls: {
            title: "Controls",
            items: [
                { title: "View / Select", text: "Safety mode for camera operation only." },
                { title: "Raise Land", text: "Place a marker to increase terrain height." },
                { title: "Lower Land", text: "Place a marker to decrease terrain height." },
                { title: "Spawn Unit", text: "Place a marker to summon new residents." },
                { title: "Build Barracks", text: "Place a marker to build a Knight's training facility." },
                { title: "Build Tower", text: "Place a marker to build a Wizard's tower." },
                { title: "Cancel", text: "Remove existing instruction markers." }
            ]
        },
        stats: {
            title: "Stats",
            description: "Meanings of the icons in the top-left display.",
            items: [
                { title: "Population", text: "The current total number of residents." },
                { title: "Mana", text: "Power used for miracles (terrain manipulation, etc.)." },
                { title: "Grain", text: "Main food source harvested from farms." },
                { title: "Fish", text: "Caught from the sea by fishermen." },
                { title: "Meat", text: "Obtained from animals by hunters." }
            ]
        },
        time: {
            title: "Time",
            description: "The environment of Theolus has day and night cycles.",
            day_title: "Day",
            day_text: "Workers actively work, gather resources, and build structures.",
            night_title: "Night",
            night_text: "Workers return home to rest and recover health. Be careful, as goblin activity is harder to see at night.",
            seasons_title: "Seasons",
            seasons_description: "Seasons change periodically, affecting terrain and agriculture.",
            seasons: [
                { title: "Spring", text: "New life sprouts, and greenery flourishes. Ideal for crop growth." },
                { title: "Summer", text: "Strong sunlight makes crops grow at their fastest." },
                { title: "Autumn", text: "Leaves turn red, and the ground changes color. Preparation time for winter." },
                { title: "Winter", text: "The land is covered in snow. Crops won't grow, making food stockpiles crucial." }
            ]
        },
        terrain: {
            title: "Terrain",
            description: "Various features based on land color and height.",
            types: [
                { title: "Highland", text: "High land with exposed rock. Difficult to walk, slowing movement speed." },
                { title: "Grassland", text: "Lush, standard land. Suitable for construction and movement." },
                { title: "Forest", text: "Areas dense with trees. Wood can be gathered here." },
                { title: "Sand", text: "Dry regions. Trees find it difficult to grow here." },
                { title: "Marsh", text: "Darker land containing lots of moisture." },
                { title: "Water", text: "Seas and lakes. Fish swim here, providing a food source." }
            ]
        }
    },
    showroom: {
        worker: { title: 'Worker', desc: 'Basic unit. Performs construction, repairs, and gathering resources (wood/fish).' },
        knight: { title: 'Knight', desc: 'A warrior with high HP and defense. Protects the town from goblins.' },
        wizard: { title: 'Wizard', desc: 'Uses powerful fireball magic for long-range area attacks.' },
        goblin: { title: 'Goblin', desc: 'The most common enemy. Armed with clubs, they attack in swarms.' },
        hob: { title: 'Hobgoblin', desc: 'Large, muscular goblin. Has high durability and attack power.' },
        shaman: { title: 'Shaman', desc: 'Magic-using goblin. Fires suspicious projectiles from a distance.' },
        king: { title: 'Goblin King', desc: 'The ruler of the goblins. Clad in golden armor and extremely powerful.' },
        house: { title: 'House', desc: 'Where workers live. Building these increases population. Only on flat land.' },
        farm: { title: 'Farm', desc: 'Produces food (grain). Required for population growth.' },
        barracks: { title: 'Barracks', desc: 'Facility to train Knights. A sturdy stone building.' },
        tower: { title: 'Tower', desc: 'A high tower to summon Wizards. Can see far distances.' },
        goblin_hut: { title: 'Goblin Hut', desc: 'An eerie hut where goblins spawn. Destroying it stops spawns.' },
        cave: { title: 'Goblin Cave', desc: 'A dark hole leading deep underground. Stronger mobs appear here.' },
        bird: { title: 'Bird', desc: 'A white bird flying freely. Adds life to the environment.' },
        sheep: { title: 'Sheep', desc: 'Animals wandering the grasslands. Occasional bleating.' },
        fish: { title: 'Fish', desc: 'Swimming in the sea. Caught by fishermen for food.' }
    }
};
