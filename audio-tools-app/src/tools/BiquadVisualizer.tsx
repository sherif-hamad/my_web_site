import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Pause, RotateCcw } from 'lucide-react';
import './BiquadVisualizer.css';

export default function BiquadVisualizer() {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);

  // Sample values for demonstration
  const x = [0, 0.5, 1.0, 0.8, 0.3, -0.2, -0.6, -0.4];
  const currentIndex = 2;
  
  // Biquad coefficients (example lowpass)
  const b0 = 0.067, b1 = 0.134, b2 = 0.067;
  const a1 = -1.143, a2 = 0.413;
  
  // State variables
  const [x1] = useState(0.5);
  const [x2] = useState(0);
  const [y1] = useState(0.3);
  const [y2] = useState(0.1);

  const steps = [
    {
      title: "Step 1: Input Signal",
      description: "The biquad filter processes an input signal x[n] sample by sample. Each sample is processed sequentially.",
      highlight: "input"
    },
    {
      title: "Step 2: Store Previous Inputs",
      description: "We keep track of the two previous input samples: x[n-1] and x[n-2]. These are called 'delay elements' or 'state variables'.",
      highlight: "delays-x"
    },
    {
      title: "Step 3: Store Previous Outputs",
      description: "We also store the two previous output samples: y[n-1] and y[n-2]. The filter uses its own past outputs!",
      highlight: "delays-y"
    },
    {
      title: "Step 4: Feedforward Path",
      description: "Calculate the feedforward part: b0·x[n] + b1·x[n-1] + b2·x[n-2]. This processes the input signal.",
      highlight: "feedforward",
      equation: `${b0.toFixed(3)}·${x[currentIndex].toFixed(1)} + ${b1.toFixed(3)}·${x1.toFixed(1)} + ${b2.toFixed(3)}·${x2.toFixed(1)} = ${(b0*x[currentIndex] + b1*x1 + b2*x2).toFixed(3)}`
    },
    {
      title: "Step 5: Feedback Path",
      description: "Calculate the feedback part: -a1·y[n-1] - a2·y[n-2]. This creates the recursive (IIR) nature of the filter.",
      highlight: "feedback",
      equation: `${(-a1).toFixed(3)}·${y1.toFixed(1)} + ${(-a2).toFixed(3)}·${y2.toFixed(1)} = ${(-a1*y1 - a2*y2).toFixed(3)}`
    },
    {
      title: "Step 6: Combine & Output",
      description: "Add feedforward and feedback to get the output: y[n] = (feedforward) + (feedback)",
      highlight: "output",
      equation: `y[n] = ${(b0*x[currentIndex] + b1*x1 + b2*x2 - a1*y1 - a2*y2).toFixed(3)}`
    },
    {
      title: "Step 7: Update State",
      description: "Shift the delay elements: x[n-2]←x[n-1], x[n-1]←x[n], y[n-2]←y[n-1], y[n-1]←y[n]. Then move to the next sample!",
      highlight: "update"
    }
  ];

  const currentStep = steps[step];
  const yn = b0*x[currentIndex] + b1*x1 + b2*x2 - a1*y1 - a2*y2;

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => {
        setStep(prev => (prev + 1) % steps.length);
      }, speed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, speed, steps.length]);

  return (
    <div className="biquad-visualizer">
      <nav className="tool-nav">
        <Link to="/" className="back-link">← Back to Tools</Link>
      </nav>

      <div className="biquad-container">
        <header className="biquad-header">
          <h1>🎛️ Biquad Filter Algorithm</h1>
          <p className="biquad-subtitle">
            Interactive step-by-step visualization of how biquad filters process audio
          </p>
        </header>

        {/* Controls */}
        <div className="biquad-controls">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`control-btn primary ${isPlaying ? 'playing' : ''}`}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button
            onClick={() => { setStep(0); setIsPlaying(false); }}
            className="control-btn secondary"
          >
            <RotateCcw size={20} />
            Reset
          </button>
          <select 
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="speed-select"
          >
            <option value={2000}>Slow</option>
            <option value={1000}>Normal</option>
            <option value={500}>Fast</option>
          </select>
        </div>

        {/* Step indicator */}
        <div className="step-indicators">
          {steps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => { setStep(idx); setIsPlaying(false); }}
              className={`step-btn ${idx === step ? 'active' : ''}`}
            >
              {idx + 1}
            </button>
          ))}
        </div>

        {/* Current step info */}
        <div className="step-info">
          <h2>{currentStep.title}</h2>
          <p>{currentStep.description}</p>
          {currentStep.equation && (
            <div className="equation-box">
              {currentStep.equation}
            </div>
          )}
        </div>

        {/* Visual diagram */}
        <div className="diagram-container">
          <svg viewBox="0 0 800 500" className="biquad-diagram">
            {/* Input signal */}
            <g className={`diagram-group ${currentStep.highlight === 'input' ? 'highlighted' : ''}`}>
              <rect x="20" y="230" width="80" height="40" fill="#00f5ff" rx="5"/>
              <text x="60" y="255" textAnchor="middle" fill="#0a0a0f" fontSize="16" fontWeight="bold">
                x[n]
              </text>
              <text x="60" y="285" textAnchor="middle" fill="#00f5ff" fontSize="14">
                {x[currentIndex].toFixed(2)}
              </text>
              <line x1="100" y1="250" x2="140" y2="250" stroke="#00f5ff" strokeWidth="3" markerEnd="url(#arrowcyan)"/>
            </g>

            {/* Delay blocks for x */}
            <g className={`diagram-group ${currentStep.highlight === 'delays-x' ? 'highlighted' : ''}`}>
              <rect x="140" y="230" width="70" height="40" fill="#a855f7" rx="5"/>
              <text x="175" y="255" textAnchor="middle" fill="white" fontSize="14">z⁻¹</text>
              <text x="175" y="210" textAnchor="middle" fill="#c084fc" fontSize="12" fontWeight="bold">
                x[n-1]={x1.toFixed(2)}
              </text>
              
              <line x1="210" y1="250" x2="250" y2="250" stroke="#c084fc" strokeWidth="2"/>
              
              <rect x="250" y="230" width="70" height="40" fill="#a855f7" rx="5"/>
              <text x="285" y="255" textAnchor="middle" fill="white" fontSize="14">z⁻¹</text>
              <text x="285" y="210" textAnchor="middle" fill="#c084fc" fontSize="12" fontWeight="bold">
                x[n-2]={x2.toFixed(2)}
              </text>
            </g>

            {/* Multipliers (feedforward) */}
            <g className={`diagram-group ${currentStep.highlight === 'feedforward' ? 'highlighted' : ''}`}>
              <circle cx="175" cy="150" r="20" fill="#22c55e" stroke="white" strokeWidth="2"/>
              <text x="175" y="155" textAnchor="middle" fill="white" fontSize="12">b₁</text>
              <line x1="175" y1="230" x2="175" y2="170" stroke="#4ade80" strokeWidth="2"/>
              
              <circle cx="285" cy="150" r="20" fill="#22c55e" stroke="white" strokeWidth="2"/>
              <text x="285" y="155" textAnchor="middle" fill="white" fontSize="12">b₂</text>
              <line x1="285" y1="230" x2="285" y2="170" stroke="#4ade80" strokeWidth="2"/>
              
              <circle cx="60" cy="150" r="20" fill="#22c55e" stroke="white" strokeWidth="2"/>
              <text x="60" y="155" textAnchor="middle" fill="white" fontSize="12">b₀</text>
              <line x1="60" y1="230" x2="60" y2="170" stroke="#4ade80" strokeWidth="2"/>
            </g>

            {/* Summer (feedforward) */}
            <g className={`diagram-group ${currentStep.highlight === 'feedforward' ? 'highlighted' : ''}`}>
              <circle cx="400" cy="150" r="25" fill="#1a1a24" stroke="#22c55e" strokeWidth="3"/>
              <text x="400" y="157" textAnchor="middle" fill="#22c55e" fontSize="20">Σ</text>
              <line x1="60" y1="150" x2="375" y2="150" stroke="#4ade80" strokeWidth="2"/>
            </g>

            {/* Delay blocks for y (feedback) */}
            <g className={`diagram-group ${currentStep.highlight === 'delays-y' ? 'highlighted' : ''}`}>
              <rect x="550" y="300" width="70" height="40" fill="#ff00aa" rx="5"/>
              <text x="585" y="325" textAnchor="middle" fill="white" fontSize="14">z⁻¹</text>
              <text x="585" y="360" textAnchor="middle" fill="#ff66cc" fontSize="12" fontWeight="bold">
                y[n-1]={y1.toFixed(2)}
              </text>
              
              <line x1="620" y1="320" x2="660" y2="320" stroke="#ff66cc" strokeWidth="2"/>
              
              <rect x="660" y="300" width="70" height="40" fill="#ff00aa" rx="5"/>
              <text x="695" y="325" textAnchor="middle" fill="white" fontSize="14">z⁻¹</text>
              <text x="695" y="360" textAnchor="middle" fill="#ff66cc" fontSize="12" fontWeight="bold">
                y[n-2]={y2.toFixed(2)}
              </text>
            </g>

            {/* Multipliers (feedback) */}
            <g className={`diagram-group ${currentStep.highlight === 'feedback' ? 'highlighted' : ''}`}>
              <circle cx="585" cy="400" r="20" fill="#ff6b35" stroke="white" strokeWidth="2"/>
              <text x="585" y="405" textAnchor="middle" fill="white" fontSize="12">-a₁</text>
              <line x1="585" y1="340" x2="585" y2="380" stroke="#ff8c5a" strokeWidth="2"/>
              
              <circle cx="695" cy="400" r="20" fill="#ff6b35" stroke="white" strokeWidth="2"/>
              <text x="695" y="405" textAnchor="middle" fill="white" fontSize="12">-a₂</text>
              <line x1="695" y1="340" x2="695" y2="380" stroke="#ff8c5a" strokeWidth="2"/>
            </g>

            {/* Final summer */}
            <g className={`diagram-group ${currentStep.highlight === 'output' ? 'highlighted' : ''}`}>
              <circle cx="500" cy="250" r="30" fill="#1a1a24" stroke="#ff6b35" strokeWidth="3"/>
              <text x="500" y="258" textAnchor="middle" fill="#ff6b35" fontSize="24" fontWeight="bold">Σ</text>
              <line x1="425" y1="150" x2="470" y2="150" stroke="#4ade80" strokeWidth="2"/>
              <line x1="470" y1="150" x2="470" y2="230" stroke="#4ade80" strokeWidth="2"/>
              <line x1="470" y1="230" x2="475" y2="230" stroke="#4ade80" strokeWidth="2"/>
              
              <line x1="585" y1="420" x2="585" y2="440" stroke="#ff8c5a" strokeWidth="2"/>
              <line x1="585" y1="440" x2="520" y2="440" stroke="#ff8c5a" strokeWidth="2"/>
              <line x1="520" y1="440" x2="520" y2="270" stroke="#ff8c5a" strokeWidth="2"/>
              
              <line x1="695" y1="420" x2="695" y2="450" stroke="#ff8c5a" strokeWidth="2"/>
              <line x1="695" y1="450" x2="510" y2="450" stroke="#ff8c5a" strokeWidth="2"/>
              <line x1="510" y1="450" x2="510" y2="270" stroke="#ff8c5a" strokeWidth="2"/>
            </g>

            {/* Output */}
            <g className={`diagram-group ${currentStep.highlight === 'output' ? 'highlighted' : ''}`}>
              <line x1="530" y1="250" x2="545" y2="250" stroke="#ff6b35" strokeWidth="3"/>
              <line x1="545" y1="250" x2="545" y2="320" stroke="#ff6b35" strokeWidth="3"/>
              <line x1="545" y1="320" x2="550" y2="320" stroke="#ff6b35" strokeWidth="3"/>
              
              <rect x="700" y="230" width="80" height="40" fill="#ff6b35" rx="5"/>
              <text x="740" y="255" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">
                y[n]
              </text>
              <text x="740" y="285" textAnchor="middle" fill="#ffc9a3" fontSize="14">
                {yn.toFixed(2)}
              </text>
              <line x1="620" y1="320" x2="620" y2="250" stroke="#ff6b35" strokeWidth="2"/>
              <line x1="620" y1="250" x2="700" y2="250" stroke="#ff6b35" strokeWidth="2"/>
            </g>

            {/* Arrow marker */}
            <defs>
              <marker id="arrowcyan" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill="#00f5ff" />
              </marker>
            </defs>
          </svg>
        </div>

        {/* The equation */}
        <div className="equation-section">
          <h3>The Biquad Difference Equation:</h3>
          <div className="main-equation">
            y[n] = b₀·x[n] + b₁·x[n-1] + b₂·x[n-2] - a₁·y[n-1] - a₂·y[n-2]
          </div>
          <div className="coefficients-grid">
            <div className="coef-group feedforward">
              <p className="coef-label">Feedforward (FIR part):</p>
              <p className="coef-values">b₀, b₁, b₂ = {b0.toFixed(3)}, {b1.toFixed(3)}, {b2.toFixed(3)}</p>
            </div>
            <div className="coef-group feedback">
              <p className="coef-label">Feedback (IIR part):</p>
              <p className="coef-values">a₁, a₂ = {a1.toFixed(3)}, {a2.toFixed(3)}</p>
            </div>
          </div>
        </div>

        {/* Key insights */}
        <div className="insights-box">
          <h3>💡 Key Insights:</h3>
          <ul>
            <li><strong>Second-order filter:</strong> Uses 2 past inputs and 2 past outputs</li>
            <li><strong>IIR (Infinite Impulse Response):</strong> The feedback creates infinite memory</li>
            <li><strong>Efficient:</strong> Only 5 multiplications and 4 additions per sample!</li>
            <li><strong>Stable:</strong> When coefficients are chosen correctly, produces clean audio</li>
            <li><strong>Versatile:</strong> Same structure for lowpass, highpass, bandpass, notch, peaking filters</li>
          </ul>
        </div>
      </div>
    </div>
  );
}


