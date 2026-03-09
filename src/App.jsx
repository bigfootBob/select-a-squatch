import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import IntroForm from './components/IntroForm';
import ChapterView from './components/ChapterView';
import { StoryProvider } from './context/StoryContext';
import './index.scss';

function App() {
    return (
        <StoryProvider>
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/" element={<IntroForm />} />
                        <Route path="/chapter/:chapterId" element={<ChapterView />} />
                    </Routes>
                </Layout>
            </Router>
        </StoryProvider>
    );
}

export default App;
