import { Card, Typography, ListItem, List, ListItemButton, ListItemText } from '@mui/material'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { type Question as Questiontype } from '../types'
import { useQuestionsStore } from '../store/questions'

const Question = ({ info }: { info: Questiontype }) => {
  return (
    <Card variant='outlined' sx={{ textAlign: 'left', bgcolor: '#222', p: 2, marginTop: 4, width: 600 }}>
      <Typography variant='h5'>
        {info.question}
      </Typography>
      <SyntaxHighlighter language='javascript' style={gradientDark}>
        {info.code}
      </SyntaxHighlighter>
      <List sx={{ bgcolor: '#333' }} disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem key={index}>
            <ListItemButton divider>
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

  const questionInfo = questions[currentQuestion]

  return (
    <>
      <Question info={questionInfo} />
    </>
  )
}
