import "./Editor.css"
import { useState, useRef } from "react"

const Editor = ({ onCreate }) => {
  const [content, setContent] = useState("")
  const contentRef = useRef()

  const onChangeContent = (e) => {
    setContent(e.target.value)
  }

  const onSubmit = () => {
    if (content === "") {
      contentRef.current.focus() // 아무것도 입력하지 않으면 입력하라는 의미로 focus
      return
    }
    onCreate(content)
    setContent("") // 새로운 데이터 추가 후 input값 초기화
  }

  const onKeyDown = (e) => {
    if (e.keyCode === 13) { // Enter키 눌러도 새로운 할 일 추가
      onSubmit()
    }
  }
  
  return <div className="Editor">
    <input
      ref={contentRef}
      value={content}
      onKeyDown={onKeyDown}
      onChange={onChangeContent}
      placeholder="새로운 Todo..." />
    <button onClick={onSubmit}>추가</button>
  </div>
}

export default Editor