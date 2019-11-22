import React from "react"
import Dropzone from "react-dropzone-uploader"
import styled from "styled-components"

const Container = styled.div`
  text-align: center;

  .dzu-dropzone {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: ${({ zIndex }) => zIndex};
  }

  .dzu-previewImage {
    width: auto;
    max-height: 40px;
    max-width: 140px;
    border-radius: 4px;
  }

  .dzu-input {
    display: none;
  }
`

const Layout = props => {
  const {
    input,
    previews,
    dropzoneProps,
    files,
    extra: { maxFiles },
  } = props

  return (
    <React.Fragment>
      <div {...dropzoneProps} />

      {previews}

      {files.length < maxFiles && input}
    </React.Fragment>
  )
}

const FileUploader = () => {
  const [pointerState, setPointerState] = React.useState("")

  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => {
    console.log(status, meta, file)
  }

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files, allFiles) => {
    console.log(files.map(f => f.meta))
    allFiles.forEach(f => f.remove())
  }

  const handleDragEnter = React.useCallback(() => {
    console.log("drag enter")
    setPointerState("dragover")
  }, [])

  const handleLeave = React.useCallback(() => {
    setPointerState("")
  }, [])

  React.useEffect(() => {
    document.body.addEventListener("dragenter", handleDragEnter)
    document.body.addEventListener("dragleave", handleLeave)

    return () => {
      document.body.removeEventListener("dragenter", handleDragEnter)
      document.body.removeEventListener("dragleave", handleLeave)
    }
  })

  return (
    <Container zIndex={pointerState === "dragover" ? 0 : -1}>
      <Dropzone
        onChangeStatus={handleChangeStatus}
        onSubmit={handleSubmit}
        accept="image/*,audio/*,video/*"
        LayoutComponent={Layout}
        multiple={false}
        inputContent="Or drop a file 📁"
      />
    </Container>
  )
}

export default FileUploader
