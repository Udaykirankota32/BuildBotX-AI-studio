import { useEffect, useRef, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContext } from '../context/ToastContext.jsx';
import { createProject } from '../services/projectService.js';
import { generateCode } from '../services/generationService.js';
import CodeEditor from '../components/CodeEditor.jsx';
import LivePreview from '../components/LivePreview.jsx';
import '../styles/codeGenerator.css';

function CodeGeneratorPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useContext(ToastContext);
  const initialPrompt = location.state?.initialPrompt || '';
  const didAutoRun = useRef(false);

  const [project, setProject] = useState(null);
  const [prompt, setPrompt] = useState(initialPrompt);
  const [loadingProject, setLoadingProject] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('preview');
  const [generatedCode, setGeneratedCode] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const setupProject = async () => {
      try {
        const createdProject = await createProject('Code Generator');
        setProject(createdProject);
      } catch (projectError) {
        showToast('Failed to initialize generator', 'error');
        navigate('/dashboard');
      } finally {
        setLoadingProject(false);
      }
    };

    setupProject();
  }, [navigate, showToast]);

  useEffect(() => {
    if (project && prompt && initialPrompt && !didAutoRun.current) {
      didAutoRun.current = true;
      handleGenerate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project, initialPrompt]);

  const handleGenerate = async () => {
    const trimmedPrompt = prompt.trim();
    if (!trimmedPrompt || !project) {
      showToast('Please enter a prompt first.', 'error');
      return;
    }

    try {
      setGenerating(true);
      setError('');
      const result = await generateCode(project._id, trimmedPrompt);
      setGeneratedCode(result.code || '');
      setActiveTab('preview');
      showToast('Code generated successfully!', 'success');
    } catch (generationError) {
      const message = generationError.response?.data?.message || 'Failed to generate code';
      setError(message);
      showToast(message, 'error');
    } finally {
      setGenerating(false);
    }
  };

  const handlePromptKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      showToast('Code copied to clipboard', 'success');
    } catch {
      showToast('Unable to copy code', 'error');
    }
  };

  const handleDownload = () => {
    if (!generatedCode) {
      showToast('No code to download', 'error');
      return;
    }

    const element = document.createElement('a');
    const file = new Blob([generatedCode], { type: 'text/html' });
    element.href = URL.createObjectURL(file);
    element.download = `${project?.title || 'generated-app'}.html`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (loadingProject) {
    return (
      <div className="loading-state">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="code-generator-page">
      <div className="code-generator-shell">
        <section className="code-generator-input-panel">
          <div className="code-generator-header">
            <span className="code-generator-badge">AI Code Generator</span>
            <h1>Describe your app</h1>
            <p>
              Enter a prompt and let BuildBot generate a working app with live preview.
            </p>
          </div>

          <label className="code-generator-label" htmlFor="generator-prompt">
            Project prompt
          </label>
          <textarea
            id="generator-prompt"
            className="code-generator-textarea"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handlePromptKeyDown}
            placeholder="Ask AI to build your website..."
            rows="10"
          />

          {error && <div className="code-generator-error">{error}</div>}

          <div className="code-generator-actions">
            <button
              className="code-generator-button"
              onClick={handleGenerate}
              disabled={generating}
            >
              {generating ? 'Generating...' : 'Generate Code'}
            </button>
            <button className="code-generator-secondary" onClick={handleCopy} disabled={!generatedCode}>
              Copy Code
            </button>
            <button className="code-generator-secondary" onClick={handleDownload} disabled={!generatedCode}>
              Download
            </button>
          </div>
        </section>

        <section className="code-generator-output-panel">
          <div className="code-generator-tabs">
            <button
              className={`code-generator-tab ${activeTab === 'preview' ? 'active' : ''}`}
              onClick={() => setActiveTab('preview')}
            >
              Preview
            </button>
            <button
              className={`code-generator-tab ${activeTab === 'code' ? 'active' : ''}`}
              onClick={() => setActiveTab('code')}
            >
              Code
            </button>
          </div>

          <div className="code-generator-output">
            {activeTab === 'preview' ? (
              <LivePreview code={generatedCode} />
            ) : (
              <CodeEditor code={generatedCode} onChange={setGeneratedCode} readOnly={false} />
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default CodeGeneratorPage;
