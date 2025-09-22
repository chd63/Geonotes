import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./CountryPage.css";
import { Link } from 'react-router-dom';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { Responsive, WidthProvider } from 'react-grid-layout';
const ResponsiveGridLayout = WidthProvider(Responsive);

function CountryPage() {
    const defaultLayouts = {
        lg: [
            { i: 'general', x: 0, y: 0, w: 4, h: 5 },
            { i: 'notes', x: 4, y: 0, w: 4, h: 5 },
            { i: 'social', x: 8, y: 0, w: 4, h: 5 },
        ],
        md: [
            { i: 'general', x: 0, y: 0, w: 6, h: 10 },
            { i: 'notes', x: 6, y: 0, w: 6, h: 10 },
            { i: 'social', x: 0, y: 10, w: 12, h: 10 },
        ],
        sm: [
            { i: 'general', x: 0, y: 0, w: 12, h: 10 },
            { i: 'notes', x: 0, y: 10, w: 12, h: 10 },
            { i: 'social', x: 0, y: 20, w: 12, h: 10 },
        ],
    };

    const [isLocked, setIsLocked] = useState(false);
    const [currentLayout, setCurrentLayout] = useState(defaultLayouts.lg);
    const [userLayout, setUserLayout] = useState(null);
    const containerRef = useRef(null);
    const [containerWidth, setContainerWidth] = useState(1200);
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState("");
    const [newNoteImages, setNewNoteImages] = useState([]);

    // Load saved layout from localStorage on mount
    useEffect(() => {
        const savedLayout = localStorage.getItem('savedLayout');
        if (savedLayout) {
            const parsed = JSON.parse(savedLayout);
            setCurrentLayout(parsed);
            setUserLayout(parsed);
            setIsLocked(true); // auto-lock if saved
        }
    }, []);

    useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
        };
        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    const { countryName } = useParams();

    const toggleLock = () => {
        if (!isLocked) {
            // Lock current layout
            setUserLayout(currentLayout);
            localStorage.setItem('savedLayout', JSON.stringify(currentLayout));
        }
        setIsLocked(!isLocked);
    };

    const resetToDefault = () => {

        const width = containerRef.current?.offsetWidth || window.innerWidth;
        let newLayout;
        if (width >= 1200) {
            newLayout = defaultLayouts.lg;
        } else if (width >= 768) {
            newLayout = defaultLayouts.md;
        } else {
            newLayout = defaultLayouts.sm;
        }

        setCurrentLayout(newLayout);
        setUserLayout(null);
        localStorage.removeItem('savedLayout');
        setIsLocked(true);
    };

    const handlePaste = (e) => {
        const items = e.clipboardData.items;
        for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf("image") !== -1) {
                const blob = items[i].getAsFile();
                const imgURL = URL.createObjectURL(blob);
                setNewNoteImages((prev) => [...prev, imgURL]);
            }
        }
    };

    const addNote = () => {
        if (newNote.trim() === "" && newNoteImages.length === 0) return;

        const note = {
            id: Date.now(),
            text: newNote,
            images: newNoteImages,
        };

        setNotes((prev) => [...prev, note]);
        setNewNote("");
        setNewNoteImages([]);
    };

    const deleteNote = (id) => {
        setNotes((prev) => prev.filter((note) => note.id !== id));
    };


    return (
        <div className="country-page-container">
            <div className="top-header">
                <Link to="/" className="home_button">Home</Link>
                <button onClick={toggleLock}>{isLocked ? "Unlock Layout" : "Lock Layout"}</button>
                <button onClick={resetToDefault}>Reset to Default Layout</button>
                <h1 className="header_name">Notes for {countryName}</h1>
                <Link to="/" className="login_button">Log In</Link>
            </div>

            <div ref={containerRef} className="main-content-row">
                {isLocked ? (
                    <GridLayout
                        className="main-content-row"
                        layout={currentLayout}
                        cols={12}
                        width={containerWidth}
                        rowHeight={containerWidth / 12}
                        isDraggable={false}
                        isResizable={false}
                        compactType={null}
                        preventCollision={true}
                    >
                        <div key="general" className="general-info-container">
                            <h2>Parsed Info</h2>
                        </div>
                        <div key="notes" className="notes-container">
                            <h2>Notes</h2>
                            <button onClick={addNote}>Submit</button>

                            <textarea 
                                className="notes-textarea" 
                                placeholder="write something and/or paste an image ..."
                                value={newNote}
                                onChange= {(e) => setNewNote(e.target.value)}
                                onPaste={handlePaste}
                            />

                            <div className="note-preview-images">
                                {newNoteImages.map((img, idx) => (
                                    <img key={idx} src={img} alt="preview" className="note-image-preview" />
                                ))}
                            </div>

                            <div className="notes-list">
                            {notes.map((note) => (
                                <div key={note.id} className="note-item">
                                    {note.text && <p>{note.text}</p>}
                                    {note.images && note.images.map((img, idx) => (
                                        <img key={idx} src={img} alt="note" className="note-image" />
                                    ))}
                                    <button 
                                        className="delete-note-btn"
                                        onClick={() => deleteNote(note.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                                ))}
                            </div>
                        </div>
                        <div key="social" className="social-container">
                            <h2>Social</h2>
                        </div>
                    </GridLayout>
                ) : (
                    <ResponsiveGridLayout
                        className="main-content-row"
                        layouts={{ lg: currentLayout }}
                        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                        cols={{ lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 }}
                        isDraggable={true}
                        isResizable={true}
                        onLayoutChange={(layout) => setCurrentLayout(layout)}
                    >
                        <div key="general" className="general-info-container">
                            <h2>Parsed Info</h2>
                            <p className="reminder-text">
                                *modules will most likely look the best in default configurations
                            </p>
                            <p className="reminder-text">
                                *remember please lock before you use the modules, issues may arise, and you have to
                                deal with an annoying highlight
                            </p>
                        </div>
                        <div key="notes" className="notes-container">
                            <h2>Notes</h2>
                            <p className="reminder-text">
                                *modules will most likely look the best in default configurations
                            </p>
                            <p className="reminder-text">
                                *remember please lock before you use the modules, issues may arise, and you have to
                                deal with an annoying highlight
                            </p>
                            <textarea className="notes-textarea" placeholder="write something ..." />
                            <button>Submit</button>
                        </div>
                        <div key="social" className="social-container">
                            <h2>Social</h2>
                            <p className="reminder-text">
                                *modules will most likely look the best in default configurations
                            </p>
                            <p className="reminder-text">
                                *remember please lock before you use the modules, issues may arise, and you have to
                                deal with an annoying highlight
                            </p>
                        </div>
                    </ResponsiveGridLayout>
                )}
            </div>
        </div>
    );
}

export default CountryPage;
