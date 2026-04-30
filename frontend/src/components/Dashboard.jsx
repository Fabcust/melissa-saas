import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function Dashboard() {
  const [credits, setCredits] = useState(0)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const storedCredits = localStorage.getItem('credits')

    if (!token) {
      navigate('/')
      return
    }

    setCredits(Number(storedCredits) || 0)
  }, [navigate])

  const handleAction = async (type, amount) => {
    setError('')
    try {
      const { data } = await api.post(`/credits/${type}`, { amount })
      setCredits(data.credits)
      localStorage.setItem('credits', data.credits)
    } catch (err) {
      setError(err.response?.data?.error || 'Erro')
    }
  }

  const logout = () => {
    localStorage.clear()
    navigate('/')
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard Melissa</h1>
        <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">Sair</button>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <p className="text-xl mb-4">Créditos: <span className="font-bold">{credits}</span></p>
      <div className="space-x-4">
        <button onClick={() => handleAction('add', 100)} className="bg-green-500 text-white px-4 py-2 rounded">
          Adicionar 100
        </button>
        <button onClick={() => handleAction('use', 10)} className="bg-blue-500 text-white px-4 py-2 rounded">
          Usar 10
        </button>
      </div>
    </div>
  )
}
