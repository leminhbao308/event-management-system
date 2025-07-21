import './styles/App.css'
import ThemeProvider from './context/ThemeContext'
import MainLayout from './layouts/mainLayout'

function App() {
  return (
    <ThemeProvider>
      <MainLayout>
        <div style={{
          padding: '20px',
          background: '#fff',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h1 style={{
            color: '#f97316',
            marginBottom: '16px',
            fontSize: '28px'
          }}>
            Event Management System
          </h1>
          <p style={{
            color: '#6b7280',
            fontSize: '16px',
            lineHeight: '1.6'
          }}>
            Welcome to the Event Management and Ticketing System. Create, manage, and track your events with ease.
          </p>
        </div>
      </MainLayout>
    </ThemeProvider>
  )
}

export default App
