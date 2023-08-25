import React, { useEffect, useState } from 'react'
import '../index.css'
import useLocalStorage from './storage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompressAlt, faExpandAlt } from '@fortawesome/free-solid-svg-icons'

function Editor() {
    const [html, setHtml] = useLocalStorage('html', '');
    const [css, setCss] = useLocalStorage('css', '');
    const [js, setJs] = useLocalStorage('js', '');
    const [srcCode, setSrcCode] = useState('');

    const [openHtml, setOpenHtml] = useState(true)
    const [openCss, setOpenCss] = useState(true)
    const [openJs, setOpenJs] = useState(true)

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
                <div className={`editor-cover ${openHtml ? '' : 'html-collapsed'}`}>
                    <div className='editor-title'>
                        HTML
                        <button
                            type="button"
                            className="expand-collapse-btn"
                            onClick={() => setOpenHtml(prevOpen => !prevOpen)}
                        >
                            <FontAwesomeIcon icon={openHtml ? faCompressAlt : faExpandAlt} />
                        </button>
                    </div>
                    <textarea value={html} type='text' placeholder='HTML' className='input' onChange={(e) => setHtml(e.target.value)} />
                </div>

                <div className='width' />
                <div className={`editor-cover ${openCss ? '' : 'css-collapsed'}`}>
                    <div className='editor-title'>CSS
                        <button
                            type="button"
                            className="expand-collapse-btn"
                            onClick={() => setOpenCss(prevOpen => !prevOpen)}
                        >
                            <FontAwesomeIcon icon={openCss ? faCompressAlt : faExpandAlt} />
                        </button>
                    </div>
                    <textarea value={css} type='text' placeholder='CSS' className='input' onChange={(e) => setCss(e.target.value)} />
                </div>

                <div className='width' />
                <div className={`editor-cover ${openJs ? '' : 'js-collapsed'}`}>
                    <div className='editor-title'>
                        JavaScript
                        <button
                            type="button"
                            className="expand-collapse-btn"
                            onClick={() => setOpenJs(prevOpen => !prevOpen)}
                        >
                            <FontAwesomeIcon icon={openJs ? faCompressAlt : faExpandAlt} />
                        </button>
                    </div>
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