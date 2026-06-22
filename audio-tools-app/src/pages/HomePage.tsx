import { Link } from 'react-router-dom';
import './HomePage.css';

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  path: string;
  gradient: string;
  tags: string[];
}

const tools: Tool[] = [
  {
    id: 'lfo-effects',
    name: 'LFO Effects',
    description: 'Explore tremolo, ring modulation, and frequency modulation with interactive controls and real-time visualization.',
    icon: '〰️',
    path: '/tools/lfo-effects',
    gradient: 'linear-gradient(135deg, #00f5ff 0%, #a855f7 100%)',
    tags: ['Modulation', 'Synthesis', 'Interactive'],
  },
  {
    id: 'biquad-visualizer',
    name: 'Biquad Filter',
    description: 'Step-by-step visualization of how biquad filters process audio. Learn about IIR filters, feedforward and feedback paths.',
    icon: '🎛️',
    path: '/tools/biquad-visualizer',
    gradient: 'linear-gradient(135deg, #22c55e 0%, #ff6b35 100%)',
    tags: ['Filters', 'DSP', 'Educational'],
  },
];

export default function HomePage() {
  return (
    <div className="home-page">
      <header className="hero">
        <div className="hero-content">
          <div className="hero-badge">🎧 Audio Experiments</div>
          <h1 className="hero-title">
            <span className="gradient-text">Audio Tools</span>
            <br />
            Laboratory
          </h1>
          <p className="hero-subtitle">
            Explore the science of sound. Interactive tools to experiment with 
            synthesis, effects, and audio processing concepts.
          </p>
        </div>
        
        <div className="hero-visual">
          <div className="waveform-decoration">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i} 
                className="wave-bar" 
                style={{ 
                  height: `${Math.sin(i * 0.5) * 30 + 50}%`,
                  animationDelay: `${i * 0.1}s`
                }} 
              />
            ))}
          </div>
        </div>
      </header>

      <main className="tools-section">
        <div className="section-header">
          <h2>Available Tools</h2>
          <p>Click on a tool to start experimenting</p>
        </div>

        <div className="tools-grid">
          {tools.map((tool) => (
            <Link to={tool.path} key={tool.id} className="tool-card">
              <div className="tool-icon" style={{ background: tool.gradient }}>
                <span>{tool.icon}</span>
              </div>
              <div className="tool-content">
                <h3>{tool.name}</h3>
                <p>{tool.description}</p>
                <div className="tool-tags">
                  {tool.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="tool-arrow">→</div>
            </Link>
          ))}

          {/* Coming Soon Placeholder */}
          <div className="tool-card coming-soon">
            <div className="tool-icon placeholder">
              <span>🔮</span>
            </div>
            <div className="tool-content">
              <h3>More Coming Soon</h3>
              <p>New audio tools and experiments are being developed. Stay tuned!</p>
              <div className="tool-tags">
                <span className="tag">Coming Soon</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="home-footer">
        <p>Built for audio enthusiasts and curious minds 🎵</p>
      </footer>
    </div>
  );
}

