import { SnackbarProvider } from 'notistack'

import { TaskList } from './components/TaskList'
import { Header } from "./components/Header";
import './styles/global.scss'


export function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Header />
      <TaskList />
    </SnackbarProvider>
  )
}