import './App.css'
import { Container, Stack, Typography } from '@mui/material'
import { LogoJavascript } from './assets/logo'
import { Start } from './components/Start'
import { useQuestionsStore } from './store/questions'

const App = () => {
  const questions = useQuestionsStore(state => state.questions)
  return (
    <main>
      <Container maxWidth='sm'>

        <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
          <LogoJavascript />
          <Typography variant='h3' component='h1'>Javascript Quiz</Typography>
        </Stack>

        <Start />
        {questions.length === 0 && <Typography>No questions yet</Typography>}
        {questions.length > 0 && <Typography>{questions.length} question(s)</Typography>}
      </Container>

    </main>
  )
}

export default App
