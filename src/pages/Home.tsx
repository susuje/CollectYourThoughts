import { styled } from 'styled-components'
import { useState, useEffect } from 'react'
import { NoteData } from '../App'
import { useNavigate } from 'react-router-dom'
export default function Home() {
  const navigate = useNavigate()
  const [allclicked, setAllClicked] = useState(true)
  const [clickedIndex, setClickedIndex] = useState<number | null>()
  const [allNotes, setAllnotes] = useState<NoteData[]>([])
  const [showNotes, setShowNotes] = useState<NoteData[]>([])
  const [tags, setTags] = useState<string[]>([])

  const handleTags = (e: React.MouseEvent<HTMLElement>) => {
    const targetElement = e.target as HTMLElement
    const show = targetElement.innerText
    if (show === '전체 노트') {
      setAllClicked(true)
      setClickedIndex(null)
    } else {
      const index = tags.indexOf(show)
      setClickedIndex(index)
      setAllClicked(false)
      setShowNotes([])
      allNotes.map(el => {
        if (el.tags.includes(show)) {
          // console.log(el)
          setShowNotes(prev => [...prev, el]) // {}  [{},{}]
        }
      })
    }
  }

  useEffect(() => {
    const notes = localStorage.getItem('notes')
    if (notes) {
      setAllnotes(JSON.parse(notes).reverse())
    }
  }, [])

  useEffect(() => {
    if (allNotes.length > 0) {
      console.log('d')
      const tagsArr = allNotes
        .map(el =>
          el.tags.map(tags => {
            return tags
          })
        )
        .flat()
      const filterdTags = [...new Set(tagsArr)]
      setTags(filterdTags)
    }
  }, [allNotes])

  return (
    <Container>
      <FlexDiv>
        <h1>Your Notes 📚</h1>
        <AddBtn onClick={() => navigate('/new')}>글쓰기</AddBtn>
      </FlexDiv>
      <TagDiv>
        <TagBtn onClick={handleTags} className={allclicked ? 'allClicked' : ''}>
          전체 노트
        </TagBtn>

        <div>
          <h2>주제별 :</h2>
          {tags.map((el, ind) => {
            return (
              <TagBtn
                onClick={handleTags}
                className={clickedIndex === ind ? 'blue' : ''}
              >
                {el}
              </TagBtn>
            )
          })}
        </div>
      </TagDiv>
      {allNotes.length === 0 ? (
        <h2 className="none">글을 작성해주세요📝</h2>
      ) : null}
      <NotesDiv>
        {allclicked
          ? allNotes.map(el => {
              return (
                <NoteWrapper onClick={() => navigate(`/${el.id}`)}>
                  <div>
                    {el.tags.map(tag => {
                      return <TagBtn className="blue">{tag}</TagBtn>
                    })}
                  </div>
                  <h3>{el.title}</h3>

                  <p>{el.createdAt}</p>
                </NoteWrapper>
              )
            })
          : showNotes.map(el => {
              return (
                <NoteWrapper onClick={() => navigate(`/${el.id}`)}>
                  <div>
                    {el.tags.map(tag => {
                      return <TagBtn className="blue">{tag}</TagBtn>
                    })}
                  </div>
                  <h3>{el.title}</h3>

                  <p>{el.createdAt}</p>
                </NoteWrapper>
              )
            })}
      </NotesDiv>
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
  h2.none {
    margin-top: 150px;
    font-size: 36px;
    font-weight: 500;
    text-align: center;
  }
`
const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 480px) {
    flex-direction: column;
  }
`
const AddBtn = styled.button`
  background-color: black;
  color: white;
  font-size: 16px;
  border-radius: 25px;
  padding: 15px 25px;

  @media screen and (max-width: 480px) {
    margin-bottom: 30px;
  }
`
const TagDiv = styled.div`
  div {
    display: inline-block;
    @media screen and (max-width: 480px) {
      margin-top: 10px;
    }
  }
  h2 {
    display: inline-block;
    margin-left: 10px;
    margin-right: 10px;
  }
`
const TagBtn = styled.button`
  padding: 8px 15px;
  margin-right: 10px;
  border-radius: 15px;
  background-color: #797c83;
  color: white;
  &.blue {
    background-color: #4d7bff;
  }
  &.allClicked {
    background-color: #4d7bff;
  }
  &:last-child {
    margin-right: 0;
  }
`

const NotesDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-top: 30px;
  gap: 6vh 3vw;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`
const NoteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 200px;
  padding: 15px;
  border: 1px solid #c4c4c4;
  border-radius: 20px;
  cursor: pointer;
  h3 {
    font-size: 24px;
    font-weight: 600;
  }
`
