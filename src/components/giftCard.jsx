// src/GiftCard.js

import React, { useEffect, useState } from 'react';
import { useSpring, useTrail, animated, config, useSprings } from '@react-spring/web';
import './GiftCard.css';
// import { Timestamp, arrayUnion, deleteField, doc, getDoc, getFirestore, increment, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { getDatabase, ref, get, update, push, serverTimestamp, set } from 'firebase/database';
import Authentication from '../firebase/authentication';
import { getApp } from 'firebase/app';

const GiftCard = ({ cards }) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const trackPageView = async (docId, db) => {
        const docRef = ref(db, `aa/${docId}`);
      
        // Fetch the current document data
        const docSnapshot = await get(docRef);
      
        if (docSnapshot.exists()) {
          const data = docSnapshot.val();
          const currentCount = data.count || 0;
      
          // Add server timestamp to the 'seen' list and increment the count
          const updates = {};
          updates[`aa/${docId}/seen`] = [...(data.seen || []), serverTimestamp()];
          updates[`aa/${docId}/count`] = currentCount + 1;
      
          await update(ref(db), updates);
        } else {
          // If the document doesn't exist, create it with initial values
          await set(ref(db, `aa/${docId}`), {
            seen: [serverTimestamp()],
            count: 1
          });
        }
      };

    useEffect(() => {
        const db = getDatabase(getApp());
        const auth = new Authentication();
        const ud = auth.getUid();
        if (ud) {
            trackPageView(ud, db);
        }
    }, []);
    const envelopeStyle = useSpring({
        // transform: isOpen ? 'translateY(0px)' : 'translateY(-100px)',
        config: config.wobbly,
    });

    const cardSprings = useSprings(
        cards.length,
        cards.map((_, index) => ({
            transform: isOpen ? 'translateY(0px)' : 'translateY(200px)',
            // transform: isOpen ? 'translateX(0px)' : 'translateX(200px)',
            // transform: isOpen ? `translateY(${index * -60}px)` : 'translateY(0px)',
            opacity: isOpen ? 1 : 0,
            config: { duration: 1000 }, // Adjust the duration for slower animation
            delay: isOpen ? index * 7000 : 0, // Increase delay for slower consecutive animation

        }))
    );

    return (
        <div className="gift-card-container">
            <animated.div style={envelopeStyle} className="envelope"></animated.div>
            <animated.div style={envelopeStyle} className="envelope-flap-u"></animated.div>
            <animated.div style={envelopeStyle} className="envelope-flap"></animated.div>
            {cardSprings.map((style, index) => (
                <animated.div key={index} style={style} className="card">
                    <img src={cards[index].image} alt={`Card ${index + 1}`} />
                    <p>{cards[index].text}</p>
                </animated.div>
            ))}
        </div>
    );
};

export default GiftCard;
