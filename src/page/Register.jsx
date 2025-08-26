import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { HiOutlineMail, HiLockClosed, HiEye, HiEyeOff, HiOutlineUser, HiCheckCircle, HiXCircle } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { doRegister } from '../services/auth';

const PasswordRequirement = ({ isValid, text }) => (
    <li className={`flex items-center transition-colors duration-300 ${isValid ? 'text-green-600' : 'text-red-600'}`}>
        {isValid ? <HiCheckCircle className="mr-2" /> : <HiXCircle className="mr-2" />}
        <span>{text}</span>
    </li>
);

const Register = () => {
    const navigate = useNavigate();
    
    // States for form inputs
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    
    // State specifically for inline validation errors
    const [errors, setErrors] = useState({});

    // States for live password validation
    const [passwordValidation, setPasswordValidation] = useState({
        length: false, uppercase: false, lowercase: false, number: false, symbol: false,
    });
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [isPasswordStrong, setIsPasswordStrong] = useState(false);

    useEffect(() => {
        setIsPasswordStrong(Object.values(passwordValidation).every(Boolean));
    }, [passwordValidation]);

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setPasswordValidation({
            length: newPassword.length >= 8,
            uppercase: /[A-Z]/.test(newPassword),
            lowercase: /[a-z]/.test(newPassword),
            number: /[0-9]/.test(newPassword),
            symbol: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
        });
    };

    // --- Core Validation Logic ---
    const validateForm = () => {
        const newErrors = {};

        if (!firstName.trim()) newErrors.firstName = "First name is required.";
        if (!lastName.trim()) newErrors.lastName = "Last name is required.";

        // Detailed Email Validation
        if (!email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!email.includes("@")) {
            newErrors.email = "Email must contain '@' (e.g., user@example.com).";
        } else {
            const [localPart, domainPart] = email.split("@");

            if (!localPart) {
                newErrors.email = "Email must have a username before '@' (e.g., user@example.com).";
            } else if (!domainPart) {
                newErrors.email = "Email must have a domain after '@' (e.g., gmail.com).";
            } else if (!domainPart.includes(".")) {
                newErrors.email = "Email domain must contain a '.' (e.g., gmail.com).";
            } else {
                const [domainName, extension] = domainPart.split(".");
                if (!domainName) {
                    newErrors.email = "Email must include a domain name after '@' (e.g., gmail.com).";
                } else if (!extension) {
                    newErrors.email = "Email domain must end with a valid extension (e.g., .com, .org).";
                }
            }
        }

        // Confirm password validation
        if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match.";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isFormValid = validateForm();

        // Stop submission if password is not strong or form is invalid
        if (!isPasswordStrong || !isFormValid) {
            return;
        }
        
        try {
            const newUser = await doRegister(firstName, lastName, email, password);
            if (newUser) {
                toast.success("Registration successful! Please log in.");
                navigate('/login');
            }
        } catch (err) {
            const serverError = err.message || "An unexpected error occurred.";
            // Only use toast for server-side errors (like duplicate email)
            toast.error(serverError);
            setErrors(prev => ({ ...prev, form: serverError }));
        }
    };
    
    // --- Helper function to apply the correct border color ---
    const getInputClass = (fieldName) => {
        const baseClasses = "appearance-none block w-full pl-10 px-3 py-2 border rounded-md";
        return `${baseClasses} ${errors[fieldName] ? 'border-red-500' : 'border-gray-300'}`;
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-orange-50/80 p-4">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

                <div className="flex flex-col items-center mb-6">
                    <NavLink to="/" className="text-4xl font-bold text-amber-900 mb-2" style={{ fontFamily: 'Pacifico, cursive' }}>Brrdy</NavLink>
                    <h2 className="text-center text-3xl font-extrabold text-stone-700">Create a new account</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    {/* --- Name Inputs with Inline Errors --- */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-stone-700">First Name</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <HiOutlineUser className="h-5 w-5 text-gray-400" />
                                </div>
                                <input id="firstName" name="firstName" type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)} className={getInputClass('firstName')} placeholder="John" />
                            </div>
                            {errors.firstName && <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>}
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-stone-700">Last Name</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <HiOutlineUser className="h-5 w-5 text-gray-400" />
                                </div>
                                <input id="lastName" name="lastName" type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)} className={getInputClass('lastName')} placeholder="Doe" />
                            </div>
                            {errors.lastName && <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>}
                        </div>
                    </div>

                    {/* --- Email Input with Inline Errors --- */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-stone-700">Email address</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <HiOutlineMail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input id="email" name="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={getInputClass('email')} placeholder="you@example.com" />
                        </div>
                        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                    </div>

                    {/* --- Password Input --- */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-stone-700">Password</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <HiLockClosed className="h-5 w-5 text-gray-400" />
                            </div>
                            <input id="password" name="password" type={showPassword ? 'text' : 'password'} required value={password} onChange={handlePasswordChange} onFocus={() => setIsPasswordFocused(true)} onBlur={() => setIsPasswordFocused(false)} className="appearance-none block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md" placeholder="••••••••" />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                {showPassword ? <HiEyeOff className="h-5 w-5 text-gray-400" /> : <HiEye className="h-5 w-5 text-gray-400" />}
                            </button>
                        </div>
                    </div>

                    {/* --- Password Validation Checklist --- */}
                    {(isPasswordFocused || password.length > 0) && (
                        <div className="p-3 bg-gray-50 rounded-md text-sm border">
                            <ul className="space-y-1">
                                <PasswordRequirement isValid={passwordValidation.length} text="At least 8 characters long" />
                                <PasswordRequirement isValid={passwordValidation.lowercase} text="One lowercase letter (a-z)" />
                                <PasswordRequirement isValid={passwordValidation.uppercase} text="One uppercase letter (A-Z)" />
                                <PasswordRequirement isValid={passwordValidation.number} text="One number (0-9)" />
                                <PasswordRequirement isValid={passwordValidation.symbol} text="One symbol (!@#$...)" />
                            </ul>
                        </div>
                    )}
                    
                    {/* --- Confirm Password with Inline Errors --- */}
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-stone-700">Confirm Password</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <HiLockClosed className="h-5 w-5 text-gray-400" />
                            </div>
                            <input id="confirmPassword" name="confirmPassword" type={showPassword ? 'text' : 'password'} required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={getInputClass('confirmPassword')} placeholder="••••••••" />
                        </div>
                        {errors.confirmPassword && <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>}
                    </div>

                    {errors.form && <div className="mt-1 text-sm text-red-600 text-center">{errors.form}</div>}

                    <div>
                        <button type="submit" disabled={!isPasswordStrong} className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white ${isPasswordStrong ? 'bg-amber-500 hover:bg-amber-600' : 'bg-amber-500 cursor-not-allowed'}`}>
                            Sign Up
                        </button>
                    </div>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-stone-700">
                        Already have an account?{' '}
                        <NavLink to="/login" className="font-medium text-stone-700 hover:text-amber-600">Log In</NavLink>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
