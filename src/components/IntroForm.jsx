import React, { useState } from 'react';
import { useStory } from '../context/StoryContext';
import { useNavigate } from 'react-router-dom';
import { Send, User, Users, PawPrint } from 'lucide-react';

const IntroForm = () => {
    const { setUserName, setFriendName, setSquatchName, userName, friendName, squatchName } = useStory();
    const navigate = useNavigate();

    const [localUser, setLocalUser] = useState(userName);
    const [localFriend, setLocalFriend] = useState(friendName);
    const [localSquatch, setLocalSquatch] = useState(squatchName);

    const handleSubmit = (e) => {
        e.preventDefault();
        setUserName(localUser || 'Adventurer');
        setFriendName(localFriend || 'Buddy');
        setSquatchName(localSquatch || 'Sasquatch');
        navigate('/chapter/start');
    };

    return (
        <div className="card bg-stone-800 p-6 rounded-xl shadow-xl border border-stone-700">
            <h2 className="text-2xl font-bold mb-4 text-amber-200 text-center">Customize Your Encounter</h2>
            <p className="text-stone-400 mb-6 text-center italic">Every good story needs a hero, a sidekick, and a... fuzzy love interest.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-stone-300 font-semibold"><User size={18} /> Your Name</label>
                    <input
                        type="text"
                        value={localUser}
                        onChange={(e) => setLocalUser(e.target.value)}
                        className="w-full bg-stone-900 border border-stone-600 rounded p-3 text-amber-50 focus:border-amber-500 outline-none transition-colors"
                        placeholder="e.g. Mulder"
                    />
                </div>

                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-stone-300 font-semibold"><Users size={18} /> Friend's Name</label>
                    <input
                        type="text"
                        value={localFriend}
                        onChange={(e) => setLocalFriend(e.target.value)}
                        className="w-full bg-stone-900 border border-stone-600 rounded p-3 text-amber-50 focus:border-amber-500 outline-none transition-colors"
                        placeholder="e.g. Scully"
                    />
                </div>

                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-stone-300 font-semibold"><PawPrint size={18} /> The Creature's Name</label>
                    <input
                        type="text"
                        value={localSquatch}
                        onChange={(e) => setLocalSquatch(e.target.value)}
                        className="w-full bg-stone-900 border border-stone-600 rounded p-3 text-amber-50 focus:border-amber-500 outline-none transition-colors"
                        placeholder="e.g. Harry"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full mt-6 bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-600 hover:to-amber-800 text-white font-bold py-4 px-6 rounded-lg shadow-lg transform transition hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                >
                    Start Your Adventure <Send size={20} />
                </button>
            </form>
        </div>
    );
};

export default IntroForm;
