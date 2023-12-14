import { styled } from 'styled-components'
import { useState, useEffect } from 'react'
import { NoteData } from '../App'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteNote } from '../slices/noteSlice'
import { useDispatch } from 'react-redux'
export default function Detail() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams() //{id: '1701411652974'}
  const [detail, setDetail] = useState<NoteData[]>([])

  useEffect(() => {
    const notes = localStorage.getItem('notes')
    if (notes && params.id) {
      const notesArr = JSON.parse(notes)
      const noteDetail = notesArr.filter(
        (el: NoteData) => el.id == parseInt(params.id!)
      )
      setDetail(noteDetail)
    }
  }, [])

  return (
    <Container>
      <h1>{detail[0]?.title}</h1>
      <FlexDiv>
        <div>
          {detail[0]?.tags.map(el => {
            return <TagBtn>{el}</TagBtn>
          })}
        </div>
        <p>작성일 : {detail[0]?.createdAt}</p>
      </FlexDiv>
      <h2>{detail[0]?.content}</h2>
      <BtnDiv>
        <button
          onClick={() => {
            dispatch(deleteNote(params.id))
            window.alert('삭제되었습니다')
            navigate('/')
          }}
        >
          삭제
        </button>
        <button
          className="edit"
          onClick={() => {
            navigate(`/${params.id}/edit`, {
              state: {
                detail: detail,
              },
            })
          }}
        >
          수정
        </button>
      </BtnDiv>
    </Container>
  )
}
const Container = styled.div`
  max-width: 1280px;
  padding: 0px 20px;
  margin: 0 auto;

  h1 {
    font-size: 48px;
    font-weight: 700;
    margin: 40px 0;
  }

  h2 {
    font-size: 24px;
    font-weight: 500;
    min-height: 400px;
  }
`
const BtnDiv = styled.div`
  text-align: right;

  button {
    font-size: 18px;
    border-radius: 20px;
    padding: 15px 30px;
    background-color: black;
    color: white;

    &.edit {
      margin-left: 10px;
      color: black;
      background-color: white;
      border: 1px solid #c4c4c4;
    }
  }
`
const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
`
const TagBtn = styled.button`
  cursor: default;
  padding: 8px 17px;
  margin-right: 10px;
  border-radius: 15px;
  background-color: #4d7bff;
  color: white;
`
