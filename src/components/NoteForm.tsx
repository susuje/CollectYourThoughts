import { styled } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef, FormEvent } from 'react'
import { NewNoteProps } from '../pages/NewNote'
import xIcon from '../assets/x-icon.svg'

export default function NoteForm({
  createNote,
  editNote,
  detail,
}: NewNoteProps) {
  const navigate = useNavigate()
  const [show, setShow] = useState(true)
  const [tag, setTag] = useState('')
  const [tagList, setTagList] = useState<string[]>([])
  const [tagListWidth, setTagListWidth] = useState(0)

  const tagListRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLInputElement>(null)
  const contentRef = useRef<HTMLTextAreaElement>(null)

  const createTag = () => {
    setTagList(prev => [...prev, tag])
    setTag('')
  }
  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!tagList.includes(e.target.value)) {
      setTag(e.target.value)
      setShow(true)
    } else {
      setTag(e.target.value)
      setShow(false)
    }
  }
  const deleteTag = (e: React.MouseEvent<HTMLElement>) => {
    const targetElement = e.target as HTMLElement

    setTagList(
      tagList.filter(el => el !== targetElement.parentElement?.innerText)
    )
  }
  useEffect(() => {
    //태그생기면 input에 태그width만큼 패딩이 생긴다
    if (tagListRef.current) {
      console.log(tagListRef.current)
      setTagListWidth(tagListRef.current.getBoundingClientRect().width)
    }
  }, [tagList])

  useEffect(() => {
    //태그생기면 input에 태그width만큼 패딩이 생긴다
    if (detail) {
      console.log(detail)
      titleRef.current!.value = detail[0].title
      contentRef.current!.value = detail[0].content
      setTagList(detail[0].tags)
    }
  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const today = new Date()
    const date = today.getDate()
    const year = today.getFullYear()
    const month = today.getMonth()
    const created = `${year}-${month + 1}-${date}`
    if (createNote) {
      createNote({
        id: Date.now(),
        title: titleRef.current!.value,
        content: contentRef.current!.value,
        tags: tagList,
        createdAt: created,
      })
    } else if (editNote && detail) {
      editNote({
        id: detail[0].id,
        title: titleRef.current!.value,
        content: contentRef.current!.value,
        tags: tagList,
        createdAt: detail[0].createdAt,
      })
    }
    navigate('/')
  }
  return (
    <Form onSubmit={handleSubmit}>
      <FlexDiv>
        <LeftDiv>
          <Label>제목</Label>
          <Input type="text" required ref={titleRef} />
        </LeftDiv>
        <RightDiv>
          <Label>주제</Label>

          <TagDiv>
            <TagInput
              type="text"
              value={tag}
              onChange={e => handleTagInput(e)}
              style={{
                paddingLeft: tagListWidth ? `${tagListWidth + 5}px` : '15px',
              }}
            />
            <TagListDiv ref={tagListRef}>
              {tagList.map((txt, i) => {
                return (
                  <Tag key={i}>
                    {txt}
                    <button type="button" onClick={deleteTag}></button>
                  </Tag>
                )
              })}
            </TagListDiv>
          </TagDiv>
          {tag && (
            <CreateTag
              onClick={() => createTag()}
              style={{
                display: show ? '' : 'none',
              }}
            >
              <span>{tag}</span> 태그 추가하기!
            </CreateTag>
          )}
        </RightDiv>
      </FlexDiv>

      <Label>내용</Label>
      <Textarea required ref={contentRef} />
      <BtnDiv>
        <Btn className="save" type="submit">
          저장
        </Btn>
        <Btn type="button" onClick={() => navigate('/')}>
          취소
        </Btn>
      </BtnDiv>
    </Form>
  )
}

const Form = styled.form``

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: 18px;
`
const Input = styled.input`
  padding: 15px;
  border: 1px solid #c4c4c4;
  border-radius: 15px;
  width: 100%;
  max-width: 1280px;
`
const CreateTag = styled.div`
  cursor: pointer;
  background-color: #f2f2f2;
  margin-top: 10px;
  padding: 15px;
  width: 100%;
  position: absolute;

  span {
    font-weight: 600;
  }
`
const FlexDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3vh 3vw;
  width: 100%;
  margin-bottom: 40px;
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`
const RightDiv = styled.div`
  position: relative;
`
const LeftDiv = styled.div``
const TagDiv = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`
const TagInput = styled.input`
  padding: 15px;
  width: 100%;

  border: 1px solid #c4c4c4;
  border-radius: 15px;
`
const TagListDiv = styled.div`
  position: absolute;
  display: flex;
`

const Tag = styled.div`
  display: flex;
  align-items: center;

  padding: 15px 10px;
  margin-left: 10px;
  height: 30px;
  border-radius: 10px;
  background-color: #4d7bff;
  color: white;

  button {
    width: 15px;
    height: 15px;
    background: url(${xIcon}) no-repeat right/15px 15px;
    margin-left: 10px;
  }
`

const Textarea = styled.textarea`
  width: 100%;
  padding: 15px;
  border: 1px solid #c4c4c4;
  border-radius: 15px;
  height: 50vh;
`

const BtnDiv = styled.div`
  margin-top: 10px;
  text-align: right;
`
const Btn = styled.button`
  font-size: 18px;
  border-radius: 15px;
  padding: 15px 60px;
  border: 1px solid #c4c4c4;

  &.save {
    background-color: black;
    color: white;
    margin-right: 15px;
  }
`
