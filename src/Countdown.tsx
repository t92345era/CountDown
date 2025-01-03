import React, { useState, useEffect } from 'react';
import useSound from 'use-sound';

// 音声ファイルのインポート
import startVoice from './sounds/start.wav';
import threeVoice from './sounds/0001.wav';
import twoVoice from './sounds/0002.wav';
import oneVoice from './sounds/0003.wav';
import goVoice from './sounds/go.wav';

const Countdown: React.FC = () => {
  const [countdownIndex, setCountdownIndex] = useState<number | null>(null);
  const countdownTexts = ['さあ始めるのだ！', '3', '2', '1', 'スタートなのだ'];

  const [playStart] = useSound(startVoice);
  const [playThree] = useSound(threeVoice);
  const [playTwo] = useSound(twoVoice);
  const [playOne] = useSound(oneVoice);
  const [playGo] = useSound(goVoice);

  const playSounds = [playStart, playThree, playTwo, playOne, playGo];
  const waitTimes = [2000, 1000, 1000, 1000, 1000];

  useEffect(() => {
    if (countdownIndex === null) return;

    if (countdownIndex < countdownTexts.length) {
      // 再生する音声を再生
      playSounds[countdownIndex]();

      // 次のカウントダウンへ進む
      const timer = setTimeout(() => {
        setCountdownIndex((prevIndex) => (prevIndex !== null ? prevIndex + 1 : null));
      }, waitTimes[countdownIndex]); // 1秒間隔

      return () => clearTimeout(timer);
    } else {
      // カウントダウン終了
      setCountdownIndex(null);
    }
  }, [countdownIndex, playSounds]);

  const startCountdown = () => {
    if (countdownIndex === null) {
      setCountdownIndex(0); // カウントダウンを開始
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>カウントダウンアプリ</h1>
      <div 
        style={{ fontSize: '48px', margin: '20px 0' }}>
        {countdownIndex !== null && countdownIndex < countdownTexts.length
          ? countdownTexts[countdownIndex]
          : 'ボタンを押してカウントダウン開始！'}
      </div>
      <button onClick={startCountdown} style={{ fontSize: '24px', padding: '10px 20px' }}>
        カウントダウンを始める
      </button>
      <div 
        style={{
          position: 'fixed',
          bottom: "4px",
          left: "4px",
        }}
      >
        音声：VOICEVOX：ずんだもん
      </div>
    </div>
  );
};

export default Countdown;
