//@ts-nocheck
import Link from 'next/link'
import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'
import { Logo } from '@/components/Logo'
import { SlimLayout } from '@/components/SlimLayout'
import { type Metadata } from 'next'
import Alert from '@/components/Alert'
import login_background from '@/images/login_background.jpg'
import { PasswordCheck } from '../utils/input_validation'
import { Message } from '@/components/Feedback'

export const metadata: Metadata = {
    title: 'Sign In',
}

var message = ""
var messageType = ""
var heading = ""

export default async function Login({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {

    const handleSubmit = async (formData: FormData) => {
        'use server'

        const password = String(formData.get('password'))

        const match = PasswordCheck(password)

        if (!match) {
            message = "Must have at least 8 characters, one UPPERCASE and one lowercase, at least one number, and at least one symbol (i.e. ! ^ * etc.)"
            messageType = "ERROR"
            heading = "Invalid Password."
        }
        else {
            message = "Password Matches minimum reqs. Validation works."
            messageType = "SUCCESS"
            heading = "Success."
        }

    };

    return (
        <>
            <SlimLayout backgroundImage={login_background}>
                <div className="flex">
                    <Link href="/" aria-label="Home">
                        <Logo className="h-10 w-auto" />
                    </Link>
                </div>
                <h2 className="mt-20 text-lg font-semibold text-gray-900">
                    Sign in to your account
                </h2>
                <p className="mt-2 text-sm text-gray-700">
                    Don’t have an account?{' '}
                    <Link
                        href="/register"
                        className="font-medium text-blue-600 hover:underline"
                    >
                        Sign up
                    </Link>{' '}
                    to start donating.
                </p>
                <form
                    action={handleSubmit}
                    method="post"
                    className="mt-10 grid grid-cols-1 gap-y-8 py-10"
                >
                    {/* CHECKS IF NULL */}
                    {searchParams.err && <Alert message={searchParams.err as string} />}
                    <TextField
                        label="Email address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        minLength={10}
                        required
                    />
                    <p className="mt-2 text-sm text-gray-700">
                        <Link
                            href="/reset"
                            className="font-medium text-blue-600 hover:underline"
                        >
                            Forgot Password?
                        </Link>
                    </p>
                    <div>
                        <Button
                            type="submit"
                            variant="solid"
                            color="blue"
                            className="w-full"
                        >
                            <span>
                                Sign in <span aria-hidden="true">&rarr;</span>
                            </span>
                        </Button>
                    </div>
                </form>
                <Message content={message} type={messageType} heading={heading} />
            </SlimLayout>

        </>
    )
} 
