import NoteForm from '../components/NoteForm'
import { styled } from 'styled-components'

export default function NewNote() {
  return (
    <Container>
      <h1>New Note 📝</h1>
      <NoteForm type="add" />
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
