import React, { useEffect, useState } from 'react'
import '../index.css'

function Editor() {
    const [html, setHtml] = useState('');
    const [css, setCss] = useState('');
    const [js, setJs] = useState('');
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
                <span>Live Editor</span>
            </div>

            <div className='input-cover'>
                <div className='editor-title'>HTML
                
                <textarea value={html} type='text' placeholder='HTML' onChange={(e) => setHtml(e.target.value)} />
                </div>
                <textarea value={css} type='text' placeholder='CSS' onChange={(e) => setCss(e.target.value)} />
                <textarea value={js} type='text' placeholder='JavaScript' onChange={(e) => setJs(e.target.value)} />
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