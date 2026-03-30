'use client';

import { useState, useRef } from 'react';
import { FaPlay } from 'react-icons/fa';
import styles from '@/app/page.module.css';

export default function AboutVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (videoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  return (
    <div className={styles.sobreVideoColumn}>
      {/* Decorative elements */}
      <div className={styles.sobreVideoDecor} />
      <div className={styles.sobreVideoWrapper} onClick={toggleVideo}>
        <video
          ref={videoRef}
          loop
          playsInline
          preload="none"
          className={styles.sobreVideo}
          onPlay={() => setVideoPlaying(true)}
          onPause={() => setVideoPlaying(false)}
          onEnded={() => setVideoPlaying(false)}
        >
          <source src="/sobre.webm" type="video/webm" />
          <source src="/sobre.MOV" type="video/quicktime" />
          <source src="/sobre.MOV" type="video/mp4" />
        </video>
        {!videoPlaying && (
          <div className={styles.sobrePlayOverlay}>
            <FaPlay size={30} />
          </div>
        )}
      </div>
    </div>
  );
}
