import React, { useState } from 'react';
import { useStory } from '../context/StoryContext';
import { useNavigate } from 'react-router-dom';
import { Send, User, Users, PawPrint } from 'lucide-react';
import styles from './IntroForm.module.scss';

const IntroForm = () => {
    const { setUserName, setFriendName, setSquatchName, userName, friendName, squatchName } = useStory();
    const navigate = useNavigate();

    const [localUser, setLocalUser] = useState(userName);
    const [localFriend, setLocalFriend] = useState(friendName);
    const [localSquatch, setLocalSquatch] = useState(squatchName);

    const handleSubmit = (e) => {
        e.preventDefault();
        setUserName(localUser || 'Forager');
        setFriendName(localFriend || 'Buddy');
        setSquatchName(localSquatch || 'Sasquatch');
        navigate('/chapter/start-forager');
    };

    return (
        <div className="card">
            <h2 className="card-title">Customize Your Encounter</h2>
            <p className="card-subtitle">Every good story needs a hero, a sidekick, and a... fuzzy love interest.</p>

            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="user-name" className={styles.formLabel}><User size={18} aria-hidden="true" /> Your Name</label>
                    <input
                        id="user-name"
                        type="text"
                        value={localUser}
                        onChange={(e) => setLocalUser(e.target.value)}
                        className={styles.formInput}
                        placeholder="e.g. Mulder"
                        aria-label="Your Name"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="friend-name" className={styles.formLabel}><Users size={18} aria-hidden="true" /> Friend's Name</label>
                    <input
                        id="friend-name"
                        type="text"
                        value={localFriend}
                        onChange={(e) => setLocalFriend(e.target.value)}
                        className={styles.formInput}
                        placeholder="e.g. Scully"
                        aria-label="Friend's Name"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="squatch-name" className={styles.formLabel}><PawPrint size={18} aria-hidden="true" /> The Creature's Name</label>
                    <input
                        id="squatch-name"
                        type="text"
                        value={localSquatch}
                        onChange={(e) => setLocalSquatch(e.target.value)}
                        className={styles.formInput}
                        placeholder="e.g. Harry"
                        aria-label="The Creature's Name"
                    />
                </div>

                <button
                    type="submit"
                    className={styles.btnPrimary}
                    aria-label="Start your adventure"
                >
                    Start Your Adventure <Send size={20} aria-hidden="true" />
                </button>
            </form>
        </div>
    );
};

export default IntroForm;
