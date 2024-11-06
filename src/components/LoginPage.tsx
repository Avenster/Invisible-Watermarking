import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardContent, Input, Button, Alert, AlertDescription, AlertTitle } from '@/components/ui';

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login', { email, password });
      localStorage.setItem('token', response.data.token);
      setShowSuccessAlert(true);
      setTimeout(() => setShowSuccessAlert(false), 3000);
      router.push('/dashboard');
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {showSuccessAlert && (
        <Alert className="fixed top-4 left-1/2 transform -translate-x-1/2 z-10">
          <AlertTitle>Login Successful</AlertTitle>
          <AlertDescription>You have been logged in.</AlertDescription>
        </Alert>
      )}
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
          <Input
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4"
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4"
          />
          <Button onClick={handleLogin}>Login</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;