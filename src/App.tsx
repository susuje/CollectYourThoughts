import { Routes, Route, Navigate } from 'react-router-dom'
//import { useState, useEffect } from 'react'

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
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/new" element={<NewNote />} />
      <Route path="/:id">
        <Route index element={<Detail />} />
        <Route path="edit" element={<Edit />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App

//index는 id를 뜻함!
//  /:id/edit
