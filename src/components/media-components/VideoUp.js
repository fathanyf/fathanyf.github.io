import React, {useState, useRef, useEffect} from 'react'
import {
  SimpleGrid,
  Box,
  Container,
  Heading,
  Button,
  Text,
  AspectRatio,
  Divider,
  Input,
  InputGroup,
  List,
  ListItem,
  Badge,
} from '@chakra-ui/react'
// import Header from '../components/header'
// import ProtectedPage from '../components/protectedPage'
// import { useAuth, useInterval } from '../../hooks/index'

const VideoUp = () => {
  const [file, setFile] = useState('')
  const [videoSrc, setVideoSrc] = useState('')
  const videoRef = useRef(null)
  // const {token} = useAuth()
  const [conversationId, setConversationId] = useState(null)
  const [jobId, setJobId] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [status, setStatus] = useState('not started')
  const [messages, setMessages] = useState([])

  console.log(messages)
  useEffect(() => {
    const src = URL.createObjectURL(new Blob([file], {type: 'video/mp4'}))
    setVideoSrc(src)
  }, [file])

  useEffect(() => {
    if (status === 'completed') {
      getTranscripts()
    }
  }, [status])

  // useInterval(
  //   () => {
  //     fetch(`https://api.symbl.ai/v1/job/${jobId}`, {
  //       method: 'GET',
  //       headers: {
  //         'x-api-key': token,
  //       },
  //     })
  //       .then((rawResult) => rawResult.json())
  //       .then((result) => setStatus(result.status))
  //   },
  //   1000,
  //   status === 'completed' || (status !== 'not_started' && !jobId),
  // )

  // const getTranscripts = () => {
  //   fetch(`https://api.symbl.ai/v1/conversations/${conversationId}/messages`, {
  //     method: 'GET',
  //     headers: {
  //       'x-api-key': token,
  //       'Content-Type': 'application/json',
  //     },
  //     mode: 'cors',
  //   })
  //     .then((rawResult) => rawResult.json())
  //     .then((result) => setMessages(result.messages))
  // }

  const submitFileForProcessing = (file) => {
    fetch('https://api.symbl.ai/v1/process/video', {
      method: 'POST',
      headers: {
        // 'x-api-key': token,
        'Content-Type': 'video/mp4',
      },
      body: file,
      json: true,
    })
      .then((rawResult) => rawResult.json())
      .then((result) => {
        console.log(result)
        setConversationId(result.conversationId)
        setJobId(result.jobId)
        setStatus('in_progress')
      })
  }
  return (

      <Container maxWidth="1200px">
        <Box marginBottom="1rem">
          <InputGroup marginBottom="2rem">
            <Input
              type="file"
              id="input"
              accept="audio/*, video/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </InputGroup>
          <Box bg="lightgrey" marginBottom="1rem">
            <AspectRatio maxH="100%" ratio={16 / 9}>
              <video
                id="video-summary"
                // autoPlay
                ref={videoRef}
                controls
                src={videoSrc}
              />
            </AspectRatio>
          </Box>
        </Box>
      </Container>

  )
}

export default VideoUp