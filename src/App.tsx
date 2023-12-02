import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

import NewNote from './pages/NewNote'
import Home from './pages/Home'
import Detail from './pages/Detail'
import Edit from './pages/Edit'

export type NoteData = {
  id: number
  title: string
  content: string
  tags: string[]
  createdAt: string
}

function App() {
  const [allNotes, setAllNotes] = useState<NoteData[]>(() => {
    const savedNotes = localStorage.getItem('notes')
    if (savedNotes) {
      return JSON.parse(savedNotes)
    } else {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(allNotes))
  }, [allNotes])

  const createNote = (data: NoteData) => {
    setAllNotes(prev => [...prev, data])
  }

  const deleteNote = (data: NoteData) => {
    setAllNotes(allNotes.filter((el: NoteData) => el.id !== data.id))
  }

  const editNote = (data: NoteData) => {
    setAllNotes(prev => {
      return prev.map(note => {
        if (note.id === data.id) {
          return data //수정된걸 반환
        } else {
          return note //수정안한건 그대로 반환
        }
      })
    })
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/new" element={<NewNote createNote={createNote} />} />
      <Route path="/:id">
        <Route index element={<Detail deleteNote={deleteNote} />} />
        <Route path="edit" element={<Edit editNote={editNote} />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App

//index는 id를 뜻함!
//  /:id/edit
