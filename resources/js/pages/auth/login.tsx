import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthSplitLayout from '@/layouts/auth/auth-split-layout';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthSplitLayout
            title="Welcome back"
            description="Sign in to your account to continue"
        >
            <Head title="Log in" />

            <form className="space-y-8" onSubmit={submit}>
                {/* Status Message */}
                {status && (
                    <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4">
                        <div className="text-sm text-emerald-800 text-center font-medium">{status}</div>
                    </div>
                )}

                {/* Email Field */}
                <div className="space-y-3">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email address
                    </Label>
                    <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-gray-600 transition-colors duration-200" />
                        <Input
                            id="email"
                            type="email"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="Enter your email"
                            className="pl-12 h-12 border-gray-200 focus:border-gray-400 focus:ring-2 focus:ring-gray-100 rounded-xl transition-all duration-200 text-base bg-gray-50 focus:bg-white"
                        />
                    </div>
                    <InputError message={errors.email} />
                </div>

                {/* Password Field */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                            Password
                        </Label>
                        {canResetPassword && (
                            <TextLink
                                href={route('password.request')}
                                className="text-xs text-gray-500 hover:text-gray-700 transition-colors font-medium"
                                tabIndex={5}
                            >
                                Forgot password?
                            </TextLink>
                        )}
                    </div>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-gray-600 transition-colors duration-200" />
                        <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            required
                            tabIndex={2}
                            autoComplete="current-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Enter your password"
                            className="pl-12 pr-12 h-12 border-gray-200 focus:border-gray-400 focus:ring-2 focus:ring-gray-100 rounded-xl transition-all duration-200 text-base bg-gray-50 focus:bg-white"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                            tabIndex={-1}
                        >
                            {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                            ) : (
                                <Eye className="h-4 w-4" />
                            )}
                        </button>
                    </div>
                    <InputError message={errors.password} />
                </div>

                {/* Remember Me */}
                <div className="flex items-center space-x-3">
                    <Checkbox
                        id="remember"
                        name="remember"
                        checked={data.remember}
                        onClick={() => setData('remember', !data.remember)}
                        tabIndex={3}
                        className="border-gray-300 text-gray-700 focus:ring-gray-400 focus:ring-2 focus:ring-gray-100 rounded-lg"
                    />
                    <Label htmlFor="remember" className="text-sm text-gray-700 font-medium">
                        Keep me signed in
                    </Label>
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                    tabIndex={4}
                    disabled={processing}
                >
                    {processing ? (
                        <div className="flex items-center gap-3">
                            <LoaderCircle className="h-4 w-4 animate-spin" />
                            <span>Signing you in...</span>
                        </div>
                    ) : (
                        'Sign in to account'
                    )}
                </Button>

                {/* Divider */}
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-gray-500 font-medium">New to our platform?</span>
                    </div>
                </div>

                {/* Sign Up Link */}
                <div className="text-center">
                    <TextLink
                        href={route('register')}
                        className="text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors"
                        tabIndex={5}
                    >
                        Create a new account
                    </TextLink>
                </div>
            </form>
        </AuthSplitLayout>
    );
}
