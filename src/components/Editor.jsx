import React, { useEffect, useState } from 'react'
import '../index.css'
import useLocalStorage from './storage';

function Editor() {
    const [html, setHtml] = useLocalStorage('html', '');
    const [css, setCss] = useLocalStorage('css', '');
    const [js, setJs] = useLocalStorage('js', '');
    const [srcCode, setSrcCode] = useState('');

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSrcCode(`
            <html>
                <style>${css}</style>
                <script>${js}</script>
                <body>${html}</body>
            </html>
            `)
        }, 200)

        return () => clearTimeout(timeout)
    }, [html, css, js])

    return (
        <div className='wrapper'>
            <div className='header'>
                <span>Live Code Editor</span>
            </div>

            <div className='input-cover'>
                <div className='editor-cover'>
                    <span className='editor-title'>HTML</span>
                    <textarea value={html} type='text' placeholder='HTML' className='input' onChange={(e) => setHtml(e.target.value)} />
                </div>
                
                <div className='width' />
                <div className='editor-cover'>
                    <span className='editor-title'>CSS</span>
                    <textarea value={css} type='text' placeholder='CSS' className='input' onChange={(e) => setCss(e.target.value)} />
                </div>
                
                <div className='width' />
                <div className='editor-cover'>
                    <span className='editor-title'>JavaScript</span>
                    <textarea value={js} type='text' placeholder='JavaScript' className='input' onChange={(e) => setJs(e.target.value)} />
                </div>
                <div className='width' />
            </div>

            <div className='output'>
                <iframe
                    srcDoc={srcCode}
                    title='output'
                    sandbox='allow-scripts'
                    frameBorder='0'
                    width='100%'
                    height='100%'
                />
            </div>
        </div>

    )
}

export default Editor