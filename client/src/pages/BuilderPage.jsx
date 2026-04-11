import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContext } from '../context/ToastContext.jsx';
import ChatMessage from '../components/ChatMessage.jsx';
import ChatInput from '../components/ChatInput.jsx';
import CodeEditor from '../components/CodeEditor.jsx';
import LivePreview from '../components/LivePreview.jsx';
import { getProject, updateProject } from '../services/projectService.js';
import { generateCode } from '../services/generationService.js';
import '../styles/builder.css';

function BuilderPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useContext(ToastContext);

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('preview');
  const [editedCode, setEditedCode] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await getProject(projectId);
        setProject(data);
        setEditedCode(data.generatedCode);
        setLoading(false);
      } catch (error) {
        showToast('Failed to load project', 'error');
        navigate('/dashboard');
      }
    };

    fetchProject();
  }, [projectId, navigate, showToast]);

  const handleSend = async (prompt) => {
    try {
      setGenerating(true);

      // Add user message optimistically
      const newMessages = [
        ...project.messages,
        {
          role: 'user',
          content: prompt,
          timestamp: new Date(),
        },
      ];

      setProject({ ...project, messages: newMessages });

      const result = await generateCode(projectId, prompt);

      setProject({
        ...result.project,
        messages: result.project.messages,
        generatedCode: result.code,
      });

      setEditedCode(result.code);
      setActiveTab('preview');
      showToast('Code generated successfully!', 'success');
    } catch (error) {
      // Remove optimistic user message on error
      setProject({
        ...project,
        messages: project.messages.slice(0, -1),
      });
      showToast(
        error.response?.data?.message || 'Failed to generate code',
        'error'
      );
    } finally {
      setGenerating(false);
    }
  };

  const handleTitleChange = async (newTitle) => {
    try {
      const updated = await updateProject(projectId, { title: newTitle });
      setProject(updated);
    } catch (error) {
      showToast('Failed to update title', 'error');
    }
  };

  const handleDownload = () => {
    if (!editedCode) {
      showToast('No code to download', 'error');
      return;
    }

    const element = document.createElement('a');
    const file = new Blob([editedCode], { type: 'text/html' });
    element.href = URL.createObjectURL(file);
    element.download = `${project.title || 'app'}.html`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    showToast('Code downloaded!', 'success');
  };

  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="builder-page">
      <div className="builder-header">
        <input
          type="text"
          value={project.title}
          onChange={(e) => handleTitleChange(e.target.value)}
          className="builder-title-input"
        />
        <button onClick={handleDownload} className="builder-download-btn">
          ⬇ Download
        </button>
      </div>

      <div className="builder-container">
        {/* Left Panel - Chat */}
        <div className="builder-left">
          <div className="builder-chat-header">
            <h2>Chat</h2>
          </div>

          <div className="builder-chat-messages">
            {project.messages.length === 0 ? (
              <div className="builder-chat-empty">
                <p>Start by describing what you want to build</p>
                <div className="builder-example-chips">
                  <button
                    onClick={() =>
                      handleSend(
                        'Create a modern landing page with a hero section, features, and a call-to-action button'
                      )
                    }
                    className="builder-chip"
                  >
                    Landing Page
                  </button>
                  <button
                    onClick={() =>
                      handleSend(
                        'Build a portfolio website showcasing projects with a dark theme'
                      )
                    }
                    className="builder-chip"
                  >
                    Portfolio
                  </button>
                  <button
                    onClick={() =>
                      handleSend('Create a to-do list app with add, delete, and mark complete features')
                    }
                    className="builder-chip"
                  >
                    To-Do List
                  </button>
                </div>
              </div>
            ) : (
              project.messages.map((msg, idx) => (
                <ChatMessage key={idx} message={msg} />
              ))
            )}

            {generating && (
              <div className="builder-typing-indicator">
                <div className="typing-dot" />
                <div className="typing-dot" />
                <div className="typing-dot" />
              </div>
            )}
          </div>

          <ChatInput
            onSend={handleSend}
            loading={generating}
            disabled={!project}
          />
        </div>

        {/* Right Panel - Preview/Code */}
        <div className="builder-right">
          <div className="builder-tabs">
            <button
              className={`builder-tab ${activeTab === 'preview' ? 'active' : ''}`}
              onClick={() => setActiveTab('preview')}
            >
              👁️ Preview
            </button>
            <button
              className={`builder-tab ${activeTab === 'code' ? 'active' : ''}`}
              onClick={() => setActiveTab('code')}
            >
              {'<>'} Code
            </button>
          </div>

          <div className="builder-content">
            {activeTab === 'preview' ? (
              <LivePreview code={editedCode} />
            ) : (
              <CodeEditor
                code={editedCode}
                onChange={setEditedCode}
                readOnly={false}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuilderPage;
