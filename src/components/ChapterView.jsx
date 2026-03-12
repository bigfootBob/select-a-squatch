import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStory } from '../context/StoryContext';
import { useQuery } from '@apollo/client/react';
import { GET_CHAPTER_BY_SLUG } from '../graphql/queries';
import { Share2 } from 'lucide-react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import styles from './ChapterView.module.scss';

const ChapterView = () => {
    const { sceneId } = useParams();
    const navigate = useNavigate();
    const { userName, friendName, squatchName, setCustomParagraph, customParagraph } = useStory();
    const [addedText, setAddedText] = useState('');

    const { loading, error, data } = useQuery(GET_CHAPTER_BY_SLUG, {
        variables: { sceneId: sceneId || 'start-forager' },
    });

    if (loading) return <div className="text-center p-10 text-accent pulse">Summoning the Sasquatch...</div>;
    if (error) return <div className="text-center p-10 text-error">Error loading chapter: {error.message}</div>;

    const chapter = data?.chooseYourOwnSquatchCollection?.items[0];

    if (!chapter) {
        return <div className="text-center p-10 text-error">Chapter not found! You are lost in the woods.</div>;
    }

    // Replace placeholders
    const processText = (text) => {
        if (!text) return '';
        if (typeof text !== 'string') return text;
        return text
            .replaceAll('{{userName}}', userName || 'Forager')
            .replaceAll('{{friendName}}', friendName || 'Buddy')
            .replaceAll('{{squatchName}}', squatchName || 'Sasquatch');
    };

    // Custom rendering options for Contentful rich text to replace text
    const renderOptions = {
        renderText: text => processText(text)
    };

    const handleCustomSubmit = (e) => {
        e.preventDefault();
        setCustomParagraph(addedText);
        setAddedText(''); // Clear input after adding
    };

    const handleShare = async () => {
        // Sanitize string output for sharing via strict URI encoding
        const safeSquatchName = encodeURIComponent(squatchName || 'Sasquatch');
        const encodedUrl = encodeURI(window.location.href);
        const textToShare = `I'm on an adventure with ${decodeURIComponent(safeSquatchName)}! Read my story: ${encodedUrl}`;
        try {
            if (navigator.share) {
                await navigator.share({
                    title: 'Select A Squatch',
                    text: textToShare,
                    url: encodedUrl,
                });
            } else {
                await navigator.clipboard.writeText(textToShare);
                alert('Link copied to clipboard!');
            }
        } catch (error) {
            console.error("Error sharing:", error);
        }
    };


    return (
        <div>
            <div className={`card ${styles.chapterHeader}`}>
                <button onClick={handleShare} className={`${styles.btnIcon} ${styles.shareBtn}`} aria-label="Share your story" title="Share your story">
                    <Share2 size={24} aria-hidden="true" />
                </button>

                <h2 className={styles.chapterTitle}>{chapter.title}</h2>

                <div className={styles.prose}>
                    <div className="whitespace-pre-wrap">
                        {chapter.storyText?.json ? documentToReactComponents(chapter.storyText.json, renderOptions) : ''}
                    </div>
                    {customParagraph && chapter.allowCustomInput && (
                        <p className={styles.customInputDisplay}>
                            "{customParagraph}"
                        </p>
                    )}
                </div>

                {chapter.allowCustomInput && !customParagraph && (
                    <div className={styles.customInputForm}>
                        <h3 className={styles.customInputTitle}>Add your own spice:</h3>
                        <form onSubmit={handleCustomSubmit} className={styles.customInputFormInner}>
                            <label htmlFor="custom-spice-input" className="sr-only" style={{ display: 'none' }}>Write a sultry sentence to add</label>
                            <textarea
                                id="custom-spice-input"
                                value={addedText}
                                onChange={(e) => setAddedText(e.target.value)}
                                placeholder="Write a sultry sentence to add to the story..."
                                className={styles.customInputTextarea}
                                aria-label="Write a sultry sentence to add to the story"
                            />
                            <button type="submit" className={styles.btnAction} aria-label="Add text to story">
                                Add to Story
                            </button>
                        </form>
                    </div>
                )}

                <div className={styles.choicesGrid}>
                    {chapter.choicesCollection?.items.map((choice, index) => (
                        <button
                            key={index}
                            onClick={() => navigate(`/chapter/${choice.sceneId}`)}
                            className={styles.btnSecondary}
                        >
                            <span>{processText(choice.title)}</span>
                            <span className={styles.arrow}>→</span>
                        </button>
                    ))}
                    {(!chapter.choicesCollection?.items || chapter.choicesCollection.items.length === 0) && (
                        <button
                            onClick={() => {
                                navigate('/');
                            }}
                            className={styles.btnRestart}
                        >
                            Play Again
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChapterView;
