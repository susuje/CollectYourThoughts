import { createSlice } from '@reduxjs/toolkit'
import { NoteData } from '../App'
const getInitialNote = () => {
  const localNoteList = localStorage.getItem('notes')

  if (localNoteList) {
    //만약 저장된 노트가 있다면 그걸 반환
    return JSON.parse(localNoteList)
  }
  localStorage.setItem('notes', JSON.stringify([]))
  return []
}

const initialValue = {
  noteList: getInitialNote(), //localStorage.getItem('notes');
}

export const noteSlice = createSlice({
  name: 'note',
  initialState: initialValue,
  reducers: {
    addNote: (state, action) => {
      state.noteList.push(action.payload) //store에 저장
      const noteList = localStorage.getItem('notes')
      if (noteList) {
        //로컬에 저장
        const noteListArr = JSON.parse(noteList)
        noteListArr.push({
          ...action.payload,
        })
        localStorage.setItem('notes', JSON.stringify(noteListArr))
      } else {
        localStorage.setItem(
          'notes',
          JSON.stringify([
            {
              ...action.payload,
            },
          ])
        )
      }
    },
    updateNote: (state, action) => {
      const noteList = window.localStorage.getItem('notes')
      if (noteList) {
        const noteListArr = JSON.parse(noteList)
        noteListArr.forEach((note: NoteData) => {
          if (note.id === action.payload.id) {
            note.title = action.payload.title
            note.content = action.payload.content
            note.tags = action.payload.tags
            note.createdAt = action.payload.createdAt
          }
        })
        localStorage.setItem('notes', JSON.stringify(noteListArr))
        state.noteList = [...noteListArr]
      }
    },
    deleteNote: (state, action) => {
      const noteList = window.localStorage.getItem('notes')
      if (noteList) {
        const noteListArr = JSON.parse(noteList)
        noteListArr.forEach((note: NoteData, index: number) => {
          //console.log(note.id, action.payload)
          if (note.id == action.payload) {
            noteListArr.splice(index, 1)
          }
        })
        window.localStorage.setItem('notes', JSON.stringify(noteListArr))
        state.noteList = noteListArr
      }
    },
  },
})
export const { addNote, updateNote, deleteNote } = noteSlice.actions
export default noteSlice.reducer
