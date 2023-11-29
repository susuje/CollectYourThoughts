import NoteForm from '../components/NoteForm'
import { styled } from 'styled-components'

export default function NewNote() {
  return (
    <Container>
      <h1>New Note 📝</h1>
      <NoteForm />
    </Container>
  )
}

const Container = styled.div`
  max-width: 900px;
  padding: 0px 20px;
  margin: 0 auto;
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.7),
    rgba(255, 255, 255, 0.3)
  );

  h1 {
    font-size: 48px;
    font-weight: 700;
    margin: 40px 0;
  }
`
