import { Card, Typography, ListItem, List, ListItemButton, ListItemText, Stack, IconButton } from '@mui/material'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { type Question as Questiontype } from '../types'
import { useQuestionsStore } from '../store/questions'
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material'
import { Footer } from './Footer'

const Question = ({ info }: { info: Questiontype }) => {
  const selectAnswer = useQuestionsStore(state => state.selectAnswer)

  const getBackgroundColor = (index: number) => {
    const { userSelectedAnswer, correctAnswer } = info
    if (userSelectedAnswer == null) return 'transparent'
    if (index !== correctAnswer && index !== userSelectedAnswer) return 'transparent'
    if (index === correctAnswer) return 'green'
    if (index === userSelectedAnswer) return 'red'
    return 'transparent'
  }

  return (
    <Card variant='outlined' sx={{ textAlign: 'left', bgcolor: '#222', p: 2, marginTop: 4 }}>
      <Typography variant='h5'>
        {info.question}
      </Typography>
      <SyntaxHighlighter language='javascript' style={gradientDark}>
        {info.code}
      </SyntaxHighlighter>
      <List sx={{ bgcolor: '#333' }} disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem key={index}>
            <ListItemButton
              divider
              onClick={() => selectAnswer(info.id, index)}
              sx={{ bgcolor: getBackgroundColor(index) }}
              disabled={info.userSelectedAnswer != null}
            >
              <ListItemText sx={{ textAlign: 'center' }} primary={answer} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  )
}

export const Game = () => {
  const questions = useQuestionsStore(state => state.questions)
  const currentQuestion = useQuestionsStore(state => state.currentQuestion)
  const goNextQuestion = useQuestionsStore(state => state.goNextQuestion)
  const goPreviousQuestion = useQuestionsStore(state => state.goPrevQuestion)

  const questionInfo = questions[currentQuestion]
  console.log(questions)

  return (
    <>
      <Stack direction='row' gap={2} alignItems='center' justifyContent='center' marginTop={4}>
        <IconButton onClick={goPreviousQuestion} disabled={currentQuestion === 0}>
          <ArrowBackIosNew />
        </IconButton>

        {currentQuestion + 1} / {questions.length}

        <IconButton onClick={goNextQuestion} disabled={currentQuestion === questions.length - 1}>
          <ArrowForwardIos />
        </IconButton>
      </Stack>
      <Question info={questionInfo} />
      <Footer />

    </>
  )
}
