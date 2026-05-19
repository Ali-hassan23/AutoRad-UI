import AuthSwitcher from '@/components/auth/login_signup_switch'
import React from 'react'

const page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4 py-8 animate-fade-in">
      <div className="w-full max-w-md">
        <AuthSwitcher/>
      </div>
    </div>
  )
}

export default page
