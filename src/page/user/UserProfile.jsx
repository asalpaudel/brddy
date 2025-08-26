import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { HiOutlineUser, HiLockClosed, HiEye, HiEyeOff, HiCheckCircle, HiXCircle } from 'react-icons/hi';
import { updateUser, getUserById } from '../../services/user';
import { sha256 } from '../../utils/encryption';

// A helper component for the password validation checklist
const PasswordRequirement = ({ isValid, text }) => (
    <li className={`flex items-center text-sm transition-colors duration-300 ${isValid ? 'text-green-600' : 'text-stone-500'}`}>
        {isValid ? <HiCheckCircle className="mr-2" /> : <HiXCircle className="mr-2" />}
        <span>{text}</span>
    </li>
);

const UserProfile = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userInfo, setUserInfo] = useState({ firstName: '', lastName: '' });
    const [passwordInfo, setPasswordInfo] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });
    const [loading, setLoading] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    // States for live password validation
    const [isNewPasswordFocused, setIsNewPasswordFocused] = useState(false);
    const [isPasswordStrong, setIsPasswordStrong] = useState(false);
    const [passwordValidation, setPasswordValidation] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        symbol: false,
    });

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem('USER_ID');
            if (!userId) {
                toast.error("You must be logged in.");
                setLoading(false);
                return;
            }
            try {
                const user = await getUserById(userId);
                if (user) {
                    setCurrentUser(user);
                    setUserInfo({
                        firstName: user.firstName,
                        lastName: user.lastName,
                    });
                } else {
                    toast.error("Could not retrieve user data.");
                }
            } catch (error) {
                toast.error("Failed to fetch user details.");
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, []);

    // Effect to check if all password requirements are met
    useEffect(() => {
        setIsPasswordStrong(Object.values(passwordValidation).every(Boolean));
    }, [passwordValidation]);

    const handleInfoChange = (e) => {
        setUserInfo(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handlePasswordInputChange = (e) => {
        const { name, value } = e.target;
        setPasswordInfo(prev => ({ ...prev, [name]: value }));

        // If the user is typing in the 'newPassword' field, validate it
        if (name === 'newPassword') {
            setPasswordValidation({
                length: value.length >= 8,
                uppercase: /[A-Z]/.test(value),
                lowercase: /[a-z]/.test(value),
                number: /[0-9]/.test(value),
                symbol: /[!@#$%^&*(),.?":{}|<>]/.test(value),
            });
        }
    };

    const handleInfoSubmit = async (e) => {
        e.preventDefault();
        if (!userInfo.firstName.trim() || !userInfo.lastName.trim()) {
            return toast.error("First and last names cannot be empty.");
        }
        try {
            const updatedUserData = {
                ...currentUser,
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
            };
            await updateUser(currentUser.id, updatedUserData);
            
            localStorage.setItem('USER_FNAME', userInfo.firstName);
            localStorage.setItem('USER_LNAME', userInfo.lastName);
            
            // Dispatch a custom event to notify the header of the name change
            window.dispatchEvent(new Event("storage"));
            
            setCurrentUser(updatedUserData);
            toast.success("Profile updated successfully!");
        } catch (error) {
            toast.error("Failed to update profile.");
            console.error("Profile update error:", error);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        
        if (!isPasswordStrong) {
            return toast.error("Your new password does not meet all the requirements.");
        }

        const { currentPassword, newPassword, confirmNewPassword } = passwordInfo;

        if (newPassword !== confirmNewPassword) {
            return toast.error("New passwords do not match.");
        }
        
        const hashedCurrentPassword = await sha256(currentPassword);
        if (hashedCurrentPassword !== currentUser.password) {
            return toast.error("Your current password is incorrect.");
        }

        if (window.confirm("Are you sure you want to change your password?")) {
            try {
                const hashedNewPassword = await sha256(newPassword);
                const updatedUserData = { ...currentUser, password: hashedNewPassword };
                
                await updateUser(currentUser.id, updatedUserData);
                setCurrentUser(updatedUserData);
                toast.success("Password changed successfully!");
                setPasswordInfo({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
                setIsNewPasswordFocused(false);
            } catch (error) {
                toast.error("Failed to change password.");
            }
        }
    };

    if (loading) {
        return <div className="text-center py-10">Loading profile...</div>;
    }

    if (!currentUser) {
        return <div className="text-center py-10">Could not load user profile. Please try logging in again.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-8">
            <h1 className="text-3xl font-bold text-stone-800 text-center">Update Profile</h1>
            
            {/* Edit Profile Section */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-6 text-stone-700">Edit Profile Information</h2>
                <form onSubmit={handleInfoSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-stone-700">First Name</label>
                            <div className="mt-1 relative">
                                <HiOutlineUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input type="text" name="firstName" id="firstName" value={userInfo.firstName} onChange={handleInfoChange} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md" required/>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-stone-700">Last Name</label>
                            <div className="mt-1 relative">
                                <HiOutlineUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input type="text" name="lastName" id="lastName" value={userInfo.lastName} onChange={handleInfoChange} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md" required/>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end pt-2">
                        <button type="submit" className="bg-amber-500 text-white px-6 py-2 rounded-md hover:bg-amber-600 font-semibold transition-colors">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
            
            {/* Change Password Section */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-6 text-stone-700">Change Password</h2>
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="currentPassword">Current Password</label>
                        <div className="mt-1 relative">
                             <HiLockClosed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input type={showPassword ? 'text' : 'password'} name="currentPassword" id="currentPassword" value={passwordInfo.currentPassword} onChange={handlePasswordInputChange} className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md" required/>
                             <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400">
                                {showPassword ? <HiEyeOff /> : <HiEye />}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="newPassword">New Password</label>
                         <div className="mt-1 relative">
                             <HiLockClosed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input type={showPassword ? 'text' : 'password'} name="newPassword" id="newPassword" value={passwordInfo.newPassword} onChange={handlePasswordInputChange} onFocus={() => setIsNewPasswordFocused(true)} className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md" required/>
                             <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400">
                                {showPassword ? <HiEyeOff /> : <HiEye />}
                            </button>
                        </div>
                    </div>
                    
                    {isNewPasswordFocused && (
                        <div className="p-3 bg-gray-50 rounded-md border">
                            <ul className="space-y-1">
                                <PasswordRequirement isValid={passwordValidation.length} text="At least 8 characters long" />
                                <PasswordRequirement isValid={passwordValidation.lowercase} text="One lowercase letter (a-z)" />
                                <PasswordRequirement isValid={passwordValidation.uppercase} text="One uppercase letter (A-Z)" />
                                <PasswordRequirement isValid={passwordValidation.number} text="One number (0-9)" />
                                <PasswordRequirement isValid={passwordValidation.symbol} text="One symbol (!@#$...)" />
                            </ul>
                        </div>
                    )}

                    <div>
                        <label htmlFor="confirmNewPassword">Confirm New Password</label>
                        <div className="mt-1 relative">
                             <HiLockClosed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input type={showPassword ? 'text' : 'password'} name="confirmNewPassword" id="confirmNewPassword" value={passwordInfo.confirmNewPassword} onChange={handlePasswordInputChange} className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md" required/>
                             <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400">
                                {showPassword ? <HiEyeOff /> : <HiEye />}
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-end pt-2">
                        <button type="submit" disabled={!isPasswordStrong} className="bg-amber-500 text-white px-6 py-2 rounded-md hover:bg-amber-600 font-semibold transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed">
                            Change Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserProfile;