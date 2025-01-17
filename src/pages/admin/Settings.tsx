import { useState } from 'react';
import { auth } from '../../lib/firebase';
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { Settings as SettingsIcon, Lock, Bell, Globe, Shield } from 'lucide-react';

export default function Settings() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters');
      return;
    }

    try {
      setLoading(true);
      const user = auth.currentUser;
      if (!user || !user.email) throw new Error('No user logged in');

      // Reauthenticate
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);

      // Update password
      await updatePassword(user, newPassword);

      setSuccess('Password updated successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      console.error('Error updating password:', err);
      setError('Failed to update password. Please check your current password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Navigation */}
        <div className="space-y-2">
          <button className="w-full flex items-center space-x-2 px-4 py-2 text-left rounded-[2deg] bg-primary-50 text-primary-600">
            <Lock className="h-5 w-5" />
            <span>Security</span>
          </button>
          <button className="w-full flex items-center space-x-2 px-4 py-2 text-left rounded-[2deg] text-gray-600 hover:bg-gray-50">
            <Bell className="h-5 w-5" />
            <span>Notifications</span>
          </button>
          <button className="w-full flex items-center space-x-2 px-4 py-2 text-left rounded-[2deg] text-gray-600 hover:bg-gray-50">
            <Globe className="h-5 w-5" />
            <span>Language & Region</span>
          </button>
          <button className="w-full flex items-center space-x-2 px-4 py-2 text-left rounded-[2deg] text-gray-600 hover:bg-gray-50">
            <Shield className="h-5 w-5" />
            <span>Privacy</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-[2deg] shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Security Settings</h2>
            </div>
            <div className="p-6">
              <form onSubmit={handlePasswordChange} className="space-y-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-[2deg]">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-[2deg]">
                    {success}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-[2deg] shadow-sm p-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-[2deg] shadow-sm p-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-[2deg] shadow-sm p-2"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-full"
                  >
                    {loading ? 'Updating...' : 'Update Password'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}