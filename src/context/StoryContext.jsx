import React, { createContext, useContext, useState } from 'react';

const StoryContext = createContext(undefined);

export const StoryProvider = ({ children }) => {
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
