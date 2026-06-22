import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './LFOEffects.css';

export default function LFOEffects() {
  const [carrierFreq, setCarrierFreq] = useState(440);
  const [lfoRate, setLfoRate] = useState(5);
  const [depth, setDepth] = useState(100);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const lfoOscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const lfoGainRef = useRef<GainNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Determine effect type based on LFO rate
  const getEffectInfo = () => {
    if (lfoRate < 20) {
      return {
        type: 'TREMOLO EFFECT',
        icon: '🔊',
        gradient: 'linear-gradient(135deg, #00f5ff 0%, #a855f7 100%)',
        description: `Volume pulsing ${lfoRate} times per second. Pitch stays at ${carrierFreq} Hz.`,
      };
    } else if (lfoRate < 50) {
      return {
        type: 'TRANSITION ZONE',
        icon: '⚡',
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        description: `Between tremolo and ring modulation. Starting to create sidebands at ${(carrierFreq - lfoRate).toFixed(0)} Hz and ${(carrierFreq + lfoRate).toFixed(0)} Hz.`,
      };
    } else {
      return {
        type: 'RING MODULATION',
        icon: '🎸',
        gradient: 'linear-gradient(135deg, #ff6b35 0%, #f7c600 100%)',
        description: `Creating new frequencies! Sidebands at ${(carrierFreq - lfoRate).toFixed(0)} Hz and ${(carrierFreq + lfoRate).toFixed(0)} Hz. Original ${carrierFreq} Hz is suppressed.`,
      };
    }
  };

  const effectInfo = getEffectInfo();

  // Draw waveform
  const drawWaveform = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size for high DPI
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    const width = rect.width;
    const height = rect.height;

    // Clear canvas
    ctx.fillStyle = '#12121a';
    ctx.fillRect(0, 0, width, height);

    // Draw grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i++) {
      const y = (height / 10) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw center line
    ctx.strokeStyle = 'rgba(0, 245, 255, 0.2)';
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    // Draw waveform
    const samples = 2000;
    const duration = lfoRate < 20 ? 1.0 : 0.1;
    const centerY = height / 2;
    const amplitude = height * 0.35;
    const depthNorm = depth / 100;

    // Create gradient for waveform
    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, '#00f5ff');
    gradient.addColorStop(0.5, '#a855f7');
    gradient.addColorStop(1, '#ff00aa');

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2;
    ctx.beginPath();

    for (let i = 0; i < samples; i++) {
      const t = (i / samples) * duration;
      const x = (i / samples) * width;

      // Carrier signal
      const carrierWave = Math.sin(2 * Math.PI * carrierFreq * t);

      // LFO signal
      const lfoWave = Math.sin(2 * Math.PI * lfoRate * t);
      const lfoModulator = 1 - depthNorm + depthNorm * (lfoWave + 1) / 2;

      // Modulated signal
      const y = centerY - carrierWave * lfoModulator * amplitude;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }

    ctx.stroke();

    // Add glow effect
    ctx.shadowColor = '#00f5ff';
    ctx.shadowBlur = 10;
    ctx.stroke();
  }, [carrierFreq, lfoRate, depth]);

  // Update waveform when parameters change
  useEffect(() => {
    drawWaveform();
  }, [drawWaveform]);

  // Update audio parameters in real-time
  useEffect(() => {
    if (oscillatorRef.current && lfoOscillatorRef.current && lfoGainRef.current) {
      oscillatorRef.current.frequency.setValueAtTime(carrierFreq, audioContextRef.current!.currentTime);
      lfoOscillatorRef.current.frequency.setValueAtTime(lfoRate, audioContextRef.current!.currentTime);
      lfoGainRef.current.gain.setValueAtTime((depth / 100) * 0.3, audioContextRef.current!.currentTime);
    }
  }, [carrierFreq, lfoRate, depth]);

  const playSound = async () => {
    if (isPlaying) return;

    // Create or resume audio context
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }

    if (audioContextRef.current.state === 'suspended') {
      await audioContextRef.current.resume();
    }

    const ctx = audioContextRef.current;

    // Create carrier oscillator
    const oscillator = ctx.createOscillator();
    oscillator.frequency.value = carrierFreq;
    oscillator.type = 'sine';

    // Create LFO
    const lfoOscillator = ctx.createOscillator();
    lfoOscillator.frequency.value = lfoRate;
    lfoOscillator.type = 'sine';

    // Create gain nodes
    const gainNode = ctx.createGain();
    gainNode.gain.value = 0.3;

    const lfoGain = ctx.createGain();
    lfoGain.gain.value = (depth / 100) * 0.3;

    // Connect nodes
    lfoOscillator.connect(lfoGain);
    lfoGain.connect(gainNode.gain);
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Store references
    oscillatorRef.current = oscillator;
    lfoOscillatorRef.current = lfoOscillator;
    gainNodeRef.current = gainNode;
    lfoGainRef.current = lfoGain;

    // Start
    oscillator.start();
    lfoOscillator.start();
    setIsPlaying(true);
  };

  const stopSound = () => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current = null;
    }
    if (lfoOscillatorRef.current) {
      lfoOscillatorRef.current.stop();
      lfoOscillatorRef.current = null;
    }
    setIsPlaying(false);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopSound();
    };
  }, []);

  return (
    <div className="lfo-effects">
      <nav className="tool-nav">
        <Link to="/" className="back-link">← Back to Tools</Link>
      </nav>

      <div className="tool-container">
        <header className="tool-header">
          <h1>〰️ LFO Frequency Effects</h1>
          <p className="tool-subtitle">
            Hear how LFO rate changes from tremolo to ring modulation
          </p>
        </header>

        <div className="controls-section">
          <div className="control-group">
            <label>
              Carrier Frequency (Audio Signal)
              <span className="value-badge">{carrierFreq} Hz</span>
            </label>
            <input
              type="range"
              min="200"
              max="1000"
              step="10"
              value={carrierFreq}
              onChange={(e) => setCarrierFreq(Number(e.target.value))}
            />
          </div>

          <div className="control-group">
            <label>
              LFO Rate (Modulation Frequency)
              <span className="value-badge">{lfoRate} Hz</span>
            </label>
            <input
              type="range"
              min="0.5"
              max="200"
              step="0.5"
              value={lfoRate}
              onChange={(e) => setLfoRate(Number(e.target.value))}
            />
          </div>

          <div className="control-group">
            <label>
              LFO Depth
              <span className="value-badge">{depth}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={depth}
              onChange={(e) => setDepth(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="effect-display" style={{ background: effectInfo.gradient }}>
          <span className="effect-icon">{effectInfo.icon}</span>
          <span className="effect-type">{effectInfo.type}</span>
        </div>

        <div className="info-box">
          <p>{effectInfo.description}</p>
        </div>

        <div className="button-group">
          <button 
            className={`play-button ${isPlaying ? 'playing' : ''}`} 
            onClick={playSound}
            disabled={isPlaying}
          >
            ▶️ Play Sound
          </button>
          <button 
            className="stop-button" 
            onClick={stopSound}
            disabled={!isPlaying}
          >
            ⏹️ Stop
          </button>
        </div>

        <div className="waveform-container">
          <canvas ref={canvasRef} className="waveform-canvas" />
        </div>

        <div className="tips-box">
          <h4>💡 Try these LFO rates:</h4>
          <ul>
            <li><strong>0.5-20 Hz:</strong> Tremolo (rhythmic pulsing)</li>
            <li><strong>20-50 Hz:</strong> Transition zone (starts to sound buzzy)</li>
            <li><strong>50-200 Hz:</strong> Ring modulation (creates new frequencies/tones)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}


