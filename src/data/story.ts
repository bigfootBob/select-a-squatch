export interface Choice {
    text: string;
    nextChapterId: string;
}

export interface Chapter {
    id: string;
    title: string;
    text: string;
    image?: string;
    choices: Choice[];
    allowCustomInput?: boolean;
}

export const storyData: Record<string, Chapter> = {
    start: {
        id: 'start',
        title: 'The Encoder\'s Cabin',
        text: "You, {{userName}}, and your best friend {{friendName}} have decided to spend a weekend in a remote cabin in the Pacific Northwest. The air is crisp, the trees are tall, and the rumors of {{squatchName}} are... greatly exaggerated, right? As you unpack your flannel shirts and artisanal coffee beans, a strange, guttural growl echoes from the woods.",
        choices: [
            { text: "Investigate the noise immediately", nextChapterId: 'investigate' },
            { text: "Lock the door and make hot cocoa", nextChapterId: 'cocoa' },
        ],
    },
    investigate: {
        id: 'investigate',
        title: 'Into the Woods',
        text: "You grab a flashlight. {{friendName}} grabs a spatula for defense. You step out into the moonlight. There, rapidly approaching with a bouquet of wildflowers, is {{squatchName}}. The creature is 8 feet tall, covered in silken fur, and smells faintly of pine and musk.",
        choices: [
            { text: "Accept the flowers", nextChapterId: 'romance' },
            { text: "Scream and run back inside", nextChapterId: 'cocoa' },
        ],
    },
    cocoa: {
        id: 'cocoa',
        title: 'Cozy Fear',
        text: "You lock the door. Safe. Or are you? A gentle knock rattles the frame. 'Candygram,' a deep, sultry voice rumbles. {{friendName}} looks at you with wide eyes.",
        choices: [
            { text: "Open the door", nextChapterId: 'investigate' },
            { text: "Ignore it and drink cocoa", nextChapterId: 'boring_end' },
        ],
    },
    romance: {
        id: 'romance',
        title: 'A Hairy Encounter',
        text: "{{squatchName}} blushes beneath the fur. 'For you,' they rumble. The connection is electric. Who knew a cryptid could have such soulful eyes?",
        allowCustomInput: true,
        choices: [
            { text: "Invite {{squatchName}} for dinner", nextChapterId: 'dinner' },
        ],
    },
    boring_end: {
        id: 'boring_end',
        title: 'The Boring End',
        text: "You survive the weekend, but always wonder what could have been. You return to your normal life, forever haunted by the road not taken.",
        choices: [
            { text: "Restart Adventure", nextChapterId: 'start' },
        ],
    },
    dinner: {
        id: 'dinner',
        title: 'Dinner Date',
        text: "The evening is magical. {{squatchName}} knows a surprising amount about vintage wines. As the fire crackles, you realize this isn't just a story... it's destiny.",
        choices: [], // End of demo path
    }
};
