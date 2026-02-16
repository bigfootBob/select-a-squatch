import React, { createContext, useContext, useState, type ReactNode } from 'react';

interface StoryState {
    userName: string;
    friendName: string;
    squatchName: string;
    customParagraph: string;
}

interface StoryContextType extends StoryState {
    setUserName: (name: string) => void;
    setFriendName: (name: string) => void;
    setSquatchName: (name: string) => void;
    setCustomParagraph: (text: string) => void;
}

const StoryContext = createContext<StoryContextType | undefined>(undefined);

export const StoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [userName, setUserName] = useState('');
    const [friendName, setFriendName] = useState('');
    const [squatchName, setSquatchName] = useState('Sasquatch');
    const [customParagraph, setCustomParagraph] = useState('');

    return (
        <StoryContext.Provider
            value={{
                userName,
                friendName,
                squatchName,
                customParagraph,
                setUserName,
                setFriendName,
                setSquatchName,
                setCustomParagraph,
            }}
        >
            {children}
        </StoryContext.Provider>
    );
};

export const useStory = () => {
    const context = useContext(StoryContext);
    if (!context) {
        throw new Error('useStory must be used within a StoryProvider');
    }
    return context;
};
