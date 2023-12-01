import NoteForm from '../components/NoteForm'
import { styled } from 'styled-components'
import { NoteData } from '../App'
export type NewNoteProps = {
  createNote: (data: NoteData) => void
}
export default function NewNote({ createNote }: NewNoteProps) {
  return (
    <Container>
      <h1>New Note 📝</h1>
      <NoteForm createNote={createNote} />
    </Container>
  )
}

const Container = styled.div`
  max-width: 900px;
  padding: 0px 20px;
  margin: 0 auto;

  h1 {
    font-size: 48px;
    font-weight: 700;
    margin: 40px 0;
  }
`
