import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function Login() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const endpoint = isLogin ? '/api/users/login' : '/api/users/register'
      const { data } = await api.post(endpoint, { email, password })
      
      if (isLogin) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('credits', data.credits)
        navigate('/dashboard')
      } else {
        alert('Usuário criado! Faça login.')
        setIsLogin(true)
      }
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.message || 'Erro')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl mb-4 font-bold">{isLogin ? 'Login' : 'Registrar'}</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input 
          type="email" 
          placeholder="Email"
          className="w-full p-2 mb-4 border rounded"
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required
        />
        <input 
          type="password" 
          placeholder="Senha"
          className="w-full p-2 mb-4 border rounded"
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          {isLogin ? 'Entrar' : 'Criar conta'}
        </button>
        <p className="mt-4 text-center cursor-pointer text-blue-500" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Criar conta' : 'Já tenho conta'}
        </p>
      </form>
    </div>
  )
}
