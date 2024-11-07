import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  // ユーザーが既にログインしている場合はリダイレクト
  if (user) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isSignUp) {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
      navigate('/');
    } catch (error: any) {
      // エラーメッセージをユーザーフレンドリーに
      const errorMessages: { [key: string]: string } = {
        'auth/invalid-email': 'メールアドレスの形式が正しくありません。',
        'auth/user-disabled': 'このアカウントは無効になっています。',
        'auth/user-not-found': 'アカウントが見つかりません。',
        'auth/wrong-password': 'パスワードが間違っています。',
        'auth/email-already-in-use': 'このメールアドレスは既に使用されています。',
        'auth/weak-password': 'パスワードは6文字以上である必要があります。',
      };
      setError(errorMessages[error.code] || 'ログインに失敗しました。');
      console.error('Auth error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold text-center mb-6">
          {isSignUp ? 'アカウント作成' : 'ログイン'}
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              メールアドレス
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 border"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              パスワード
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 border"
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#1abc9c] text-white px-4 py-2 rounded-lg hover:bg-[#16a085] transition-colors"
          >
            {isSignUp ? 'アカウントを作成' : 'ログイン'}
          </button>
        </form>

        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="mt-4 text-sm text-[#3498db] hover:text-[#2980b9] transition-colors w-full text-center"
        >
          {isSignUp
            ? 'すでにアカウントをお持ちの方はこちら'
            : 'アカウントをお持ちでない方はこちら'}
        </button>
      </div>
    </div>
  );
}