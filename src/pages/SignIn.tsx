import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { Button } from '../components/Button';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

export const SignIn: React.FC = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('All fields are required');
      return;
    }

    setLoading(true);
    const { error } = await signIn(email, password);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-br from-spiritual-cream via-spiritual-lightGold to-spiritual-cream">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="w-10 h-10 text-spiritual-gold" />
            <span className="text-3xl font-bold text-spiritual-brown">lifemanual</span>
          </div>
          <h1 className="text-3xl font-bold text-spiritual-brown mb-2">{t.auth.signIn.title}</h1>
          <p className="text-spiritual-brown/70">{t.auth.signIn.subtitle}</p>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-spiritual-brown mb-2">
                {t.auth.signIn.email}
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-spiritual-gold/30 focus:outline-none focus:border-spiritual-gold bg-spiritual-cream/30"
                placeholder={t.auth.signIn.email}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-spiritual-brown mb-2">
                {t.auth.signIn.password}
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-spiritual-gold/30 focus:outline-none focus:border-spiritual-gold bg-spiritual-cream/30"
                placeholder={t.auth.signIn.password}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-spiritual-gold border-spiritual-gold/30 rounded focus:ring-spiritual-gold"
                />
                <span className="ml-2 text-sm text-spiritual-brown/70">Remember me</span>
              </label>
              <a href="#" className="text-sm text-spiritual-gold hover:text-spiritual-saffron">
                Forgot password?
              </a>
            </div>

            <Button type="submit" variant="primary" className="w-full" disabled={loading}>
              {loading ? t.auth.signIn.signingIn : t.auth.signIn.button}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-spiritual-brown/70">
              {t.auth.signIn.noAccount}{' '}
              <Link to="/signup" className="text-spiritual-gold font-semibold hover:text-spiritual-saffron">
                {t.auth.signIn.signUpLink}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
