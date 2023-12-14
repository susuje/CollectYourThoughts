import NoteForm from '../components/NoteForm'
import { styled } from 'styled-components'

import { useLocation } from 'react-router-dom'

export default function Edit() {
  const location = useLocation()
  const { detail } = location.state

  return (
    <Container>
      <h1>Edit Note 📝</h1>
      <NoteForm type="edit" detail={detail} />
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
