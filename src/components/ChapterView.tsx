import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStory } from '../context/StoryContext';
import { useQuery } from '@apollo/client/react';
import { GET_CHAPTER_BY_SLUG } from '../graphql/queries';
import { Share2 } from 'lucide-react';
import type { GetChapterBySlugResponse, GetChapterBySlugVariables, ContentfulChoice } from '../types/contentful';

const ChapterView: React.FC = () => {
    const { chapterId } = useParams<{ chapterId: string }>();
    const navigate = useNavigate();
    const { userName, friendName, squatchName, setCustomParagraph, customParagraph } = useStory();
    const [addedText, setAddedText] = useState('');

    const { loading, error, data } = useQuery<GetChapterBySlugResponse, GetChapterBySlugVariables>(GET_CHAPTER_BY_SLUG, {
        variables: { slug: chapterId || 'start' },
    });

    if (loading) return <div className="text-center p-10 text-amber-500 animate-pulse">Summoning the Sasquatch...</div>;
    if (error) return <div className="text-center p-10 text-red-500">Error loading chapter: {error.message}</div>;

    const chapter = data?.chapterCollection?.items[0];

    if (!chapter) {
        return <div className="text-center p-10 text-red-500">Chapter not found! You are lost in the woods.</div>;
    }

    // Replace placeholders
    const processText = (text: string | undefined | null) => {
        if (!text) return '';
        return text
            .replaceAll('{{userName}}', userName || 'Adventurer')
            .replaceAll('{{friendName}}', friendName || 'Buddy')
            .replaceAll('{{squatchName}}', squatchName || 'Sasquatch');
    };

    const handleCustomSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setCustomParagraph(addedText);
        setAddedText(''); // Clear input after adding
    };

    const handleShare = async () => {
        const textToShare = `I'm on an erotic adventure with ${squatchName}! Read my story: ${window.location.href}`;
        try {
            if (navigator.share) {
                await navigator.share({
                    title: 'Select A Squatch',
                    text: textToShare,
                    url: window.location.href,
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
        <div className="flex flex-col gap-6 animate-fade-in">
            <div className="card bg-stone-800 p-8 rounded-xl shadow-2xl border border-stone-700 relative">
                <button onClick={handleShare} className="absolute top-4 right-4 text-stone-500 hover:text-amber-400 transition-colors p-2" title="Share your story">
                    <Share2 size={24} />
                </button>

                <h2 className="text-3xl font-bold mb-6 text-amber-500">{chapter.title}</h2>

                <div className="prose prose-invert prose-lg mb-8 leading-relaxed text-stone-300">
                    <p className="whitespace-pre-wrap">{processText(chapter.content)}</p>
                    {customParagraph && chapter.allowCustomInput && (
                        <p className="mt-4 p-4 bg-stone-900/50 border-l-4 border-amber-500 italic text-amber-200 animate-pulse">
                            "{customParagraph}"
                        </p>
                    )}
                </div>

                {chapter.allowCustomInput && !customParagraph && (
                    <div className="mb-8 p-4 bg-stone-900 rounded-lg border border-stone-700">
                        <h3 className="text-lg font-semibold text-amber-200 mb-2">Add your own spice:</h3>
                        <form onSubmit={handleCustomSubmit} className="flex flex-col gap-2">
                            <textarea
                                value={addedText}
                                onChange={(e) => setAddedText(e.target.value)}
                                placeholder="Write a sultry sentence to add to the story..."
                                className="w-full bg-stone-800 border border-stone-600 rounded p-3 text-sm text-amber-50 focus:border-amber-500 outline-none h-24"
                            />
                            <button type="submit" className="self-end bg-stone-700 hover:bg-stone-600 text-stone-200 px-4 py-2 rounded text-sm font-medium transition-colors">
                                Add to Story
                            </button>
                        </form>
                    </div>
                )}

                <div className="grid gap-4 mt-8">
                    {chapter.choicesCollection?.items.map((choice: ContentfulChoice, index: number) => (
                        <button
                            key={index}
                            onClick={() => navigate(`/chapter/${choice.nextChapter.slug}`)}
                            className="w-full text-left p-4 rounded-lg bg-stone-900 border border-stone-600 hover:border-amber-500 hover:bg-stone-800 transition-all group flex items-center justify-between"
                        >
                            <span className="text-lg font-medium text-amber-100 group-hover:text-amber-400">{processText(choice.text)}</span>
                            <span className="text-stone-600 group-hover:text-amber-500 transform group-hover:translate-x-1 transition-transform">→</span>
                        </button>
                    ))}
                    {(!chapter.choicesCollection?.items || chapter.choicesCollection.items.length === 0) && (
                        <button
                            onClick={() => {
                                navigate('/');
                            }}
                            className="w-full p-4 rounded-lg bg-amber-900/30 border border-amber-900 hover:bg-amber-900/50 text-amber-200 text-center font-bold tracking-widest uppercase mt-4"
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
