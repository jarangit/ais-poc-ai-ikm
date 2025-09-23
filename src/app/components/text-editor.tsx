'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import Color from '@tiptap/extension-color'
import { TextStyle } from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'

export default function EditorPage() {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3], // limit h1, h2, h3
        },
      }),
      Highlight,
      Color,
      TextStyle,
      Underline,
    ],
    content: `
      <h1>Welcome to Tiptap</h1>
      <p>You can write <u>underlined</u>, <mark>highlighted</mark>, or <span style="color:red">colored</span> text here!</p>
    `,
    autofocus: 'end',
    editable: true,
    immediatelyRender: false, // กัน hydration mismatch
  })

  return (
    <div className="p-6 max-w-2xl mx-auto">
     
      {editor ? <EditorContent editor={editor} /> : <p>Loading editor…</p>}
    </div>
  )
}